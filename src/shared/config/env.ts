// 앱 전역 환경변수. 미정의 시 빈 문자열로 폴백하며 instance.ts에서 감지됨.
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  isDev: process.env.NODE_ENV === "development",
} as const;
