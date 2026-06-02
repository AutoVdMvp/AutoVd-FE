"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode, ComponentPropsWithoutRef } from "react";
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

// VariantProps + 네이티브 button 속성 전체(aria-*, data-* 포함) 지원.
type ButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentPropsWithoutRef<"button">, "children"> & {
    children: ReactNode;
  };

// 범용 버튼 컴포넌트. variant와 size로 외형을 제어한다.
export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
