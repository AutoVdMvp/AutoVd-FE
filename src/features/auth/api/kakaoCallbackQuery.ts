import { httpGet } from "@/shared/api";
import { ENDPOINTS } from "@/shared/config";

export interface KakaoCallbackResponse {
  access_token: string;
}

export const kakaoCallbackQuery = (code: string) => ({
  queryKey: ["auth", "kakao", "callback", code] as const,
  queryFn: () =>
    httpGet<KakaoCallbackResponse>(ENDPOINTS.auth.kakao.callback, { code }),
  staleTime: Infinity,
  retry: false as const,
});
