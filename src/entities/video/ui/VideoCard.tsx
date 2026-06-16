"use client";

import { cn } from "@/shared/lib/utils";
import type { Video } from "../model/types";

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const THUMBNAIL_GRADIENTS = [
  "from-peach-pastel to-rose-pastel",
  "from-lavender-pastel to-sky-pastel",
  "from-mint-pastel to-lavender-pastel",
  "from-sky-pastel to-mint-pastel",
  "from-rose-pastel to-peach-pastel",
  "from-warm-200 to-peach-pastel",
];

const STATUS_STYLES: Record<string, string> = {
  queued: "bg-yellow-500/80",
  processing: "bg-blue-500/80",
  done: "bg-green-500/80",
};

function getGradientIndex(id: string): number {
  return (
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    THUMBNAIL_GRADIENTS.length
  );
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const gradient = THUMBNAIL_GRADIENTS[getGradientIndex(video.id)];
  const statusStyle = STATUS_STYLES[video.status] ?? "bg-black/60";

  return (
    <button
      type="button"
      onClick={() => onClick(video)}
      className={cn(
        "group cursor-pointer w-full text-left rounded-xl overflow-hidden lg:min-w-50 min-w-35",
        "bg-white/30 border border-white/40",
        "hover:scale-[1.02] hover:shadow-lg",
        "transition-all duration-200",
      )}
    >
      <div className={cn("relative aspect-video bg-linear-to-br", gradient)}>
        <div
          className={cn(
            "absolute bottom-2 right-2 text-white text-xs px-1.5 py-0.5 rounded",
            statusStyle,
          )}
        >
          {video.status}
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium truncate text-text-primary">
          {video.original_url}
        </p>
        <p className="mt-1 text-xs text-text-muted">{video.created_at}</p>
      </div>
    </button>
  );
}
