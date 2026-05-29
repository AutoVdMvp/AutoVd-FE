import { create } from "zustand";

// ─── 상태 인터페이스 ───────────────────────────────────────────────────────────
// accessToken: 메모리(Zustand)에만 보관 — XSS 공격으로 탈취 불가
// RT(Refresh Token)는 HttpOnly 쿠키로만 존재하여 JS 접근 불가
interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

// ─── Zustand Store ────────────────────────────────────────────────────────────
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));

// ─── 인터셉터용 동기 헬퍼 ─────────────────────────────────────────────────────
// React 컴포넌트 외부(axios 인터셉터 등)에서 store에 직접 접근할 때 사용
// useAuthStore.getState()는 Zustand 5.x에서 React 없이 동기적으로 호출 가능
export const getAccessToken = (): string | null =>
  useAuthStore.getState().accessToken;

export const setAccessToken = (token: string): void =>
  useAuthStore.getState().setAccessToken(token);

export const clearAccessToken = (): void =>
  useAuthStore.getState().clearAccessToken();
