"use client";

import { UserIcon } from "@/shared/icons/userIcon";
import { useUIStore } from "@/shared/model/uiStore";

export function SidebarFooter() {
  const { isSidebarOpen } = useUIStore();

  return (
    <div
      className={`flex items-center h-20 gap-3 px-4 pb-4 text-sm border-t border-warm-200 shrink-0 ${isSidebarOpen ? "justify-between" : "justify-center"}`}
    >
      <div className="flex items-center gap-3 shrink-0">
        <UserIcon className="w-6 h-6 shrink-0" />
        {isSidebarOpen && (
          <div className="flex flex-col gap-2 shrink-0">
            <span>이름</span>
            <span>요금제</span>
          </div>
        )}
      </div>
      {isSidebarOpen && (
        <div>
          <span>이모티콘(더보기)</span>
        </div>
      )}
    </div>
  );
}
