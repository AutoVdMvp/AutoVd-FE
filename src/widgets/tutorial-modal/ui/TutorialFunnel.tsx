"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useTutorialStore } from "@/shared/model/tutorialStore";
import { TUTORIAL_STEPS } from "../model/steps-data";
import { TutorialProgressBar } from "./TutorialProgressBar";
import { TutorialStep } from "./steps/TutorialStep";

export function TutorialFunnel() {
  const { closeTutorial } = useTutorialStore();
  const [currentStep, setCurrentStep] = useState(0);

  const isFirst = currentStep === 0;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  const { title, ...stepProps } = TUTORIAL_STEPS[currentStep];

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

      <div className="min-h-50">
        <TutorialStep {...stepProps} />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep((s) => s - 1)}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
            "text-white bg-peach-deep/80 hover:bg-peach-deep",
            isFirst && "invisible",
          )}
        >
          이전
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={closeTutorial}
            className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-lg cursor-pointer bg-peach-deep/80 hover:bg-peach-deep"
          >
            시작하기
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s + 1)}
            className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-lg cursor-pointer bg-peach-deep/80 hover:bg-peach-deep"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}
