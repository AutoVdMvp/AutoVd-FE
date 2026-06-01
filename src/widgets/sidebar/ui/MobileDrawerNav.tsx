"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { APP_NAV_ROUTES } from "@/shared/lib/navigation";

// 모바일 드로어 네비게이션 목록. 링크 클릭 시 드로어를 닫는다.
export function MobileDrawerNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-1 min-h-0 pt-1 overflow-y-auto">
      <div className="flex flex-col gap-1">
        {APP_NAV_ROUTES.map(({ id, Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <div key={id} className="px-2 py-1">
              <Link
                href={href}
                onClick={onClose}
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
  );
}
