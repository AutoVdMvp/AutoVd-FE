"use client";

import { useUIStore } from "@/shared/model/uiStore";
import type { SidebarNavItem } from "../model/types";

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const { isSidebarOpen } = useUIStore();

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-1 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div key={item.id} className={`${isSidebarOpen && "px-2"}`}>
            <div
              className={`flex flex-row items-center justify-start w-full gap-2 cursor-pointer rounded-lg hover:-translate-y-1  transition-all duration-300 text-text-primary ${isSidebarOpen && "hover:bg-peach-pastel/25 hover:text-warm-500"}`}
            >
              <div
                className={`flex items-center pl-1 py-1 shrink-0 rounded-lg ${isSidebarOpen ? "" : "hover:bg-peach-pastel/25 translate-x-2 "}`}
              >
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="flex-1 py-1 pr-1 overflow-hidden text-sm truncate whitespace-nowrap ">
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
