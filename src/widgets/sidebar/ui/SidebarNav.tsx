"use client";

import { useUIStore } from "@/shared/model/uiStore";
import type { SidebarNavItem } from "../model/types";

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-3 pt-4 overflow-x-hidden overflow-y-auto">
      {items.map((item) => (
        <div
          key={item.id}
          className="px-3 py-2 transition-colors rounded-lg cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0">{item.icon}</div>
            {isSidebarOpen && (
              <span className="overflow-hidden text-sm whitespace-nowrap text-text-primary">
                {item.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
