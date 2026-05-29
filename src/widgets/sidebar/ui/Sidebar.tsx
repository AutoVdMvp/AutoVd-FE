"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { useTutorialStore } from "@/shared/model/tutorialStore";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";
import type { SidebarNavItem } from "../model/types";
import { APP_NAV_ROUTES, APP_ACTION_ROUTES } from "@/shared/lib/navigation";

export function Sidebar() {
  const { isSidebarOpen } = useUIStore();
  const { openTutorial } = useTutorialStore();

  const actionHandlers: Record<string, () => void> = {
    tutorial: openTutorial,
  };

  const navItems: SidebarNavItem[] = [
    ...APP_NAV_ROUTES.map(({ kind, id, Icon, label, href }) => ({
      kind,
      id,
      icon: <Icon className="icon" />,
      label,
      href,
    })),
    ...APP_ACTION_ROUTES.map(({ kind, id, Icon, label }) => ({
      kind,
      id,
      icon: <Icon className="icon" />,
      label,
      onClick: actionHandlers[id],
    })),
  ];

  return (
    <div
      id="sidebar"
      className={cn(
        "hidden md:flex flex-col justify-between h-full bg-transparent",
        "border-r border-warm-200 shadow-2xl",
        "transition-all duration-300 overflow-hidden",
        isSidebarOpen ? "w-[288px]" : "w-12",
      )}
    >
      <div className="flex flex-col h-full gap-6 py-4">
        <SidebarHeader />
        <SidebarNav items={navItems} />
      </div>
      <SidebarFooter />
    </div>
  );
}
