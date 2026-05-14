"use client";

import { MoreIcon } from "@/shared/icons/MoreIcon";
import { UserIcon } from "@/shared/icons/UserIcon";
import { useUIStore } from "@/shared/model/uiStore";

export function SidebarFooter() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div
      className={`flex items-center h-20 gap-3 px-2 pb-4 text-sm border-t border-warm-200 shrink-0 ${isSidebarOpen ? "justify-between" : "justify-start"}`}
    >
      <div className="flex items-center gap-4 shrink-0">
        <UserIcon className="translate-x-[4.5px] icon shrink-0" />
        {isSidebarOpen && (
          <div className="flex flex-col gap-2 shrink-0">
            <span>이름</span>
            <span>요금제</span>
          </div>
        )}
      </div>
      {isSidebarOpen && (
        <div>
          <MoreIcon className="icon" />
        </div>
      )}
    </div>
  );
}
