"use client";

import { useGoogleLogin as useGoogleOAuth } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/shared/model/authStore";
import { useMutation } from "@/shared/hooks";
import { authMutations } from "../api/mutations";

export function useGoogleLogin() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    ...authMutations.googleLogin(),
    onSuccess: ({ access_token, refresh_token }) => {
      setAccessToken(access_token);
      document.cookie = `access_token=${access_token}; path=/; SameSite=Lax`;
      document.cookie = `refresh_token=${refresh_token}; path=/; SameSite=Lax`;
      router.push("/");
    },
  });

  const login = useGoogleOAuth({
    onSuccess: ({ access_token }) => mutate({ credential: access_token }),
    flow: "implicit",
  });

  return { login, isPending };
}
