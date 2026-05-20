"use client";

import { lazy, Suspense, useState } from "react";
import { VideoCard, VideoCardSkeleton, type Video } from "@/entities/video";

// 초기 번들에서 분리 — 클릭 시 첫 로드
const VideoModal = lazy(() =>
  import("@/widgets/video-modal").then((m) => ({ default: m.VideoModal })),
);

const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "자동화 영상 #1",
    thumbnailUrl: "",
    videoUrl: "",
    duration: 185,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "자동화 영상 #2",
    thumbnailUrl: "",
    videoUrl: "",
    duration: 242,
    createdAt: "2025-01-16",
  },
  {
    id: "3",
    title: "자동화 영상 #3",
    thumbnailUrl: "",
    videoUrl: "",
    duration: 98,
    createdAt: "2025-01-17",
  },
  {
    id: "4",
    title: "자동화 영상 #4",
    thumbnailUrl: "",
    videoUrl: "",
    duration: 311,
    createdAt: "2025-01-18",
  },
  {
    id: "5",
    title: "자동화 영상 #5",
    thumbnailUrl: "",
    videoUrl: "",
    duration: 157,
    createdAt: "2025-01-19",
  },
  {
    id: "6",
    title: "자동화 영상 #6",
    thumbnailUrl: "",
    videoUrl: "",
    duration: 204,
    createdAt: "2025-01-20",
  },
];

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

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onClick={onSelect} />
      ))}
    </div>
  );
}

export function VideosView() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="flex flex-col h-full px-5 pt-5">
      <h1 className="text-xl font-bold shrink-0">영상 목록</h1>
      <div className="h-px my-3 bg-linear-to-br from-peach-pastel to-rose-pastel shrink-0" />
      <div className="flex-1 min-h-0 p-3">
        <div className="h-full p-2 overflow-y-auto rounded-lg glaze-bg scrollbar-none">
          <Suspense fallback={<VideoGridSkeleton />}>
            <VideoGrid onSelect={setSelectedVideo} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={null}>
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </Suspense>
    </div>
  );
}
