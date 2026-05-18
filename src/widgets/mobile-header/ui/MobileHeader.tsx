"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { Font } from "@/shared/fonts";

export function MobileHeader() {
  const { toggleMobileDrawer } = useUIStore();

  return (
    <header
      className={cn(
        "md:hidden flex items-center justify-between h-12 px-3",
        "border-b border-warm-200 bg-white shrink-0",
      )}
    >
      <button
        onClick={toggleMobileDrawer}
        className="p-1 rounded-lg cursor-pointer transition-colors duration-300 hover:text-warm-500 hover:bg-peach-pastel/25"
        aria-label="메뉴 열기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="icon"
        >
          <path
            fill="currentColor"
            d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
          />
        </svg>
      </button>
      <div
        className={cn(
          "text-xl font-bold text-peach-deep",
          Font.kavoon.className,
        )}
      >
        Auto VD
      </div>
      <div className="w-8" />
    </header>
  );
}
