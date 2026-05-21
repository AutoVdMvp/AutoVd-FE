"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { Font } from "@/shared/fonts";
import { Icons } from "@/shared/icons";

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
        className="p-1 transition-colors duration-300 rounded-lg cursor-pointer hover:text-warm-500 hover:bg-peach-pastel/25"
        aria-label="메뉴 열기"
      >
        <Icons.Menu className="icon" />
      </button>
      <div
        className={cn(
          "text-xl font-bold text-peach-deep shrink-0",
          Font.kavoon.className,
        )}
      >
        Auto VD
      </div>
      <div className="w-8" />
    </header>
  );
}
