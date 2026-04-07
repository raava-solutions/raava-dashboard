import type {
  FleetOSContainer,
  FleetOSHealth,
  FleetOSExecResult,
  FleetOSProvisionJob,
  FleetOSProvisionSpec,
  FleetOSFileContent,
} from "./types.js";

// ---------------------------------------------------------------------------
// FleetOS HTTP Client
// ---------------------------------------------------------------------------

export class FleetOSClientError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly detail: string | null = null,
  ) {
    super(message);
    this.name = "FleetOSClientError";
  }
}

export interface FleetOSClientOptions {
  /** Allow localhost/loopback targets (safe when running server-side, not in user containers). */
  allowLocalhost?: boolean;
}

export class FleetOSClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string, options?: FleetOSClientOptions) {
    // Security: validate and normalize the base URL to prevent SSRF (HIGH)
    let parsed: URL;
    try {
      parsed = new URL(baseUrl);
    } catch {
      throw new FleetOSClientError(`Invalid FleetOS base URL: ${baseUrl}`, 0, null);
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new FleetOSClientError(
        `FleetOS base URL must use http or https protocol, got: ${parsed.protocol}`,
        0,
        null,
      );
    }

    // Block cloud metadata endpoints and loopback addresses
    const DANGEROUS_HOSTS = [
      "169.254.169.254",  // AWS/GCP metadata
      "metadata.google.internal", // GCP metadata
      "100.100.100.200",  // Alibaba metadata
    ];
    const hostname = parsed.hostname.toLowerCase();
    const isLoopback =
      hostname === "localhost" ||
      hostname === "[::1]" ||
      /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
    if (DANGEROUS_HOSTS.includes(hostname)) {
      throw new FleetOSClientError(
        `FleetOS base URL points to a blocked host: ${hostname}`,
        0,
        null,
      );
    }
    if (isLoopback && !options?.allowLocalhost) {
      throw new FleetOSClientError(
        `FleetOS base URL points to a blocked host: ${hostname}`,
        0,
        null,
      );
    }

