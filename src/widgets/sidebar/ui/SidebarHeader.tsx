"use client";

import { Font } from "@/shared/fonts";
import { Icons } from "@/shared/icons";
import { useUIStore } from "@/shared/model/uiStore";
import { Button } from "@/shared/ui";

// 사이드바 상단 헤더. 로고와 사이드바 접기 버튼을 포함한다.
export function SidebarHeader() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div
      className={`h-12 flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"} gap-3 px-2`}
    >
      {isSidebarOpen && (
        <div
          className={`p-1 text-xl font-bold shrink-0 text-peach-deep ${Font.kavoon.className} cursor-default`}
        >
          Auto VD
        </div>
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleSidebar}
        className="hover:bg-peach-pastel/25 hover:text-warm-500 shrink-0"
        aria-label="Toggle sidebar"
      >
        <Icons.Sidebar className="icon" />
      </Button>
    </div>
  );
}
