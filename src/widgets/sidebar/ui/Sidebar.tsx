"use client";

import { useUIStore } from "@/shared/model/uiStore";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";
import type { SidebarNavItem } from "../model/types";

const DEFAULT_NAV_ITEMS: SidebarNavItem[] = [
  { id: "1", icon: <div>아이콘</div>, label: "내 정보" },
  { id: "2", icon: <div>아이콘</div>, label: "내 정보" },
  { id: "3", icon: <div>아이콘</div>, label: "내 정보" },
];

export function Sidebar() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div
      id="sidebar"
      className={`flex flex-col justify-between h-full bg-blue-500 transition-all duration-300 overflow-hidden ${
        isSidebarOpen ? "w-[288px]" : "w-12"
      }`}
    >
      <div className="flex flex-col h-full gap-8 px-4 py-4">
        <SidebarHeader />
        <SidebarNav items={DEFAULT_NAV_ITEMS} />
      </div>
      <SidebarFooter />
    </div>
  );
}
