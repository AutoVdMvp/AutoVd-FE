// 백엔드 API 엔드포인트 상수. 명세 변경 시 여기만 수정한다.
export const ENDPOINTS = {
  auth: {
    refresh: "/api/v1/auth/refresh",
    google: "/api/v1/auth/google",
    kakao: {
      login: "/api/v1/auth/kakao/login",
      callback: "/api/v1/auth/kakao/callback",
    },
  },
  users: {
    me: "/api/v1/users/me",
  },
  videos: {
    list: "/api/v1/projects",
    detail: (id: string) => `/api/v1/projects/${id}`,
    create: "/api/v1/projects/create",
  },
} as const;
