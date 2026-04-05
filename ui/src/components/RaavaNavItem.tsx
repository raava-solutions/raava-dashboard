import { NavLink } from "@/lib/router";
import { cn } from "../lib/utils";
import { useSidebar } from "../context/SidebarContext";
import type { LucideIcon } from "lucide-react";

interface RaavaNavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  className?: string;
  badge?: number;
  badgeTone?: "default" | "danger";
  alert?: boolean;
  liveCount?: number;
}

/**
 * Raava-branded sidebar nav item matching the FleetOS Figma design.
 *
 * Active state: light-blue background (`rgba(34,74,232,0.08)`), blue text (#224AE8),
 * semibold weight, and a 3px gradient left-border accent.
 *
 * Inactive state: gray-500 text, medium weight, hover to foreground.
 */
export function RaavaNavItem({
  to,
  label,
  icon: Icon,
  end,
  className,
  badge,
  badgeTone = "default",
  alert = false,
  liveCount,
}: RaavaNavItemProps) {
  const { isMobile, setSidebarOpen } = useSidebar();

  return (
    <NavLink
      to={to}
      end={end}
      onClick={() => {
        if (isMobile) setSidebarOpen(false);
      }}
      className={({ isActive }) =>
        cn(
          "relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-[rgba(34,74,232,0.08)] font-semibold text-[#224AE8] dark:bg-[rgba(34,74,232,0.15)] dark:text-[#6B8AFF]"
            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
          className,
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Gradient left border accent on active item */}
          {isActive && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full"
              style={{ background: "var(--raava-gradient)" }}
            />
          )}
          <span className="relative shrink-0">
            <Icon className="h-4 w-4" />
            {alert && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_0_2px_hsl(var(--background))]" />
            )}
          </span>
          <span className="flex-1 truncate">{label}</span>
          {liveCount != null && liveCount > 0 && (
            <span className="ml-auto flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                {liveCount} live
              </span>
            </span>
          )}
          {badge != null && badge > 0 && (
            <span
              className={cn(
                "ml-auto rounded-full px-1.5 py-0.5 text-xs leading-none",
                badgeTone === "danger"
                  ? "bg-red-600/90 text-red-50"
                  : "bg-primary text-primary-foreground",
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
