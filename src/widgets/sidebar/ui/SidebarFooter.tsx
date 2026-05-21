"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/shared/model/uiStore";
import { FooterDropdown } from "./FooterDropdown";
import { FooterUserInfo } from "./FooterUserInfo";

export function SidebarFooter() {
  const { isSidebarOpen } = useUIStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <FooterDropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
      />
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={`group cursor-pointer hover:bg-peach-pastel/25 transition-all duration-300 flex items-center h-20 gap-3 px-2 py-2 text-sm border-t border-warm-200 ${isSidebarOpen ? "justify-between" : "justify-start"}`}
      >
        <FooterUserInfo
          userName="Joseph Park"
          plan="Pro 요금제"
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}
