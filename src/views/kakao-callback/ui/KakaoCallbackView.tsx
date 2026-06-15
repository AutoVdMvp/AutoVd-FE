"use client";

import { useKakaoCallback } from "@/features/auth/model/useKakaoCallback";
import { useSearchParams } from "next/navigation";

export function KakaoCallbackView() {
  const code = useSearchParams().get("code");
  const { isError } = useKakaoCallback(code);

  if (isError) return <p>로그인 중 오류가 발생했습니다.</p>;
  return <p>카카오 로그인 중...</p>;
}
