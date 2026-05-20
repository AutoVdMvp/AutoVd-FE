export function VideoCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/30 border border-white/40 animate-pulse">
      <div className="aspect-video bg-warm-200/60" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 bg-warm-200/60 rounded w-3/4" />
        <div className="h-3 bg-warm-200/40 rounded w-1/3" />
      </div>
    </div>
  );
}
