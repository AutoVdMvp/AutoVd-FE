"use client";

import { Font } from "@/shared/fonts";
import { GoogleLoginButton, KakaoLoginButton } from "@/features/auth";

export function LoginView() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="glaze-bg border border-[var(--color-warm-200)] rounded-2xl p-8 flex flex-col gap-6">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="var(--color-peach-deep)"
                d="M9 7v8l7-4zm12-4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 14H3V5h18z"
              />
            </svg>
            <span
              className={`${Font.kavoon.className} text-2xl text-[var(--color-text-primary)] tracking-wide`}
            >
              AutoVD
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] text-center leading-relaxed">
            영상을 더 스마트하게 관리하세요
          </p>
        </div>

        {/* 구분선 */}
        <div className="border-t border-[var(--color-warm-200)]" />

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-3">
          <KakaoLoginButton />
          <GoogleLoginButton />
        </div>

        {/* 하단 안내 */}
        <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed">
          로그인 시{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-[var(--color-text-secondary)] transition-colors">
            서비스 이용약관
          </span>{" "}
          및{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-[var(--color-text-secondary)] transition-colors">
            개인정보 처리방침
          </span>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
