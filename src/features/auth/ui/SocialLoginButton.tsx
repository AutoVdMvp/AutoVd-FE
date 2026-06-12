"use client";

import type { ReactNode } from "react";

export interface SocialLoginButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  icon: ReactNode;
  disabled?: boolean;
}

export function SocialLoginButton({
  onClick = () => {},
  className = "",
  children,
  icon,
  disabled = false,
}: SocialLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`relative flex items-center justify-center w-full h-12 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className="absolute left-4">{icon}</span>
      {children}
    </button>
  );
}
