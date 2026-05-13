import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@shared/providers";

export const metadata: Metadata = {
  title: "AutoVD",
  description: "Auto Vision Design Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="h-screen overflow-hidden ">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
