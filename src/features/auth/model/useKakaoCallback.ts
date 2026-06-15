"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@/shared/hooks";
import { setAccessToken } from "@/shared/model/authStore";
import { kakaoCallbackQuery } from "../api/kakaoCallbackQuery";

export function useKakaoCallback(code: string | null) {
  const router = useRouter();

  const query = useQuery({
    ...kakaoCallbackQuery(code ?? ""),
    enabled: !!code,
  });

  useEffect(() => {
    if (!query.data) return;
    const { access_token } = query.data;
    setAccessToken(access_token);
    document.cookie = `access_token=${access_token}; path=/; SameSite=Lax`;
    router.replace("/");
  }, [query.data, router]);

  return query;
}
