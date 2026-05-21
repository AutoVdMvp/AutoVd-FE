import Link from "next/link";
import type { SidebarNavItem } from "../model/types";

interface NavItemProps {
  item: SidebarNavItem;
  isActive: boolean;
  isSidebarOpen: boolean;
}

export function NavItem({ item, isActive, isSidebarOpen }: NavItemProps) {
  return (
    <div className={`py-1 ${isSidebarOpen && "px-2"}`}>
      <Link
        href={item.href}
        className={`flex flex-row items-center justify-start w-full gap-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "text-warm-500 bg-peach-pastel/40 cursor-default"
            : `text-text-primary hover:-translate-y-1 ${isSidebarOpen && "hover:bg-peach-pastel/25 hover:text-warm-500"}`
        }`}
      >
        <div
          className={`flex items-center pl-1 py-1 shrink-0 rounded-lg ${isSidebarOpen ? "" : "hover:bg-peach-pastel/25 translate-x-2"}`}
        >
          {item.icon}
        </div>
        {isSidebarOpen && (
          <span className="flex-1 py-1 pr-1 overflow-hidden text-sm truncate whitespace-nowrap">
            {item.label}
          </span>
        )}
      </Link>
    </div>
  );
}
