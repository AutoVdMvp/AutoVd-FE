interface TutorialProgressBarProps {
  current: number;
  total: number;
}

export function TutorialProgressBar({
  current,
  total,
}: TutorialProgressBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-peach-deep" : "w-2 bg-peach-pastel/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
