import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인 없이 접근 가능한 공개 경로 목록
const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
  // Edge Runtime에서 Zustand(클라이언트 메모리)에 접근 불가
  // → 백엔드가 로그인/리프레시 시 설정한 access_token 쿠키로 인증 상태 확인
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // 비인증 사용자가 보호된 경로에 접근 → 로그인 페이지로 리다이렉트
  // if (!token && !isPublic) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // 이미 인증된 사용자가 로그인 페이지 접근 → 홈으로 리다이렉트
  // if (token && pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
