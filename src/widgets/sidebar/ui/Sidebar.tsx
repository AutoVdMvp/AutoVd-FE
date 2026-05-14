"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";
import type { SidebarNavItem } from "../model/types";
import { HomeIcon } from "@/shared/icons/HomeIcon";
import { VideoIcon } from "@/shared/icons/VideoIcon";

const DEFAULT_NAV_ITEMS: SidebarNavItem[] = [
  { id: "1", icon: <HomeIcon className="icon" />, label: "홈" },
  { id: "2", icon: <VideoIcon className="icon" />, label: "영상 목록" },
  { id: "3", icon: <HomeIcon className="icon" />, label: "그 외 무언가" },
];

export function Sidebar() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div
      id="sidebar"
      className={cn(
        "flex flex-col justify-between h-full bg-transparent",
        "border-r border-warm-200 shadow-2xl",
        "transition-all duration-300 overflow-hidden",
        isSidebarOpen ? "w-[288px]" : "w-12",
      )}
    >
      <div className="flex flex-col h-full gap-6 py-4">
        <SidebarHeader />
        <SidebarNav items={DEFAULT_NAV_ITEMS} />
      </div>
      <SidebarFooter />
    </div>
  );
}
