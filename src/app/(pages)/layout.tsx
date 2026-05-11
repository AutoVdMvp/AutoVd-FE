import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-dvh min-w-[1280px] max-w-[1920px]">
      {children}
    </div>
  );
}
