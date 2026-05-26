import type { ReactNode } from "react";

export interface LinkNavItem {
  kind: "link";
  id: string;
  icon: ReactNode;
  label: string;
  href: string;
}

export interface ActionNavItem {
  kind: "action";
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export type SidebarNavItem = LinkNavItem | ActionNavItem;

export interface SidebarProps {
  navItems?: SidebarNavItem[];
}
