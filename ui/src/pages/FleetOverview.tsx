/**
 * Fleet Overview page (RAA-292).
 *
 * Displays a grid of all FleetOS containers with status, health gauges,
 * and links to individual container detail views.
 */

import { useEffect } from "react";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { fleetosApi, type FleetContainer } from "../api/fleetos";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { queryKeys } from "../lib/queryKeys";
import { cn } from "../lib/utils";
import { EmptyState } from "../components/EmptyState";
import { PageSkeleton } from "../components/PageSkeleton";
import { StatusBadge } from "../components/StatusBadge";
import { Server, Cpu, HardDrive, MemoryStick, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Gauge component — a small radial-style progress bar for CPU / mem / disk
// ---------------------------------------------------------------------------

function Gauge({ value, label, warn = 80, danger = 95 }: { value: number; label: string; warn?: number; danger?: number }) {
  const pct = Math.min(100, Math.max(0, value));
  const color =
    pct >= danger
      ? "text-red-500"
      : pct >= warn
        ? "text-amber-500"
        : "text-green-500";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-10 w-10">
        <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
          <circle
            className="text-muted-foreground/20"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            r="15.9155"
            cx="18"
            cy="18"
          />
          <circle
            className={color}
            strokeWidth="3"
            strokeDasharray={`${pct}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r="15.9155"
            cx="18"
            cy="18"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
          {Math.round(pct)}%
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Container card
// ---------------------------------------------------------------------------

function ContainerCard({ container }: { container: FleetContainer }) {
  const agentName = container.labels?.agent_name ?? container.name;
  const h = container.health;

  return (
    <Link
      to={`/fleet/${encodeURIComponent(container.id)}`}
      className="group block rounded-lg border border-border bg-card p-4 shadow-sm hover:border-foreground/20 hover:shadow-md transition-all no-underline text-inherit"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm font-semibold truncate">{agentName}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono truncate">{container.id}</span>
          </div>
        </div>
        <StatusBadge status={container.status} />
      </div>

      {h && (
        <div className="mt-4 flex items-center justify-around">
          <Gauge value={h.cpu_percent} label="CPU" />
          <Gauge value={h.mem_percent} label="MEM" />
          <Gauge value={h.disk_percent} label="DISK" />
        </div>
      )}

      {!h && container.status === "running" && (
        <div className="mt-4 flex items-center justify-center py-3">
          <span className="text-xs text-muted-foreground">Health unavailable</span>
        </div>
      )}

      {!h && container.status !== "running" && (
        <div className="mt-4 flex items-center justify-center py-3">
          <span className="text-xs text-muted-foreground">Container is {container.status}</span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Tenant: {container.tenant_id}</span>
        {h && <span>Up: {h.uptime_display}</span>}
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function FleetOverview() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ label: "Fleet" }]);
  }, [setBreadcrumbs]);

  const {
    data: containers,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.fleet.containers,
    queryFn: () => fleetosApi.listContainers(),
    refetchInterval: 15_000,
  });

  if (isLoading) {
    return <PageSkeleton variant="list" />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">Fleet</h1>
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load fleet data"}
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!containers || containers.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">Fleet</h1>
        <EmptyState
          icon={Server}
          message="No containers found. FleetOS containers will appear here once provisioned."
        />
      </div>
    );
  }

  const running = containers.filter((c) => c.status === "running");
  const stopped = containers.filter((c) => c.status !== "running");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Fleet</h1>
          <p className="text-sm text-muted-foreground">
            {containers.length} container{containers.length === 1 ? "" : "s"} &middot;{" "}
            {running.length} running
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", isFetching && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Summary gauges */}
      {(() => {
        const withHealth = running.filter((c) => c.health != null);
        const healthCount = withHealth.length;
        return (
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <Cpu className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">
                  {healthCount > 0
                    ? `${Math.round(
                        withHealth.reduce((sum, c) => sum + c.health!.cpu_percent, 0) / healthCount,
                      )}%`
                    : "--"}
                </p>
                <p className="text-xs text-muted-foreground">Avg CPU</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <MemoryStick className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">
                  {healthCount > 0
                    ? `${Math.round(
                        withHealth.reduce((sum, c) => sum + c.health!.mem_percent, 0) / healthCount,
                      )}%`
                    : "--"}
                </p>
                <p className="text-xs text-muted-foreground">Avg Memory</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <HardDrive className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">
                  {healthCount > 0
                    ? `${Math.round(
                        withHealth.reduce((sum, c) => sum + c.health!.disk_percent, 0) / healthCount,
                      )}%`
                    : "--"}
                </p>
                <p className="text-xs text-muted-foreground">Avg Disk</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Container grid */}
      {running.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
            Running ({running.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {running.map((c) => (
              <ContainerCard key={c.id} container={c} />
            ))}
          </div>
        </div>
      )}

      {stopped.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
            Stopped / Other ({stopped.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stopped.map((c) => (
              <ContainerCard key={c.id} container={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
