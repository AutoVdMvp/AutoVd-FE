"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { useUIStore } from "@/shared/model/uiStore";
import { Font } from "@/shared/fonts";
import { HomeIcon } from "@/shared/icons/HomeIcon";
import { VideoIcon } from "@/shared/icons/VideoIcon";
import { UserIcon } from "@/shared/icons/UserIcon";

const NAV_ITEMS = [
  { id: "1", Icon: HomeIcon, label: "홈", href: "/" },
  { id: "2", Icon: VideoIcon, label: "영상 목록", href: "/videos" },
  { id: "3", Icon: UserIcon, label: "그 외 무언가", href: "/other" },
];

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
        <div className="h-12 flex items-center justify-between gap-3 px-2 shrink-0">
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
            className="p-1 rounded-lg cursor-pointer transition-colors duration-300 hover:text-warm-500 hover:bg-peach-pastel/25"
            aria-label="메뉴 닫기"
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
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 pt-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ id, Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <div key={id} className="py-1 px-2">
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
                    <div className="flex items-center pl-1 py-1 shrink-0 rounded-lg">
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

        <div className="flex items-center gap-3 px-2 py-2 h-20 border-t border-warm-200 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/75 shrink-0">
            <span className="font-bold text-white">JP</span>
          </div>
          <div className="flex flex-col py-1">
            <span className="font-bold text-md text-text-primary/80">
              Joseph Park
            </span>
            <span className="text-xs">Pro 요금제</span>
          </div>
        </div>
      </div>
    </div>
  );
}
