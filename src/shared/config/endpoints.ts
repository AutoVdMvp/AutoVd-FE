// 백엔드 API 엔드포인트 상수. 명세 변경 시 여기만 수정한다.
export const ENDPOINTS = {
  auth: {
    refresh: "/api/auth/refresh",
    me: "/api/auth/me",
  },
  videos: {
    list: "/api/videos",
    detail: (id: string) => `/api/videos/${id}`,
  },
  link: {
    post: "/api/link",
  },
} as const;
