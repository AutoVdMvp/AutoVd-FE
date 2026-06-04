// 앱 전역 환경변수. 미정의 시 빈 문자열로 폴백하며 instance.ts에서 감지됨.
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
  isDev: process.env.NODE_ENV === "development",
} as const;
