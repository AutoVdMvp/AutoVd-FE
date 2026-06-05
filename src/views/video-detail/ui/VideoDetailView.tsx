import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { Video } from "@/entities/video";
import { VideoEditTabs } from "./VideoEditTabs";

interface VideoDetailViewProps {
  video: Video;
}

// 비디오 상세 페이지. 상단 컴팩트 플레이어 + 하단 편집 탭(메인)으로 구성된다.
export function VideoDetailView({ video }: VideoDetailViewProps) {
  return (
    <div className="flex flex-col h-full min-h-0 gap-3 px-5 pt-4">
      {/* 뒤로가기 */}
      <Link
        href="/videos"
        className="flex items-center gap-1 text-sm transition-colors text-text-muted hover:text-text-primary w-fit shrink-0"
      >
        ← 영상 목록
      </Link>

      {/* 컴팩트 비디오 정보 행 */}
      <div className="flex items-start gap-4 p-3 shrink-0 rounded-2xl glaze-bg">
        {/* 작은 플레이어 — 전체화면은 브라우저 기본 controls로 지원 */}
        <video
          controls
          muted
          playsInline
          preload="none"
          aria-label={video.title}
          className="bg-black w-52 md:w-72 aspect-video rounded-xl shrink-0"
        >
          {video.videoUrl && <source src={video.videoUrl} type="video/mp4" />}
          <track kind="captions" />
        </video>

        {/* 영상 메타 정보 */}
        <div className="flex flex-col flex-1 min-w-0 gap-3 py-1">
          <div>
            <h1 className="font-bold leading-snug text-text-primary">
              {video.title}
            </h1>
            <p className="mt-1 text-xs text-text-muted">{video.createdAt}</p>
          </div>

          <a
            href={video.videoUrl || "#"}
            download={video.title}
            className={cn(
              "flex items-center gap-2 w-fit",
              "px-3 py-1.5 rounded-lg text-sm font-medium",
              "bg-peach-deep/80 text-white",
              "hover:bg-peach-deep transition-colors duration-200",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4"
              aria-hidden="true"
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

      {/* 편집 탭 — 남은 공간 전부 차지 */}
      <div className="flex-1 min-h-0 mb-4 overflow-hidden rounded-2xl glaze-bg">
        <VideoEditTabs video={video} />
      </div>
    </div>
  );
}
