import axios from "axios";
import { normalizeError } from "./error";

export const httpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

httpInstance.interceptors.request.use(
  (config) => {
    // 인증 토큰 주입 포인트 — 추후 토큰 스토어 연결
    // const token = getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(normalizeError(error)),
);

httpInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
);
