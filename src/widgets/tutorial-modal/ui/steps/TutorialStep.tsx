import type { TutorialStepData } from "../../model/types";

type TutorialStepProps = Omit<TutorialStepData, "id" | "title">;

export function TutorialStep({ Icon, description, hint }: TutorialStepProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-peach-pastel/40">
        <Icon className="w-10 h-10 text-peach-deep" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm leading-relaxed text-text-primary/80">
          {description[0]}
          <br />
          {description[1]}
        </p>
        <p className="text-xs text-text-muted">{hint}</p>
      </div>
    </div>
  );
}
