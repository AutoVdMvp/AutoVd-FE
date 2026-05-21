"use client";

import { Font } from "@/shared/fonts";
import { Icons } from "@/shared/icons";
import { useUIStore } from "@/shared/model/uiStore";

export function SidebarHeader() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div
      className={`h-12 flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} gap-3 px-2`}
    >
      {isSidebarOpen && (
        <div
          className={`p-1 text-xl font-bold shrink-0 text-peach-deep ${Font.kavoon.className} cursor-default`}
        >
          Auto VD
        </div>
      )}
      <button
        onClick={toggleSidebar}
        className="p-1 duration-300 rounded-lg cursor-pointer transition-color hover:text-warm-500 hover:bg-peach-pastel/25 shrink-0"
        aria-label="Toggle sidebar"
      >
        <Icons.Sidebar className="icon" />
      </button>
    </div>
  );
}
