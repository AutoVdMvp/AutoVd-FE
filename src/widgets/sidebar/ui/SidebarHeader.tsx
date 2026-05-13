"use client";

import { SidebarIcon } from "@/shared/icons/sidebarIcon";
import { useUIStore } from "@/shared/model/uiStore";

export function SidebarHeader() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div
      className={`flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} gap-3`}
    >
      {isSidebarOpen && (
        <div className="text-xl font-bold text-amber-300 shrink-0">Auto VD</div>
      )}
      <button
        onClick={toggleSidebar}
        className="transition-opacity hover:opacity-80 shrink-0"
        aria-label="Toggle sidebar"
      >
        <SidebarIcon className="w-7 h-7" />
      </button>
    </div>
  );
}
