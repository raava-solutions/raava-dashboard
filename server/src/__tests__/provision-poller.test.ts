/**
 * Unit tests for the tickInFlight guard in startProvisionPoller.
 *
 * The poller runs on a 15-second setInterval. The tickInFlight boolean (in
 * startProvisionPoller) prevents a new tick from starting while a previous one
 * is still awaiting pollProvisioningAgents. These tests verify that the guard
 * causes the second tick to be a no-op when the first is still in flight.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { startProvisionPoller, PROVISION_POLL_INTERVAL_MS } from "../services/provision-poller.js";

// ---------------------------------------------------------------------------
// Mock the FleetOS client module so the poller doesn't need real credentials.
// createFleetOSClient is called inside createPollerClient; we return a stub
// that exposes a getProvisionJob spy we can control per-test.
// ---------------------------------------------------------------------------
vi.mock("../services/fleetos-client.js", () => {
  const getProvisionJob = vi.fn();
  const client = { getProvisionJob };
  return {
    createFleetOSClient: vi.fn(() => client),
    FleetOSProxyError: class FleetOSProxyError extends Error {
      statusCode: number;
      body: unknown;
      constructor(message: string, statusCode = 500, body: unknown = null) {
        super(message);
        this.name = "FleetOSProxyError";
        this.statusCode = statusCode;
        this.body = body;
      }
    },
  };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Flush all pending microtasks (Promise callbacks) without advancing fake timers.
 * Repeated flushes let deeply-chained .then() calls settle.
 */
async function flushMicrotasks(rounds = 5): Promise<void> {
  for (let i = 0; i < rounds; i++) {
    await Promise.resolve();
  }
}

/** Build the minimal Drizzle-shaped db mock needed by pollProvisioningAgents. */
function makeDbMock(options: {
  /** Controls when the DB select resolves. Default: resolves immediately. */
  selectPromise?: Promise<unknown[]>;
} = {}) {
  const selectPromise = options.selectPromise ?? Promise.resolve([]);

  // Drizzle's query builder is a fluent chain: db.select({...}).from(...).where(...)
  // Each method in the chain returns the same chainable object; the terminal
  // call (where/from at the end) returns the awaitable promise.
  const chain = {
    select: vi.fn(),
    from: vi.fn(),
    where: vi.fn(),
    update: vi.fn(),
    set: vi.fn(),
  };

  // Wire the fluent chain so each step returns the same object.
  chain.select.mockReturnValue(chain);
  chain.from.mockReturnValue(chain);
  // .where() is the terminal call that returns the query promise.
  chain.where.mockReturnValue(selectPromise);

  // update/set/where for mutations — return a resolved promise so they don't
  // block; these should never be called during the guard test.
  chain.update.mockReturnValue(chain);
  chain.set.mockReturnValue(chain);

  return chain as unknown as import("@paperclipai/db").Db;
}

