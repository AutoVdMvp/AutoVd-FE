import { Icons } from "@/shared/icons";

export function TutorialStep3() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-peach-pastel/40">
        <Icons.Home className="w-10 h-10 text-peach-deep" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm leading-relaxed text-text-primary/80">
          생성이 완료되면 영상 목록에서 결과를 확인하고
          <br />
          다운로드할 수 있습니다.
        </p>
        <p className="text-xs text-text-muted">
          생성된 영상은 언제든지 다시 볼 수 있어요.
        </p>
      </div>
    </div>
  );
}
