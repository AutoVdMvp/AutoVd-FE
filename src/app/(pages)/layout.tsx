import { ReactNode } from "react";
import { Sidebar, MobileDrawer } from "@/widgets/sidebar";
import { MobileHeader } from "@/widgets/mobile-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-col md:flex-row h-full overflow-hidden">
      <MobileHeader />
      <Sidebar />
      <MobileDrawer />
      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
}
