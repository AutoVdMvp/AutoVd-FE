"use client";

import { useState } from "react";
import { VideoCard, type Video } from "@/entities/video";
import { VideoModal } from "@/widgets/video-modal";

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

export function VideosView() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="flex flex-col h-full px-5 pt-5">
      <h1 className="text-xl font-bold shrink-0">영상 목록</h1>
      <div className="h-px my-3 bg-gray-300 shrink-0" />
      <div className="flex-1 min-h-0 p-3">
        <div className="h-full p-2 overflow-y-auto rounded-lg glaze-bg scrollbar-none">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {MOCK_VIDEOS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
