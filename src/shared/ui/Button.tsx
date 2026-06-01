"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center font-semibold rounded transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-peach-deep text-white hover:bg-peach-deep/80",
        secondary: "bg-warm-200 text-text-primary hover:bg-warm-300",
        ghost: "text-text-secondary hover:bg-warm-100 hover:text-text-primary",
        outline:
          "border border-warm-300 bg-transparent text-text-primary hover:bg-warm-100",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        "icon-sm": "h-8 w-8 p-0",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

// 범용 버튼 컴포넌트. variant와 size로 외형을 제어한다.
export function Button({
  children,
  onClick,
  variant,
  size,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
