// 백엔드 API 엔드포인트 상수. 명세 변경 시 여기만 수정한다.
export const ENDPOINTS = {
  auth: {
    refresh: "/api/v1/auth/refresh",
    google: "/api/v1/auth/google",
  },
  users: {
    me: "/api/v1/users/me",
  },
  videos: {
    list: "/api/v1/videos",
    detail: (id: string) => `/api/v1/videos/${id}`,
  },
  link: {
    post: "/api/v1/link",
  },
} as const;
