"use client";

import { usePathname } from "next/navigation";
import { useUIStore } from "@/shared/model/uiStore";
import type { SidebarNavItem } from "../model/types";
import { NavItem } from "./NavItem";

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const { isSidebarOpen } = useUIStore();
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-1 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={item.kind === "link" ? pathname === item.href : false}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
      </div>
    </div>
  );
}
