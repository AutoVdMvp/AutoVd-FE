import { Font } from "@/shared/fonts";

export function LoginHeader() {
  return (
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
          className={`${Font.kavoon.className} text-2xl text-text-primary tracking-wide`}
        >
          AutoVD
        </span>
      </div>
      <p className="text-sm leading-relaxed text-center text-text-secondary">
        영상을 더 스마트하게 관리하세요
      </p>
    </div>
  );
}
