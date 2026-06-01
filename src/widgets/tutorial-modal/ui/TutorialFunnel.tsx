"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useTutorialStore } from "@/shared/model/tutorialStore";
import { Button } from "@/shared/ui";
import { TUTORIAL_STEPS } from "../model/steps-data";
import { TutorialProgressBar } from "./TutorialProgressBar";
import { TutorialStep } from "./steps/TutorialStep";

// 튜토리얼 단계를 순서대로 보여주는 퍼널. 이전/다음/시작하기 버튼으로 진행한다.
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
        <Button
          onClick={() => setCurrentStep((s) => s - 1)}
          className={cn(
            "bg-peach-deep/80 hover:bg-peach-deep",
            isFirst && "invisible",
          )}
        >
          이전
        </Button>

        {isLast ? (
          <Button
            onClick={closeTutorial}
            className="bg-peach-deep/80 hover:bg-peach-deep"
          >
            시작하기
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="bg-peach-deep/80 hover:bg-peach-deep"
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
}
