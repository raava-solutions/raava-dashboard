// @vitest-environment node

import { describe, expect, it } from "vitest";
import { __liveUpdatesTestUtils } from "./LiveUpdatesProvider";
import { queryKeys } from "../lib/queryKeys";

describe("LiveUpdatesProvider issue invalidation", () => {
  it("refreshes touched inbox queries for issue activity", () => {
    const invalidations: unknown[] = [];
    const queryClient = {
      invalidateQueries: (input: unknown) => {
        invalidations.push(input);
      },
      getQueryData: () => undefined,
    };

    __liveUpdatesTestUtils.invalidateActivityQueries(
      queryClient as never,
      "company-1",
      {
        entityType: "issue",
        entityId: "issue-1",
        details: null,
      },
    );

    expect(invalidations).toContainEqual({
      queryKey: queryKeys.issues.listMineByMe("company-1"),
    });
    expect(invalidations).toContainEqual({
      queryKey: queryKeys.issues.listTouchedByMe("company-1"),
    });
    expect(invalidations).toContainEqual({
      queryKey: queryKeys.issues.listUnreadTouchedByMe("company-1"),
    });
  });
});

describe("LiveUpdatesProvider visible issue toast suppression", () => {
  it("suppresses activity toasts for the issue page currently in view", () => {
    const queryClient = {
      getQueryData: (key: unknown) => {
        if (JSON.stringify(key) === JSON.stringify(queryKeys.issues.detail("PAP-759"))) {
          return {
            id: "issue-1",
            identifier: "PAP-759",
            assigneeAgentId: "agent-1",
          };
        }
        return undefined;
      },
    };

    expect(
      __liveUpdatesTestUtils.shouldSuppressActivityToastForVisibleIssue(
        queryClient as never,
        "/PAP/issues/PAP-759",
        {
          entityType: "issue",
          entityId: "issue-1",
          details: { identifier: "PAP-759" },
        },
        { isForegrounded: true },
      ),
    ).toBe(true);

    expect(
      __liveUpdatesTestUtils.shouldSuppressActivityToastForVisibleIssue(
        queryClient as never,
        "/PAP/issues/PAP-759",
        {
          entityType: "issue",
          entityId: "issue-2",
          details: { identifier: "PAP-760" },
        },
        { isForegrounded: true },
      ),
    ).toBe(false);
  });

  it("suppresses run and agent status toasts for the assignee of the visible issue", () => {
    const queryClient = {
      getQueryData: (key: unknown) => {
        if (JSON.stringify(key) === JSON.stringify(queryKeys.issues.detail("PAP-759"))) {
          return {
            id: "issue-1",
            identifier: "PAP-759",
            assigneeAgentId: "agent-1",
          };
        }
        return undefined;
      },
    };

    expect(
      __liveUpdatesTestUtils.shouldSuppressRunStatusToastForVisibleIssue(
        queryClient as never,
        "/PAP/issues/PAP-759",
        {
          runId: "run-1",
          agentId: "agent-1",
        },
        { isForegrounded: true },
      ),
    ).toBe(true);

    expect(
      __liveUpdatesTestUtils.shouldSuppressAgentStatusToastForVisibleIssue(
        queryClient as never,
        "/PAP/issues/PAP-759",
        {
          agentId: "agent-1",
          status: "running",
        },
        { isForegrounded: true },
      ),
    ).toBe(true);
  });
});

describe("LiveUpdatesProvider run lifecycle toasts", () => {
  it("does not build start or success toasts for agent runs", () => {
    const queryClient = {
      getQueryData: () => [],
    };

    expect(
      __liveUpdatesTestUtils.buildAgentStatusToast(
        {
          agentId: "agent-1",
          status: "running",
        },
        () => "CodexCoder",
        queryClient as never,
        "company-1",
      ),
    ).toBeNull();

    expect(
      __liveUpdatesTestUtils.buildRunStatusToast(
        {
          runId: "run-1",
          agentId: "agent-1",
          status: "succeeded",
        },
        () => "CodexCoder",
      ),
    ).toBeNull();
  });

  it("still builds failure toasts for agent errors and failed runs", () => {
    const queryClient = {
      getQueryData: () => [
        {
          id: "agent-1",
          title: "Software Engineer",
        },
      ],
    };

    expect(
      __liveUpdatesTestUtils.buildAgentStatusToast(
        {
          agentId: "agent-1",
          status: "error",
        },
        () => "CodexCoder",
        queryClient as never,
        "company-1",
      ),
    ).toMatchObject({
      title: "CodexCoder errored",
      body: "Software Engineer",
      tone: "error",
    });

    expect(
      __liveUpdatesTestUtils.buildRunStatusToast(
        {
          runId: "run-1",
          agentId: "agent-1",
          status: "failed",
          error: "boom",
        },
        () => "CodexCoder",
      ),
    ).toMatchObject({
      title: "CodexCoder run failed",
      body: "boom",
      tone: "error",
    });
  });
});
