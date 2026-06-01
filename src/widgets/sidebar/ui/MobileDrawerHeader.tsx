"use client";

import { cn } from "@/shared/lib/utils";
import { Font } from "@/shared/fonts";
import { Icons } from "@/shared/icons";
import { Button } from "@/shared/ui";

// 모바일 드로어 상단. 로고와 닫기 버튼을 포함한다.
export function MobileDrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between h-12 gap-3 px-2 shrink-0">
      <div
        className={cn(
          "p-1 text-xl font-bold text-peach-deep",
          Font.kavoon.className,
        )}
      >
        Auto VD
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onClose}
        className="hover:bg-peach-pastel/25 hover:text-warm-500"
        aria-label="메뉴 닫기"
      >
        <Icons.Close className="icon" />
      </Button>
    </div>
  );
}
