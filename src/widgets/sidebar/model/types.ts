import type { ReactNode } from "react";

export interface SidebarNavItem {
  id: string;
  icon: ReactNode;
  label: string;
  href: string;
}

export interface SidebarProps {
  navItems?: SidebarNavItem[];
}
