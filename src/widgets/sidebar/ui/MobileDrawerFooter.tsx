"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "@/shared/icons";
import { FooterDropdown } from "./FooterDropdown";
import { FooterUserInfo } from "./FooterUserInfo";

// 모바일 드로어 하단. 유저 정보 클릭 시 컴팩트 드롭다운을 표시한다.
export function MobileDrawerFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0 border-t border-warm-200"
    >
      <FooterDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        compact
        className="right-2 left-2"
      />

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center h-16 gap-3 px-2 py-2 cursor-pointer hover:bg-peach-pastel/25 transition-colors duration-300"
      >
        <FooterUserInfo
          userName="Joseph Park"
          plan="Pro 요금제"
          isSidebarOpen={true}
        />
        <Icons.More className="icon text-text-primary ml-auto" />
      </div>
    </div>
  );
}
