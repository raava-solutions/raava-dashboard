import { afterEach, describe, expect, it, vi } from "vitest";
import { FleetOSClient } from "./fleetos-client.js";

describe("FleetOSClient.exec", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("polls async operations until FleetOS returns a terminal exec result", async () => {
    const fetchMock = vi.fn();

    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            operation_id: "op-123",
            status: "queued",
            stream_url: "https://fleet.example/operations/op-123/stream",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "op-123",
            status: "running",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: "op-123",
            status: "completed",
            result: {
              stdout: "hello from fleetos\n",
              stderr: "",
              exit_code: 0,
              duration_ms: 1234,
              timed_out: false,
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

    vi.stubGlobal("fetch", fetchMock);

    const client = new FleetOSClient("https://fleet.example", "test-key");
    const result = await client.exec("ctr-123", ["hermes", "--version"], 2500);

    expect(result).toEqual({
      stdout: "hello from fleetos\n",
      stderr: "",
      exit_code: 0,
      duration_ms: 1234,
      timed_out: false,
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://fleet.example/api/containers/ctr-123/exec");
    expect(fetchMock.mock.calls[1]?.[0]).toBe("https://fleet.example/api/operations/op-123");
    expect(fetchMock.mock.calls[2]?.[0]).toBe("https://fleet.example/api/operations/op-123");
  });
});
