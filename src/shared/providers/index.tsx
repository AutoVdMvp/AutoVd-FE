"use client";

import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/shared/ui";
import { env } from "@/shared/config";

interface ProvidersProps {
  children: ReactNode;
}

// 앱 전역 Provider 조합. 새 Provider는 여기에 추가한다.
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
      <Toaster richColors position="top-right" />
    </QueryProvider>
  );
}
