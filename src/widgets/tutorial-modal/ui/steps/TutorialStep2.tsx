import { Icons } from "@/shared/icons";

export function TutorialStep2() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-peach-pastel/40">
        <Icons.Enter className="w-10 h-10 text-peach-deep" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm leading-relaxed text-text-primary/80">
          홈 화면의 입력창에 뉴스 기사 URL을 붙여넣고
          <br />
          Enter를 누르면 영상 생성이 시작됩니다.
        </p>
        <p className="text-xs text-text-muted">
          지원 형식: 뉴스 기사, 블로그 포스트
        </p>
      </div>
    </div>
  );
}
