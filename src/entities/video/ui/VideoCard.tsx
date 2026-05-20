"use client";

import { cn } from "@/shared/lib/utils";
import type { Video } from "../model/types";
import Image from "next/image";

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const THUMBNAIL_GRADIENTS = [
  "from-peach-pastel to-rose-pastel",
  "from-lavender-pastel to-sky-pastel",
  "from-mint-pastel to-lavender-pastel",
  "from-sky-pastel to-mint-pastel",
  "from-rose-pastel to-peach-pastel",
  "from-warm-200 to-peach-pastel",
];

export function VideoCard({ video, onClick }: VideoCardProps) {
  const gradient =
    THUMBNAIL_GRADIENTS[parseInt(video.id, 10) % THUMBNAIL_GRADIENTS.length];

  return (
    <div
      onClick={() => onClick(video)}
      className={cn(
        "group cursor-pointer rounded-xl overflow-hidden lg:min-w-50 min-w-35 ",
        "bg-white/30 border border-white/40",
        "hover:scale-[1.02] hover:shadow-lg",
        "transition-all duration-200",
      )}
    >
      <div className={cn("relative aspect-video bg-linear-to-br", gradient)}>
        {video.thumbnailUrl && (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            className="absolute inset-0 object-cover w-full h-full"
          />
        )}

        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium truncate text-text-primary">
          {video.title}
        </p>
        <p className="mt-1 text-xs text-text-muted">{video.createdAt}</p>
      </div>
    </div>
  );
}
