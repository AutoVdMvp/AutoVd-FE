"use client";

import { env } from "@/shared/config";

async function triggerRefresh() {
  const res = await fetch(`${env.API_URL}/api/v1/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data: unknown = await res.json();
  console.log("[refresh test] 상태:", res.status);
  console.log("[refresh test] 응답:", data);
}

export function RefreshTestButton() {
  return (
    <button
      onClick={triggerRefresh}
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        padding: "8px 16px",
        background: "#f00",
        color: "#fff",
        borderRadius: 4,
      }}
    >
      refresh 테스트
    </button>
  );
}
