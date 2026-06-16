"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cn } from "@/shared/lib/utils";
import { videoQueries } from "@/entities/video";
import { VideoEditTabs } from "./VideoEditTabs";

interface VideoDetailViewProps {
  id: string;
}

function VideoDetailContent({ id }: { id: string }) {
  const { data: video } = useSuspenseQuery(videoQueries.detail(id));

  return (
    <div className="flex flex-col h-full min-h-0 gap-3 px-5 pt-4">
      <Link
        href="/videos"
        className="flex items-center gap-1 text-sm transition-colors text-text-muted hover:text-text-primary w-fit shrink-0"
      >
        ← 영상 목록
      </Link>

      <div className="flex items-start gap-4 p-3 shrink-0 rounded-2xl glaze-bg">
        <video
          controls
          muted
          playsInline
          preload="none"
          aria-label={video.original_url}
          className="bg-black w-52 md:w-72 aspect-video rounded-xl shrink-0"
        >
          {video.vd_url && <source src={video.vd_url} type="video/mp4" />}
          <track kind="captions" />
        </video>

        <div className="flex flex-col flex-1 min-w-0 gap-3 py-1">
          <div>
            <h1 className="font-bold leading-snug text-text-primary truncate">
              {video.original_url}
            </h1>
            <p className="mt-1 text-xs text-text-muted">{video.created_at}</p>
          </div>

          <a
            href={video.vd_url || "#"}
            download
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

      <div className="flex-1 min-h-0 mb-4 overflow-hidden rounded-2xl glaze-bg">
        <VideoEditTabs video={video} />
      </div>
    </div>
  );
}

export function VideoDetailView({ id }: VideoDetailViewProps) {
  return (
    <Suspense fallback={null}>
      <VideoDetailContent id={id} />
    </Suspense>
  );
}
