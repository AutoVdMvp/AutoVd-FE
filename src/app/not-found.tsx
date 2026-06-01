import Link from "next/link";

// 매칭되는 라우트가 없을 때 Next.js가 자동으로 렌더하는 전역 404 페이지.
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-8xl font-bold text-peach-deep/30 select-none">404</p>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-text-primary">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-sm text-text-muted max-w-xs">
          주소가 잘못됐거나 삭제된 페이지입니다.
        </p>
      </div>

      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-peach-deep text-white hover:bg-peach-deep/80 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
