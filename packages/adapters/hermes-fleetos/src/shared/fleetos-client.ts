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

export class FleetOSClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    // Strip trailing slash for consistent URL construction
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.apiKey = apiKey;
  }

  // -------------------------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------------------------

  private buildHeaders(): Record<string, string> {
    return {
      "X-API-Key": this.apiKey,
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
    return this.request<FleetOSContainer[]>("GET", "/api/v1/containers");
  }

  /** Get a single container by ID. */
  async getContainer(id: string): Promise<FleetOSContainer> {
    return this.request<FleetOSContainer>("GET", `/api/v1/containers/${encodeURIComponent(id)}`);
  }

  /** Start a stopped container. */
  async startContainer(id: string): Promise<FleetOSContainer> {
    return this.request<FleetOSContainer>(
      "POST",
      `/api/v1/containers/${encodeURIComponent(id)}/start`,
    );
  }

  /** Stop a running container. */
  async stopContainer(id: string): Promise<FleetOSContainer> {
    return this.request<FleetOSContainer>(
      "POST",
      `/api/v1/containers/${encodeURIComponent(id)}/stop`,
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
    return this.request<FleetOSExecResult>(
      "POST",
      `/api/v1/containers/${encodeURIComponent(containerId)}/exec`,
      {
        command,
        timeout_ms: timeoutMs,
        ...(env && Object.keys(env).length > 0 ? { env } : {}),
      },
      // Allow extra headroom over the container-level timeout
      timeoutMs + 10_000,
    );
  }

  // -------------------------------------------------------------------------
  // Health
  // -------------------------------------------------------------------------

  /** Get health telemetry for a container. */
  async getHealth(containerId: string): Promise<FleetOSHealth> {
    return this.request<FleetOSHealth>(
      "GET",
      `/api/v1/containers/${encodeURIComponent(containerId)}/health`,
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
      `/api/v1/containers/${encodeURIComponent(containerId)}/files?${params.toString()}`,
    );
  }

  // -------------------------------------------------------------------------
  // Provisioning
  // -------------------------------------------------------------------------

  /** Request provisioning of a new container. */
  async provision(spec: FleetOSProvisionSpec): Promise<FleetOSProvisionJob> {
    return this.request<FleetOSProvisionJob>("POST", "/api/v1/provision", spec);
  }

  /** Check the status of a provisioning job. */
  async getProvisionStatus(jobId: string): Promise<FleetOSProvisionJob> {
    return this.request<FleetOSProvisionJob>(
      "GET",
      `/api/v1/provision/${encodeURIComponent(jobId)}`,
    );
  }

  // -------------------------------------------------------------------------
  // Connectivity check (used by testEnvironment)
  // -------------------------------------------------------------------------

  /** Lightweight ping to verify the FleetOS API is reachable and authenticated. */
  async ping(): Promise<boolean> {
    try {
      await this.request<unknown>("GET", "/api/v1/health", undefined, 5_000);
      return true;
    } catch {
      return false;
    }
  }
}
