import type {
  FleetOSContainer,
  FleetOSHealth,
  FleetOSExecResult,
  FleetOSOperation,
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
  allowLocalhost?: boolean;
  pollIntervalMs?: number;
}

export class FleetOSClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly pollIntervalMs: number;

  constructor(baseUrl: string, apiKey: string, options: FleetOSClientOptions = {}) {
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
    if (
      DANGEROUS_HOSTS.includes(hostname) ||
      (!options.allowLocalhost &&
        (hostname === "localhost" ||
          hostname === "[::1]" ||
          /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)))
    ) {
      throw new FleetOSClientError(
        `FleetOS base URL points to a blocked host: ${hostname}`,
        0,
        null,
      );
    }

    // Strip trailing slash for consistent URL construction
    this.baseUrl = parsed.origin + parsed.pathname.replace(/\/+$/, "");
    this.apiKey = apiKey;
    this.pollIntervalMs = options.pollIntervalMs ?? 1_000;
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

  private async sleep(ms: number): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, ms));
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

  private isTerminalOperationStatus(status: string): boolean {
    return new Set([
      "succeeded",
      "completed",
      "complete",
      "failed",
      "cancelled",
      "canceled",
      "timeout",
      "timed_out",
      "done",
    ]).has(status.toLowerCase());
  }

  private toExecResult(payload: unknown): FleetOSExecResult | null {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;

    const record = payload as Record<string, unknown>;
    const nested =
      record.result && typeof record.result === "object" && !Array.isArray(record.result)
        ? (record.result as Record<string, unknown>)
        : record;

    const exitCode =
      typeof nested.exit_code === "number"
        ? nested.exit_code
        : typeof record.exit_code === "number"
          ? record.exit_code
          : null;
    const durationMs =
      typeof nested.duration_ms === "number"
        ? nested.duration_ms
        : typeof record.duration_ms === "number"
          ? record.duration_ms
          : 0; // Fleet API async operations may omit duration_ms; default to 0
    const timedOut =
      typeof nested.timed_out === "boolean"
        ? nested.timed_out
        : typeof record.timed_out === "boolean"
          ? record.timed_out
          : false; // Fleet API async operations may omit timed_out; default to false

    if (exitCode === null) return null;

    return {
      exit_code: exitCode,
      stdout: typeof nested.stdout === "string" ? nested.stdout : "",
      stderr: typeof nested.stderr === "string" ? nested.stderr : "",
      duration_ms: durationMs,
      timed_out: timedOut,
    };
  }

  private async pollOperation(operationId: string, timeoutMs: number): Promise<FleetOSExecResult> {
    const deadline = Date.now() + timeoutMs;
    let pollIntervalMs = this.pollIntervalMs;

    while (true) {
      const remainingMs = deadline - Date.now();
      if (remainingMs <= 0) {
        throw new FleetOSClientError(
          `FleetOS exec operation ${operationId} did not complete within ${timeoutMs}ms`,
          0,
          null,
        );
      }

      const operation = await this.request<FleetOSOperation>(
        "GET",
        `/api/operations/${encodeURIComponent(operationId)}`,
        undefined,
        Math.min(remainingMs, 15_000),
      );

      if (this.isTerminalOperationStatus(operation.status)) {
        const result = this.toExecResult(operation) ?? this.toExecResult(operation.result);
        if (result) return result;

        throw new FleetOSClientError(
          `FleetOS exec operation ${operationId} completed without a usable result payload`,
          0,
          operation.detail ?? (typeof operation.error === "string" ? operation.error : null),
        );
      }

      const sleepMs = Math.min(pollIntervalMs, Math.max(remainingMs, 0));
      if (sleepMs > 0) {
        await new Promise<void>((resolve) => setTimeout(resolve, sleepMs));
      }
      pollIntervalMs = Math.min(pollIntervalMs * 2, 5000);
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
   * This is the primary interface for dispatching hermes CLI invocations.
   */
  async exec(
    containerId: string,
    command: string[],
    timeoutMs: number = 120_000,
    env?: Record<string, string>,
  ): Promise<FleetOSExecResult> {
    const response = await this.request<FleetOSExecResult | FleetOSOperation>(
      "POST",
      `/api/containers/${encodeURIComponent(containerId)}/exec`,
      {
        command,
        timeout: Math.max(1, Math.ceil(timeoutMs / 1000)),
        ...(env && Object.keys(env).length > 0 ? { env } : {}),
      },
      // Allow extra headroom over the container-level timeout
      timeoutMs + 10_000,
    );

    const directResult = this.toExecResult(response);
    if (directResult) return directResult;

    const responseRecord =
      typeof response === "object" && response !== null ? (response as unknown as Record<string, unknown>) : null;
    const operationId =
      responseRecord && typeof responseRecord.operation_id === "string"
        ? responseRecord.operation_id
        : responseRecord && typeof responseRecord.id === "string"
          ? responseRecord.id
          : null;

    if (!operationId) {
      throw new FleetOSClientError(
        "FleetOS exec response did not include an operation_id or a direct exec result payload",
        0,
        null,
      );
    }

    return this.pollOperation(operationId, timeoutMs + 30_000);
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
