import { HelpIcon } from "@/shared/icons/HelpIcon";
import { LanguageIcon } from "@/shared/icons/LanguageIcon";
import { SettingIcon } from "@/shared/icons/SettingIcon";
import { ReactNode } from "react";

interface MenuItem {
  label: string;
  icon: ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "설정",
    icon: <SettingIcon className="mini-icon" />,
  },
  {
    label: "언어",
    icon: <LanguageIcon className="mini-icon" />,
  },
  {
    label: "도움 받기",
    icon: <HelpIcon className="mini-icon" />,
  },
];

interface FooterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FooterDropdown({ isOpen, onClose }: FooterDropdownProps) {
  return (
    <div
      className={`absolute z-50 mb-1 overflow-hidden bg-white border shadow-lg right-1 left-5 bottom-full border-warm-200 rounded-xl transition-opacity duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {MENU_ITEMS.map((item) => (
        <button
          key={item.label}
          className="flex items-center w-full gap-3 px-4 py-3 text-sm transition-colors duration-150 text-text-primary hover:bg-peach-pastel/25"
          onClick={onClose}
        >
          <span className="text-base text-text-primary/60">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
