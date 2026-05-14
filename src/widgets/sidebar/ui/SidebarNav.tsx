"use client";

import { useUIStore } from "@/shared/model/uiStore";
import type { SidebarNavItem } from "../model/types";

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className={`px-2`}>
            <div className="flex flex-row items-center justify-start w-full gap-2 translate-x-[4.5px]">
              <div className="flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="flex-1 overflow-hidden text-sm truncate whitespace-nowrap text-text-primary">
                  {item.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
