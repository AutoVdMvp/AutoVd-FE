import { ReactNode } from "react";
import { Sidebar } from "@/widgets/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex h-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
}
