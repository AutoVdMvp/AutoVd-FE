"use client";

import type { ReactNode } from "react";

export interface SocialLoginButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  icon: ReactNode;
}

export function SocialLoginButton({
  onClick = () => {},
  className = "",
  children,
  icon,
}: SocialLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-full h-12 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer ${className}`}
    >
      <span className="absolute left-4">{icon}</span>
      {children}
    </button>
  );
}
