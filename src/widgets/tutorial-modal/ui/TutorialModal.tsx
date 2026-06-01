"use client";

import { Icons } from "@/shared/icons";
import { useTutorialStore } from "@/shared/model/tutorialStore";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui";
import { TutorialFunnel } from "./TutorialFunnel";

// 첫 방문 사용자를 위한 튜토리얼 모달. 3단계 퍼널로 구성된다.
export function TutorialModal() {
  const { isOpen, closeTutorial } = useTutorialStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeTutorial()}>
      <DialogContent
        className="p-0 max-w-lg bg-warm-100 rounded-2xl overflow-hidden ring-0 gap-0"
        overlayClassName="bg-black/20 backdrop-blur-sm"
        showCloseButton={false}
        aria-label="튜토리얼"
      >
        <DialogTitle className="sr-only">튜토리얼</DialogTitle>
        <button
          type="button"
          onClick={closeTutorial}
          className="absolute p-1 transition-colors rounded-lg cursor-pointer top-3 right-3 hover:bg-white/25"
          aria-label="튜토리얼 닫기"
        >
          <Icons.Close className="text-peach-deep icon" />
        </button>
        <TutorialFunnel />
      </DialogContent>
    </Dialog>
  );
}
