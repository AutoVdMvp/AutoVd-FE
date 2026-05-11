"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
      {/* 추가 providers는 여기에 */}
    </QueryProvider>
  );
}
