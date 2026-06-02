// TODO: 백엔드 /api/auth/me 응답 스키마 확정 후 필드 업데이트
export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}
