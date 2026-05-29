import axios from "axios";
import type { AxiosResponse } from "axios";
import { normalizeError } from "./error";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "@/shared/model/authStore";

// ─── Axios 타입 확장 ──────────────────────────────────────────────────────────
// _retry: 재시도 요청임을 표시하는 커스텀 플래그 (무한루프 방지용)
// any 없이 타입 안전하게 config에 추가하기 위한 모듈 augmentation
declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// ─── 리프레시 응답 타입 ───────────────────────────────────────────────────────
// 백엔드 POST /api/auth/refresh 응답 바디 스키마
// 필드명이 다르면 여기만 수정
interface RefreshResponse {
  accessToken: string;
}

// ─── 리프레시 전용 axios 인스턴스 ─────────────────────────────────────────────
// httpInstance와 분리하여 인터셉터를 타지 않도록 함
// → 리프레시 요청 자체가 401이 나도 재귀 호출 발생 방지
const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  withCredentials: true, // RT HttpOnly 쿠키 자동 포함
  headers: { "Content-Type": "application/json" },
});

// ─── 메인 http 인스턴스 ───────────────────────────────────────────────────────
export const httpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // RT HttpOnly 쿠키 자동 포함
});

// ─── 동시 401 처리를 위한 대기열 ─────────────────────────────────────────────
// 리프레시 진행 중에 들어오는 추가 401 요청들을 대기열에 쌓고
// 리프레시 완료 후 일괄 재시도 또는 일괄 reject
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
const failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach((item) => {
    if (error !== null) {
      item.reject(error);
    } else if (token !== null) {
      item.resolve(token);
    }
  });
  failedQueue.length = 0;
}

// ─── 쿠키 동기화 헬퍼 ────────────────────────────────────────────────────────
// 미들웨어(Edge Runtime)는 Zustand에 접근 불가 → access_token 쿠키로 인증 확인
// 백엔드가 Set-Cookie 헤더로 직접 쿠키를 설정한다면 아래 두 함수는 생략 가능
function syncAccessTokenCookie(token: string): void {
  document.cookie = `access_token=${token}; path=/; SameSite=Lax`;
}

function clearAccessTokenCookie(): void {
  document.cookie = "access_token=; path=/; max-age=0";
}

// ─── Request 인터셉터 ─────────────────────────────────────────────────────────
httpInstance.interceptors.request.use(
  (config) => {
    // Zustand 메모리 스토어에서 AT를 동기적으로 꺼내 Authorization 헤더에 주입
    const token = getAccessToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(normalizeError(error)),
);

// ─── Response 인터셉터 ────────────────────────────────────────────────────────
httpInstance.interceptors.response.use(
  // 정상 응답은 그대로 통과
  (response) => response,

  async (error: unknown) => {
    // AxiosError가 아닌 경우 즉시 정규화하여 reject
    if (!axios.isAxiosError(error)) {
      return Promise.reject(normalizeError(error));
    }

    const originalRequest = error.config;

    // 401이 아니거나 / config가 없거나 / 이미 재시도한 요청이면 즉시 reject
    // (재시도 요청이 또 401이면 무한루프 방지를 위해 바로 실패 처리)
    if (
      error.response?.status !== 401 ||
      originalRequest === undefined ||
      originalRequest._retry === true
    ) {
      return Promise.reject(normalizeError(error));
    }

    // ── 리프레시 진행 중인 경우: 대기열에 추가 ────────────────────────────────
    // 완료 시 새 토큰으로 헤더를 교체하여 재시도, 실패 시 reject
    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({
          resolve: (newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(httpInstance(originalRequest));
          },
          reject,
        });
      });
    }

    // ── 리프레시 시작 ─────────────────────────────────────────────────────────
    originalRequest._retry = true; // 재시도 플래그 설정
    isRefreshing = true;

    try {
      // Step 1: 인터셉터 없는 authAxios로 RT 기반 AT 재발급 요청
      //         RT는 HttpOnly 쿠키이므로 withCredentials 설정으로 자동 포함됨
      const { data } =
        await authAxios.post<RefreshResponse>("/api/auth/refresh");
      const newToken = data.accessToken;

      // Step 2: Zustand 메모리 스토어 업데이트
      setAccessToken(newToken);

      // Step 3: 미들웨어 route protection을 위해 쿠키도 동기화
      syncAccessTokenCookie(newToken);

      // Step 4: 대기 중이던 요청들 일괄 재시도
      processQueue(null, newToken);

      // Step 5: 원래 실패했던 요청을 새 토큰으로 재시도
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return httpInstance(originalRequest);
    } catch (refreshError) {
      // 리프레시 실패 → 대기열 전체 reject
      processQueue(refreshError, null);

      // Zustand 스토어 초기화
      clearAccessToken();

      // 쿠키 제거 (미들웨어가 다음 네비게이션 시 /login으로 redirect)
      clearAccessTokenCookie();

      // 로그인 페이지로 강제 이동
      // useRouter는 React hook이라 인터셉터에서 호출 불가 → window.location 사용
      window.location.href = "/login";

      return Promise.reject(normalizeError(refreshError));
    } finally {
      // 성공/실패 무관하게 리프레시 플래그 초기화
      isRefreshing = false;
    }
  },
);
