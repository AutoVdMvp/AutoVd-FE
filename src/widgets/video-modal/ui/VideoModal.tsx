"use client";

import { cn } from "@/shared/lib/utils";
import type { Video } from "@/entities/video";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden ",
          "glaze-bg",
        )}
      >
        <video
          controls
          autoPlay
          muted
          playsInline
          preload="none"
          className="block w-full bg-black aspect-video"
        >
          {video.videoUrl && <source src={video.videoUrl} type="video/mp4" />}
          <track kind="captions" />
          영상을 재생할 수 없습니다.
        </video>

        <div className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <h2 className="font-bold truncate text-text-primary">
              {video.title}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">{video.createdAt}</p>
          </div>

          <a
            href={video.videoUrl || "#"}
            download={video.title}
            className={cn(
              "flex items-center gap-2 shrink-0",
              "px-4 py-2 rounded-lg text-sm font-medium",
              "bg-peach-deep/80 text-white",
              "hover:bg-peach-deep transition-colors duration-200",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M5 20h14v-2H5zm7-18v12.17l-3.59-3.58L7 12l5 5 5-5-1.41-1.41L13 14.17V2z"
              />
            </svg>
            다운로드
          </a>
        </div>
      </div>
    </div>
  );
}
