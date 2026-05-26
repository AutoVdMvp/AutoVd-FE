import { Icons } from "@/shared/icons";

export function TutorialStep1() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-peach-pastel/40">
        <Icons.Video className="w-10 h-10 text-peach-deep" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm leading-relaxed text-text-primary/80">
          AutoVD는 기사 링크를 입력하면
          <br />
          자동으로 영상을 생성해주는 서비스입니다.
        </p>
        <p className="text-xs text-text-muted">
          몇 가지 간단한 단계를 통해 시작해봐요.
        </p>
      </div>
    </div>
  );
}
