"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useTutorialStore } from "@/shared/model/tutorialStore";
import type { TutorialStepMeta } from "../model/types";
import { TutorialProgressBar } from "./TutorialProgressBar";
import { TutorialStep1 } from "./steps/TutorialStep1";
import { TutorialStep2 } from "./steps/TutorialStep2";
import { TutorialStep3 } from "./steps/TutorialStep3";

const TUTORIAL_STEPS: TutorialStepMeta[] = [
  { id: "intro", title: "AutoVD 소개", component: TutorialStep1 },
  { id: "input", title: "링크 입력하기", component: TutorialStep2 },
  { id: "result", title: "영상 확인하기", component: TutorialStep3 },
];

export function TutorialFunnel() {
  const { closeTutorial } = useTutorialStore();
  const [currentStep, setCurrentStep] = useState(0);

  const isFirst = currentStep === 0;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  const { title, component: StepComponent } = TUTORIAL_STEPS[currentStep];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-3 pr-8">
        <TutorialProgressBar
          current={currentStep}
          total={TUTORIAL_STEPS.length}
        />
        <div>
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <span className="text-xs text-text-muted">
            {currentStep + 1} / {TUTORIAL_STEPS.length}
          </span>
        </div>
      </div>

      <div className="min-h-[200px]">
        <StepComponent />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep((s) => s - 1)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            "text-text-primary hover:bg-peach-pastel/25",
            isFirst && "invisible",
          )}
        >
          이전
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={closeTutorial}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-peach-deep/80 text-white hover:bg-peach-deep transition-colors"
          >
            시작하기
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s + 1)}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-peach-deep/80 text-white hover:bg-peach-deep transition-colors"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