/** Stub logger that discards output. */
const silentLogger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("startProvisionPoller — tickInFlight guard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset all mock call counts between tests.
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("skips a second tick that fires while the first poll is still in flight", async () => {
    // Arrange: create a DB whose select never resolves during the test so that
    // the first tick stays in-flight when the second interval fires.
    let resolveFirstTick!: (value: unknown[]) => void;
    const firstTickPromise = new Promise<unknown[]>((resolve) => {
      resolveFirstTick = resolve;
    });

    const db = makeDbMock({ selectPromise: firstTickPromise });

    // Start the poller with fake credentials so createPollerClient succeeds.
    const stop = startProvisionPoller(
      db,
      { fleetApiUrl: "http://fleet.test", fleetApiKey: "test-key" },
      silentLogger,
    );

    try {
      // Act — fire the first tick.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);

      // The first tick is now awaiting the DB select. Confirm it was called.
      expect(db.select).toHaveBeenCalledTimes(1);

      // Act — fire the second tick while the first is still unresolved.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);

      // Assert — the guard must have blocked the second tick.
      // db.select must still be exactly 1 — no second DB query was issued.
      expect(db.select).toHaveBeenCalledTimes(1);

      // Now let the first tick finish and flush all pending microtasks so that
      // the .finally() handler resets tickInFlight before we fire the third tick.
      resolveFirstTick([]);
      await flushMicrotasks();

      // After the first tick completes, tickInFlight resets to false.
      // A third tick should now be allowed — confirming the guard released.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);
      // Flush microtasks so the new tick's db.select() call is recorded.
      await flushMicrotasks();

      expect(db.select).toHaveBeenCalledTimes(2);
    } finally {
      stop();
    }
  });

  it("does not issue any Fleet API calls when the second tick is blocked", async () => {
    // This test isolates the Fleet API side: when the guard blocks a tick, no
    // getProvisionJob call should be made for any agent during that blocked tick.
    //
    // We seed one provisioning agent in the first tick's DB result, but hold
    // the Fleet API call open so tickInFlight stays true when the second tick fires.

    const { createFleetOSClient } = await import("../services/fleetos-client.js");
    const mockClient = (createFleetOSClient as ReturnType<typeof vi.fn>)();
    const getProvisionJob = mockClient.getProvisionJob as ReturnType<typeof vi.fn>;

    // The Fleet API call for the first tick will never resolve during the window
    // we care about, so tickInFlight stays true.
    let resolveFleetCall!: (value: unknown) => void;
    const fleetCallPromise = new Promise((resolve) => {
      resolveFleetCall = resolve;
    });
    getProvisionJob.mockReturnValueOnce(fleetCallPromise);

    // DB returns one provisioning agent so the first tick reaches the Fleet call.
    const agentRow = {
      id: "agent-abc",
      provisionJobId: "job-xyz",
      adapterConfig: null,
    };
    const firstTickSelectPromise = Promise.resolve([agentRow]);

    const db = makeDbMock({ selectPromise: firstTickSelectPromise });

    const stop = startProvisionPoller(
      db,
      { fleetApiUrl: "http://fleet.test", fleetApiKey: "test-key" },
      silentLogger,
    );

    try {
      // Fire the first tick and let microtasks run so it reaches the Fleet call.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);
      await Promise.resolve(); // flush the DB select
      await Promise.resolve(); // flush the for-loop reaching getProvisionJob

      expect(getProvisionJob).toHaveBeenCalledTimes(1);
      expect(getProvisionJob).toHaveBeenCalledWith("job-xyz");

      // Reset the spy count so we can cleanly assert the second tick adds none.
      getProvisionJob.mockClear();

      // Fire the second tick — guard must block it.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);
      await Promise.resolve();

      // No additional Fleet API calls should have been made.
      expect(getProvisionJob).toHaveBeenCalledTimes(0);

      // Also confirm DB select was not called a second time.
      // (db.select was called once for the first tick's query; the second tick
      // was blocked before reaching the select.)
      expect(db.select).toHaveBeenCalledTimes(1);
    } finally {
      resolveFleetCall({ status: "running" }); // unblock so the finally chain settles
      stop();
    }
  });

  it("re-allows ticks after tickInFlight resets on completion", async () => {
    // Confirm normal operation: after a tick resolves, the next tick proceeds.
    const db = makeDbMock({ selectPromise: Promise.resolve([]) });

    const stop = startProvisionPoller(
      db,
      { fleetApiUrl: "http://fleet.test", fleetApiKey: "test-key" },
      silentLogger,
    );

    try {
      // First tick — fire and flush all microtasks so the .finally() handler
      // resets tickInFlight before we fire the second tick.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);
      await flushMicrotasks();

      expect(db.select).toHaveBeenCalledTimes(1);

      // Second tick — should be allowed because the first finished.
      vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS);
      await flushMicrotasks();

      expect(db.select).toHaveBeenCalledTimes(2);
    } finally {
      stop();
    }
  });

  it("returns a no-op cleanup function when credentials are not configured", () => {
    // Ensure the poller gracefully disables itself when credentials are absent,
    // without affecting the tickInFlight guard logic under test.
    const db = makeDbMock();

    const stop = startProvisionPoller(db, {}, silentLogger);

    // The cleanup function must be callable without throwing.
    expect(() => stop()).not.toThrow();

    // No interval was started, so no DB calls should have been made.
    vi.advanceTimersByTime(PROVISION_POLL_INTERVAL_MS * 3);
    expect(db.select).not.toHaveBeenCalled();
  });
});
