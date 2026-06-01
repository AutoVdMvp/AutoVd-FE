"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// (pages) 그룹 내 런타임 에러를 잡는 에러 바운더리. sidebar는 유지된다.
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Page Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full px-4 text-center">
      <p className="text-6xl font-bold text-rose-deep/30 select-none">500</p>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-text-primary">
          문제가 발생했습니다
        </h1>
        <p className="text-sm text-text-muted max-w-xs">
          {error.message || "예기치 않은 오류가 발생했습니다."}
        </p>
      </div>

      <button
        type="button"
        onClick={reset}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-peach-pastel text-text-primary hover:bg-peach-deep hover:text-white transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
