"use client";

import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui";
import type { Video } from "@/entities/video";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

// 선택된 영상을 전체화면 오버레이로 재생하는 모달. ESC·backdrop 클릭으로 닫힌다.
export function VideoModal({ video, onClose }: VideoModalProps) {
  return (
    <Dialog open={!!video} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="p-0 max-w-2xl rounded-2xl overflow-hidden ring-0 gap-0 glaze-bg"
        overlayClassName="bg-black/60 backdrop-blur-sm"
        showCloseButton={false}
        aria-label={video?.original_url ?? "영상 재생"}
      >
        <DialogTitle className="sr-only">
          {video?.original_url ?? "영상 재생"}
        </DialogTitle>
        {video && (
          <>
            <video
              controls
              autoPlay
              muted
              playsInline
              preload="none"
              className="block w-full bg-black aspect-video"
            >
              {video.vd_url && <source src={video.vd_url} type="video/mp4" />}
              <track kind="captions" />
              영상을 재생할 수 없습니다.
            </video>

            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <h2 className="font-bold truncate text-text-primary">
                  {video.original_url}
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  {video.created_at}
                </p>
              </div>

              <a
                href={video.vd_url || "#"}
                download
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
