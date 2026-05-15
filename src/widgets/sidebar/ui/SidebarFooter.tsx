"use client";

import { MoreIcon } from "@/shared/icons/MoreIcon";
import { useUIStore } from "@/shared/model/uiStore";

export function SidebarFooter() {
  const { isSidebarOpen } = useUIStore();
  const userName = "Joseph Park";
  return (
    <div
      className={`group cursor-pointer hover:bg-peach-pastel/25 transition-all duration-300 flex items-center h-20 gap-3 px-2 py-2 text-sm border-t border-warm-200 shrink-0 ${isSidebarOpen ? "justify-between" : "justify-start"}`}
    >
      <div className="flex items-center gap-4 shrink-0">
        <div
          className={`flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full cursor-default bg-black/75 group-hover:shadow-xl ${isSidebarOpen ? "" : "-translate-x-1.25"}`}
        >
          <span className="font-bold text-white ">JP</span>
        </div>
        {isSidebarOpen && (
          <div className="flex flex-col py-1 shrink-0">
            <span className="font-bold transition-all duration-300 text-md text-text-primary/80 group-hover:text-text-primary">
              {userName}
            </span>
            <span className="text-xs">Pro 요금제</span>
          </div>
        )}
      </div>
      {isSidebarOpen && (
        <div>
          <MoreIcon className="icon text-text-primary" />
        </div>
      )}
    </div>
  );
}
