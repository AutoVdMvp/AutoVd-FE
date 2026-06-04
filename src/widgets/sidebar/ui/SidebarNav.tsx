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
    <nav
      aria-label="주 네비게이션"
      className="flex flex-col flex-1 min-h-0 pt-1 overflow-x-hidden overflow-y-auto"
    >
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <NavItem
              item={item}
              isActive={item.kind === "link" ? pathname === item.href : false}
              isSidebarOpen={isSidebarOpen}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
