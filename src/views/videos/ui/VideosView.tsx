"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  VideoCard,
  VideoCardSkeleton,
  MOCK_VIDEOS,
  type Video,
} from "@/entities/video";
import { EmptyState } from "@/shared/ui";
import { Icons } from "@/shared/icons";

const SKELETON_COUNT = 8;

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}

// API 연결 시 이 컴포넌트 안에서 useSuspenseQuery 사용
function VideoGrid({ onSelect }: { onSelect: (video: Video) => void }) {
  // const { data: videos } = useSuspenseQuery(videoQueries.list())
  const videos = MOCK_VIDEOS;

  if (videos.length === 0) {
    return (
      <EmptyState
        icon={<Icons.Video />}
        title="아직 생성된 영상이 없습니다"
        description="기사 링크를 제출하면 자동으로 영상이 생성됩니다"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onClick={onSelect} />
      ))}
    </div>
  );
}

// 영상 목록 페이지. 카드 클릭 시 /videos/[id] 로 이동한다.
export function VideosView() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full px-5 pt-5">
      <h1 className="text-xl font-bold shrink-0">영상 목록</h1>
      <div
        className="h-px my-3 bg-linear-to-br from-peach-pastel to-rose-pastel shrink-0"
        aria-hidden="true"
      />
      <div className="flex-1 min-h-0 p-3">
        <div className="h-full p-2 overflow-y-auto rounded-lg glaze-bg scrollbar-none">
          <Suspense fallback={<VideoGridSkeleton />}>
            <VideoGrid
              onSelect={(video) => router.push(`/videos/${video.id}`)}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
