"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { SidebarNavItem } from "../model/types";

interface NavItemProps {
  item: SidebarNavItem;
  isActive: boolean;
  isSidebarOpen: boolean;
}

const getInnerClass = (isActive: boolean, isSidebarOpen: boolean) =>
  cn(
    "flex flex-row items-center justify-start w-full gap-2 rounded-lg transition-all duration-300 text-left cursor-pointer",
    isActive
      ? "text-warm-500 bg-peach-pastel/40 cursor-default"
      : cn(
          "text-text-primary hover:-translate-y-1",
          isSidebarOpen && "hover:bg-peach-pastel/25 hover:text-warm-500",
        ),
  );

const getIconWrapClass = (isSidebarOpen: boolean) =>
  cn(
    "flex items-center pl-1 py-1 shrink-0 rounded-lg",
    !isSidebarOpen && "hover:bg-peach-pastel/25 translate-x-2",
  );

export function NavItem({ item, isActive, isSidebarOpen }: NavItemProps) {
  const wrapClass = cn("py-1", isSidebarOpen && "px-2");
  const innerClass = getInnerClass(isActive, isSidebarOpen);
  const iconWrapClass = getIconWrapClass(isSidebarOpen);

  const content = (
    <>
      <div className={iconWrapClass}>{item.icon}</div>
      {isSidebarOpen && (
        <span className="flex-1 py-1 pr-1 overflow-hidden text-sm truncate whitespace-nowrap">
          {item.label}
        </span>
      )}
    </>
  );

  return (
    <div className={wrapClass}>
      {item.kind === "link" ? (
        <Link href={item.href} className={innerClass}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={item.onClick} className={innerClass}>
          {content}
        </button>
      )}
    </div>
  );
}
