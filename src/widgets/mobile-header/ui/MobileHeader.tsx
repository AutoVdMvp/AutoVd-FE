"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { Font } from "@/shared/fonts";
import { Icons } from "@/shared/icons";
import { Button } from "@/shared/ui";

// 모바일 전용 상단 헤더. 햄버거 버튼으로 드로어를 열 수 있다.
export function MobileHeader() {
  const { toggleMobileDrawer } = useUIStore();

  return (
    <header
      className={cn(
        "md:hidden flex items-center justify-between h-12 px-3",
        "border-b border-warm-200 bg-white shrink-0",
      )}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleMobileDrawer}
        className="hover:bg-peach-pastel/25 hover:text-warm-500"
        aria-label="메뉴 열기"
      >
        <Icons.Menu className="icon" />
      </Button>
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
