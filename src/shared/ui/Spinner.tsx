import { cn } from "@/shared/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

// 로딩 상태를 나타내는 회전 스피너. 크기 3단계 지원.
export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(
        "rounded-full border-warm-300 border-t-peach-deep animate-spin",
        sizeClasses[size],
        className,
      )}
    />
  );
}
