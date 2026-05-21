"use client";

import { useEffect, useRef, useState } from "react";
import { MoreIcon } from "@/shared/icons/MoreIcon";
import { useUIStore } from "@/shared/model/uiStore";

const MENU_ITEMS = [
  {
    label: "설정",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54a7.4 7.4 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.36 1.04.67 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7.4 7.4 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2" />
      </svg>
    ),
  },
  {
    label: "언어",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8 8 0 0 1 5.08 16m2.95-8H5.08a8 8 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25 5.56A15.7 15.7 0 0 0 15.97 16h2.95a8.03 8.03 0 0 1-4.33 3.56M15.97 8c-.32-1.25-.78-2.45-1.38-3.56A8.03 8.03 0 0 1 18.92 8z" />
      </svg>
    ),
  },
  {
    label: "도움 받기",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 17h-2v-2h2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41c0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25" />
      </svg>
    ),
  },
] as const;

export function SidebarFooter() {
  const { isSidebarOpen } = useUIStore();
  const userName = "Joseph Park";
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
      {isDropdownOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-warm-200 rounded-xl shadow-lg overflow-hidden z-50">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-text-primary hover:bg-peach-pastel/25 transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}
            >
              <span className="text-base text-text-primary/60">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className={`group cursor-pointer hover:bg-peach-pastel/25 transition-all duration-300 flex items-center h-20 gap-3 px-2 py-2 text-sm border-t border-warm-200 ${isSidebarOpen ? "justify-between" : "justify-start"}`}
      >
        <div className="flex items-center gap-4 shrink-0">
          <div
            className={`flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full cursor-default bg-black/75 group-hover:shadow-xl ${isSidebarOpen ? "" : "-translate-x-1.25"}`}
          >
            <span className="font-bold text-white">JP</span>
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col py-1 shrink-0">
              <span className="font-bold transition-all duration-300 text-md text-text-primary/80 group-hover:text-text-primary">
                {userName}
              </span>
              <span className="text-xs">Pro 요금제</span>
            </div>
          )}
        </div>
        {isSidebarOpen && (
          <div>
            <MoreIcon className="icon text-text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