    // Strip trailing slash for consistent URL construction
    this.baseUrl = parsed.origin + parsed.pathname.replace(/\/+$/, "");
    this.apiKey = apiKey;
  }

  // -------------------------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------------------------

  private buildHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    timeoutMs: number = 30_000,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers: this.buildHeaders(),
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        let detail: string | null = null;
        try {
          const errorBody = (await response.json()) as { detail?: string; error?: string };
          detail = errorBody.detail ?? errorBody.error ?? null;
        } catch {
          // ignore parse failures on error bodies
        }
        throw new FleetOSClientError(
          `FleetOS API ${method} ${path} returned ${response.status}`,
          response.status,
          detail,
        );
      }

      return (await response.json()) as T;
    } catch (err) {
      if (err instanceof FleetOSClientError) throw err;
      if (err instanceof DOMException && err.name === "AbortError") {
        throw new FleetOSClientError(
          `FleetOS API ${method} ${path} timed out after ${timeoutMs}ms`,
          0,
          "Request aborted due to timeout",
        );
      }
      throw new FleetOSClientError(
        `FleetOS API ${method} ${path} failed: ${err instanceof Error ? err.message : String(err)}`,
        0,
        null,
      );
    } finally {
      clearTimeout(timer);
    }
  }

  // -------------------------------------------------------------------------
  // Container management
  // -------------------------------------------------------------------------

  /** List all containers visible to the current API key. */
  async listContainers(): Promise<FleetOSContainer[]> {
    return this.request<FleetOSContainer[]>("GET", "/api/containers");
  }

  /** Get a single container by ID. */
  async getContainer(id: string): Promise<FleetOSContainer> {
    return this.request<FleetOSContainer>("GET", `/api/containers/${encodeURIComponent(id)}`);
  }

  /** Start a stopped container. */
  async startContainer(id: string): Promise<FleetOSContainer> {
    return this.request<FleetOSContainer>(
      "POST",
      `/api/containers/${encodeURIComponent(id)}/start`,
    );
  }

  /** Stop a running container. */
  async stopContainer(id: string): Promise<FleetOSContainer> {
    return this.request<FleetOSContainer>(
      "POST",
      `/api/containers/${encodeURIComponent(id)}/stop`,
    );
  }

  // -------------------------------------------------------------------------
  // Execution
  // -------------------------------------------------------------------------

  /**
   * Execute a command inside a container.
   *
   * Fleet API exec is async: POST returns an operation_id, then we poll
   * GET /api/operations/:id until the operation completes or times out.
   */
  async exec(
    containerId: string,
    command: string[],
    timeoutMs: number = 120_000,
    env?: Record<string, string>,
  ): Promise<FleetOSExecResult> {
    // Submit the exec request — Fleet API returns an async operation handle
    const op = await this.request<{
      operation_id: string;
      status: string;
    }>(
      "POST",
      `/api/containers/${encodeURIComponent(containerId)}/exec`,
      {
        command,
        timeout_ms: timeoutMs,
        ...(env && Object.keys(env).length > 0 ? { env } : {}),
      },
      30_000, // connection timeout for the submit call itself
    );

    // Poll the operation until it completes
    const deadline = Date.now() + timeoutMs + 30_000; // extra headroom
    const pollIntervalMs = 2_000;

    while (Date.now() < deadline) {
      const result = await this.request<{
        id: string;
        status: string;
        result: { stdout: string; stderr: string; exit_code: number } | null;
        error: string | null;
      }>("GET", `/api/operations/${encodeURIComponent(op.operation_id)}`, undefined, 10_000);

      if (result.status === "succeeded" && result.result) {
        return {
          exit_code: result.result.exit_code,
          stdout: result.result.stdout ?? "",
          stderr: result.result.stderr ?? "",
          duration_ms: 0, // Fleet API doesn't return this in the operation
          timed_out: false,
        };
      }

      if (result.status === "failed") {
        return {
          exit_code: result.result?.exit_code ?? 1,
          stdout: result.result?.stdout ?? "",
          stderr: result.result?.stderr ?? result.error ?? "Operation failed",
          duration_ms: 0,
          timed_out: false,
        };
      }

      // Still running — wait before polling again
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }

    // Timed out waiting for the operation
    return {
      exit_code: 1,
      stdout: "",
      stderr: `Operation ${op.operation_id} did not complete within ${timeoutMs + 30_000}ms`,
      duration_ms: timeoutMs,
      timed_out: true,
    };
  }

  // -------------------------------------------------------------------------
  // Health
  // -------------------------------------------------------------------------

  /** Get health telemetry for a container. */
  async getHealth(containerId: string): Promise<FleetOSHealth> {
    return this.request<FleetOSHealth>(
      "GET",
      `/api/containers/${encodeURIComponent(containerId)}/health`,
    );
  }

  // -------------------------------------------------------------------------
  // File access
  // -------------------------------------------------------------------------

  /** Read a file from inside a container via the FleetOS files API. */
  async readFile(containerId: string, filePath: string): Promise<FleetOSFileContent> {
    const params = new URLSearchParams({ path: filePath });
    return this.request<FleetOSFileContent>(
      "GET",
      `/api/containers/${encodeURIComponent(containerId)}/files?${params.toString()}`,
    );
  }

  // -------------------------------------------------------------------------
  // Provisioning
  // -------------------------------------------------------------------------

  /** Request provisioning of a new container. */
  async provision(spec: FleetOSProvisionSpec): Promise<FleetOSProvisionJob> {
    return this.request<FleetOSProvisionJob>("POST", "/api/provision", spec);
  }

  /** Check the status of a provisioning job. */
  async getProvisionStatus(jobId: string): Promise<FleetOSProvisionJob> {
    return this.request<FleetOSProvisionJob>(
      "GET",
      `/api/provision/${encodeURIComponent(jobId)}`,
    );
  }

  // -------------------------------------------------------------------------
  // Connectivity check (used by testEnvironment)
  // -------------------------------------------------------------------------

  /** Lightweight ping to verify the FleetOS API is reachable and authenticated. */
  async ping(): Promise<boolean> {
    try {
      await this.request<unknown>("GET", "/api/health", undefined, 5_000);
      return true;
    } catch {
      return false;
    }
  }
}
