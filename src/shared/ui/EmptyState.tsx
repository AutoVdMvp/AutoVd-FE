import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

// 데이터가 없을 때 표시하는 빈 상태 UI. 아이콘, 설명, CTA 버튼 슬롯을 제공한다.
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 px-4 text-center",
        className,
      )}
    >
      {icon && (
        <div
          className="text-text-muted opacity-40 [&>svg]:w-12 [&>svg]:h-12"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <p className="text-text-primary font-semibold text-base">{title}</p>
      {description && (
        <p className="text-text-muted text-sm max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
