"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";
import type { SidebarNavItem } from "../model/types";
import { HomeIcon } from "@/shared/icons/HomeIcon";
import { VideoIcon } from "@/shared/icons/VideoIcon";
import { UserIcon } from "@/shared/icons/UserIcon";

const DEFAULT_NAV_ITEMS: SidebarNavItem[] = [
  { id: "1", icon: <HomeIcon className="icon" />, label: "홈", href: "/" },
  {
    id: "2",
    icon: <VideoIcon className="icon" />,
    label: "영상 목록",
    href: "/videos",
  },
  {
    id: "3",
    icon: <UserIcon className="icon" />,
    label: "그 외 무언가",
    href: "/other",
  },
];

export function Sidebar() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div
      id="sidebar"
      className={cn(
        "hidden md:flex flex-col justify-between h-full bg-transparent",
        "border-r border-warm-200 shadow-2xl",
        "transition-all duration-300 overflow-hidden",
        // tablet: w-12 고정, desktop: toggle 상태에 따라
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
