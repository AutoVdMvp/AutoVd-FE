import { httpGet } from "@/shared/api";
import type { User } from "../model/types";

// 유저 엔티티 TanStack Query 키/함수 팩토리.
// 로그인/로그아웃 등 인증 액션은 features/auth/ 참조.
export const userQueries = {
  all: () => ["user"] as const,

  me: () => ({
    queryKey: [...userQueries.all(), "me"] as const,
    queryFn: () => httpGet<User>("/api/auth/me"),
  }),
};
