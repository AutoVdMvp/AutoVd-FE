"use client";

import { useEffect } from "react";
import { ArticleEditor } from "@/widgets/article-editor";
import { useCurrentUser } from "@/entities/user";
import { useAuthStore } from "@/shared/model/authStore";
import { RefreshTestButton } from "@/shared/api/testRefresh";

export function HomeView() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    console.group("🔐 Token Debug");
    console.log("AT (Zustand):", accessToken);
    console.log(
      "AT (Cookie):",
      document.cookie.match(/(^| )access_token=([^;]+)/)?.[2] ?? "없음",
    );
    console.log(
      "RT (Cookie):",
      document.cookie.match(/(^| )refresh_token=([^;]+)/)?.[2] ??
        "없음 (HttpOnly면 JS에서 보이지 않음)",
    );
    console.groupEnd();
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center min-h-full">
      <RefreshTestButton />
      <div className="flex flex-col items-center gap-4 pt-[30vh] pb-16 w-full">
        <h1 className="text-xl font-bold">AutoVD</h1>

        {/* TODO: 테스트용 — 확인 후 제거 */}
        <div className="text-sm text-muted-foreground">
          {isLoading && <span>사용자 정보 로딩 중...</span>}
          {isError && (
            <span className="text-destructive">사용자 정보 조회 실패</span>
          )}
          {user && (
            <span>
              {user.name} ({user.email}) · {user.plan}
            </span>
          )}
        </div>

        <div className="flex flex-col m-3.5 gap-3">
          <div className="relative">
            <ArticleEditor onSubmit={(text) => console.log(text)} />
          </div>
        </div>
      </div>
    </div>
  );
}
