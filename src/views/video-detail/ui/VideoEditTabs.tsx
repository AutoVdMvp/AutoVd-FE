"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import type { Video } from "@/entities/video";

interface VideoEditTabsProps {
  video: Video;
}

// 비디오 상세 편집 탭. 각 탭이 독립적인 편집 영역을 가지며 페이지의 메인 콘텐츠다.
export function VideoEditTabs({ video }: VideoEditTabsProps) {
  return (
    <Tabs defaultValue="script" className="flex flex-col h-full">
      <TabsList variant="line" className="px-4 pt-3 shrink-0">
        <TabsTrigger value="script">대본 수정</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
      </TabsList>

      <TabsContent value="script" className="flex-1 p-4 overflow-y-auto">
        <p className="text-sm text-text-muted">
          대본 편집 영역 — 백엔드 연동 후 구현 예정
        </p>
      </TabsContent>

      <TabsContent value="tab2" className="flex-1 p-4 overflow-y-auto">
        <p className="text-sm text-text-muted">
          탭 2 콘텐츠 — 백엔드 연동 후 구현 예정
        </p>
      </TabsContent>

      <TabsContent value="tab3" className="flex-1 p-4 overflow-y-auto">
        <p className="text-sm text-text-muted">
          탭 3 콘텐츠 — 백엔드 연동 후 구현 예정
        </p>
      </TabsContent>
    </Tabs>
  );
}
