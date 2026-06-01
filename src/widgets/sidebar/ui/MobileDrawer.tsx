"use client";

import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { MobileDrawerHeader } from "./MobileDrawerHeader";
import { MobileDrawerNav } from "./MobileDrawerNav";
import { MobileDrawerFooter } from "./MobileDrawerFooter";

// 모바일 전용 슬라이드 드로어. backdrop + 패널을 조립한다.
export function MobileDrawer() {
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useUIStore();
  const close = () => setMobileDrawerOpen(false);

  return (
    <div className="md:hidden">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isMobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={close}
      />
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[288px] z-50",
          "flex flex-col bg-white border-r border-warm-200 shadow-2xl",
          "transition-transform duration-300",
          isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <MobileDrawerHeader onClose={close} />
        <MobileDrawerNav onClose={close} />
        <MobileDrawerFooter />
      </div>
    </div>
  );
}
