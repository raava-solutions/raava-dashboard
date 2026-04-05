import {
  Inbox,
  CircleDot,
  Target,
  LayoutDashboard,
  DollarSign,
  History,
  Search,
  SquarePen,
  Network,
  Boxes,
  Repeat,
  Settings,
  Home,
  Users,
  ListChecks,
  FolderKanban,
  CreditCard,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { SidebarSection } from "./SidebarSection";
import { SidebarNavItem } from "./SidebarNavItem";
import { RaavaNavItem } from "./RaavaNavItem";
import { SidebarProjects } from "./SidebarProjects";
import { SidebarAgents } from "./SidebarAgents";
import { RaavaStarMark } from "./RaavaStarMark";
import { useDialog } from "../context/DialogContext";
import { useCompany } from "../context/CompanyContext";
import { heartbeatsApi } from "../api/heartbeats";
import { queryKeys } from "../lib/queryKeys";
import { useInboxBadge } from "../hooks/useInboxBadge";
import { healthApi } from "../api/health";
import { Button } from "@/components/ui/button";
import { PluginSlotOutlet } from "@/plugins/slots";

/**
 * Render the application's left sidebar containing company header, primary navigation, plugin-provided sidebar content, and context-aware badges/counts.
 *
 * Conditionally includes an "Infrastructure" section when the deployment is detected as Fleetos and exposes plugin slots for sidebar items and a sidebar panel.
 *
 * @returns The sidebar element for the application UI.
 */
export function Sidebar() {
  const { openNewIssue } = useDialog();
  const { selectedCompanyId, selectedCompany } = useCompany();
  const inboxBadge = useInboxBadge(selectedCompanyId);
  const { data: liveRuns } = useQuery({
    queryKey: queryKeys.liveRuns(selectedCompanyId!),
    queryFn: () => heartbeatsApi.liveRunsForCompany(selectedCompanyId!),
    enabled: !!selectedCompanyId,
    refetchInterval: 10_000,
  });
  const liveRunCount = liveRuns?.length ?? 0;
  const { data: health, error: healthError } = useQuery({
    queryKey: queryKeys.health,
    queryFn: () => healthApi.get(),
    retry: false,
    staleTime: 60_000,
  });
  const isFleetosMode = health?.deploymentMode === "fleetos";
  // Preserve last-known fleetos state so a transient health query failure
  // doesn't hide the Fleet sidebar section mid-session.
  const lastKnownFleetosRef = useRef(false);
  if (health) lastKnownFleetosRef.current = isFleetosMode;
  const showFleet = lastKnownFleetosRef.current;

  useEffect(() => {
    if (healthError) {
      // A UI toast is unnecessary here — `lastKnownFleetosRef` preserves the
      // previous deployment-mode result, so the user continues to see the
      // correct sidebar layout even when the health endpoint is temporarily
      // unreachable.  A noisy toast would only confuse users for a transient
      // backend hiccup that has zero visible impact on the interface.
      console.warn("[Sidebar] Health check failed, using cached mode:", healthError);
    }
  }, [healthError]);

  function openSearch() {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }

  const pluginContext = {
    companyId: selectedCompanyId,
    companyPrefix: selectedCompany?.issuePrefix ?? null,
  };

  if (showFleet) {
    /* ── Raava / FleetOS sidebar ─────────────────────────────── */
    return (
      <aside className="w-60 h-full min-h-0 border-r border-border bg-background flex flex-col">
        {/* Brand header: star mark + "Raava" in Syne */}
        <div className="flex items-center gap-2.5 px-5 pt-6 pb-5 shrink-0">
          <RaavaStarMark size={28} />
          <span className="font-display text-lg text-foreground">
            Raava
          </span>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-auto-hide flex flex-col gap-1 px-5 py-1">
          <RaavaNavItem to="/dashboard" label="Home" icon={Home} liveCount={liveRunCount} />
          <RaavaNavItem
            to="/inbox"
            label="Inbox"
            icon={Inbox}
            badge={inboxBadge.inbox}
            badgeTone={inboxBadge.failedRuns > 0 ? "danger" : "default"}
            alert={inboxBadge.failedRuns > 0}
          />
          <RaavaNavItem to="/agents/all" label="My Team" icon={Users} />
          <RaavaNavItem to="/issues" label="Tasks" icon={ListChecks} />
          <RaavaNavItem to="/projects" label="Projects" icon={FolderKanban} />
          <RaavaNavItem to="/routines" label="Routines" icon={Repeat} />

          {/* Divider between main nav and admin nav */}
          <div className="my-2 h-px bg-border" />

          <RaavaNavItem to="/costs" label="Billing" icon={CreditCard} />
          <RaavaNavItem to="/company/settings" label="Settings" icon={Settings} />
        </nav>
      </aside>
    );
  }

  /* ── Paperclip / standard sidebar ────────────────────────── */
  return (
    <aside className="w-60 h-full min-h-0 border-r border-border bg-background flex flex-col">
      {/* Top bar: Company name (bold) + Search — aligned with top sections (no visible border) */}
      <div className="flex items-center gap-1 px-3 h-12 shrink-0">
        {selectedCompany?.brandColor && (
          <div
            className="w-4 h-4 rounded-sm shrink-0 ml-1"
            style={{ backgroundColor: selectedCompany.brandColor }}
          />
        )}
        <span className="flex-1 text-sm font-bold text-foreground truncate pl-1">
          {selectedCompany?.name ?? "Select company"}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground shrink-0"
          onClick={openSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-auto-hide flex flex-col gap-4 px-3 py-2">
        <div className="flex flex-col gap-0.5">
          {/* New Issue button aligned with nav items */}
          <button
            onClick={() => openNewIssue()}
            className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
          >
            <SquarePen className="h-4 w-4 shrink-0" />
            <span className="truncate">New Issue</span>
          </button>
          <SidebarNavItem to="/dashboard" label="Dashboard" icon={LayoutDashboard} liveCount={liveRunCount} />
          <SidebarNavItem
            to="/inbox"
            label="Inbox"
            icon={Inbox}
            badge={inboxBadge.inbox}
            badgeTone={inboxBadge.failedRuns > 0 ? "danger" : "default"}
            alert={inboxBadge.failedRuns > 0}
          />
          <PluginSlotOutlet
            slotTypes={["sidebar"]}
            context={pluginContext}
            className="flex flex-col gap-0.5"
            itemClassName="text-[13px] font-medium"
            missingBehavior="placeholder"
          />
        </div>

        <SidebarSection label="Work">
          <SidebarNavItem to="/issues" label="Issues" icon={CircleDot} />
          <SidebarNavItem to="/routines" label="Routines" icon={Repeat} textBadge="Beta" textBadgeTone="amber" />
          <SidebarNavItem to="/goals" label="Goals" icon={Target} />
        </SidebarSection>

        <SidebarProjects />

        <SidebarAgents />

        <SidebarSection label="Company">
          <SidebarNavItem to="/org" label="Org" icon={Network} />
          <SidebarNavItem to="/skills" label="Skills" icon={Boxes} />
          <SidebarNavItem to="/costs" label="Costs" icon={DollarSign} />
          <SidebarNavItem to="/activity" label="Activity" icon={History} />
          <SidebarNavItem to="/company/settings" label="Settings" icon={Settings} />
        </SidebarSection>

        <PluginSlotOutlet
          slotTypes={["sidebarPanel"]}
          context={pluginContext}
          className="flex flex-col gap-3"
          itemClassName="rounded-lg border border-border p-3"
          missingBehavior="placeholder"
        />
      </nav>
    </aside>
  );
}
