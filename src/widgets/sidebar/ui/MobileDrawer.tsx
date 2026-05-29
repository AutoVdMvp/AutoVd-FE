"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { Font } from "@/shared/fonts";
import { Icons } from "@/shared/icons";
import { APP_NAV_ROUTES } from "@/shared/lib/navigation";
import { FooterUserInfo } from "./FooterUserInfo";

export function MobileDrawer() {
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useUIStore();
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isMobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileDrawerOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[288px] z-50",
          "flex flex-col bg-white border-r border-warm-200 shadow-2xl",
          "transition-transform duration-300",
          isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-12 gap-3 px-2 shrink-0">
          <div
            className={cn(
              "p-1 text-xl font-bold text-peach-deep",
              Font.kavoon.className,
            )}
          >
            Auto VD
          </div>
          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="p-1 transition-colors duration-300 rounded-lg cursor-pointer hover:text-warm-500 hover:bg-peach-pastel/25"
            aria-label="메뉴 닫기"
          >
            <Icons.Close className="icon" />
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 pt-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {APP_NAV_ROUTES.map(({ id, Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <div key={id} className="px-2 py-1">
                  <Link
                    href={href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={cn(
                      "flex items-center w-full gap-2 rounded-lg transition-all duration-300",
                      isActive
                        ? "text-warm-500 bg-peach-pastel/40 cursor-default"
                        : "text-text-primary hover:bg-peach-pastel/25 hover:text-warm-500",
                    )}
                  >
                    <div className="flex items-center py-1 pl-1 rounded-lg shrink-0">
                      <Icon className="icon" />
                    </div>
                    <span className="flex-1 py-1 pr-1 text-sm truncate whitespace-nowrap">
                      {label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center h-20 gap-3 px-2 py-2 border-t border-warm-200 shrink-0">
          <FooterUserInfo
            userName="Joseph Park"
            plan="Pro 요금제"
            isSidebarOpen={true}
          />
        </div>
      </div>
    </div>
  );
}
