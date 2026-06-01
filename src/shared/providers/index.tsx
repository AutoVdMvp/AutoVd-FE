"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/shared/ui";

interface ProvidersProps {
  children: ReactNode;
}

// 앱 전역 Provider 조합. 새 Provider는 여기에 추가한다.
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors position="top-right" />
    </QueryProvider>
  );
}
