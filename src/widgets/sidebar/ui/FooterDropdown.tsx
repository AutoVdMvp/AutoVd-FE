import { cn } from "@/shared/lib/utils";
import { Icons } from "@/shared/icons";
import { ReactNode } from "react";

interface MenuItem {
  label: string;
  icon: ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "설정", icon: <Icons.Setting className="mini-icon" /> },
  { label: "언어", icon: <Icons.Language className="mini-icon" /> },
  { label: "도움 받기", icon: <Icons.Help className="mini-icon" /> },
];

interface FooterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  /** 모바일 등 공간이 좁은 환경에서 패딩/텍스트를 줄인다 */
  compact?: boolean;
  /** 컨테이너 위치 오버라이드 (기본: right-1 left-5) */
  className?: string;
}

// 사이드바/드로어 하단 설정 드롭다운 메뉴.
export function FooterDropdown({
  isOpen,
  onClose,
  compact = false,
  className,
}: FooterDropdownProps) {
  return (
    <div
      className={cn(
        "absolute z-50 mb-1 overflow-hidden bg-white border shadow-lg bottom-full border-warm-200 rounded-xl transition-opacity duration-200",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
        className ?? "right-1 left-5",
      )}
    >
      {MENU_ITEMS.map((item) => (
        <button
          key={item.label}
          className={cn(
            "flex items-center w-full gap-3 transition-colors duration-150 text-text-primary hover:bg-peach-pastel/25",
            compact ? "px-3 py-2 text-xs gap-2" : "px-4 py-3 text-sm",
          )}
          onClick={onClose}
        >
          <span className="text-text-primary/60">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
