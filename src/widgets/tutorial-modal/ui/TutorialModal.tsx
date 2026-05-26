"use client";

import { useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Icons } from "@/shared/icons";
import { useTutorialStore } from "@/shared/model/tutorialStore";
import { TutorialFunnel } from "./TutorialFunnel";

export function TutorialModal() {
  const { isOpen, closeTutorial } = useTutorialStore();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTutorial();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeTutorial]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeTutorial}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl overflow-hidden",
          "glaze-bg",
        )}
      >
        <button
          type="button"
          onClick={closeTutorial}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-peach-pastel/25 transition-colors"
          aria-label="튜토리얼 닫기"
        >
          <Icons.Close className="icon" />
        </button>
        <TutorialFunnel />
      </div>
    </div>
  );
}
