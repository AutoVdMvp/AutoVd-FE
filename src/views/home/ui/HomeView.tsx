"use client";

import { ArticleEditor } from "@/widgets/article-editor";
import { useCurrentUser } from "@/entities/user";

export function HomeView() {
  const { data: user, isLoading, isError } = useCurrentUser();

  return (
    <div className="flex flex-col items-center min-h-full">
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
