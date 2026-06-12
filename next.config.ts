import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const cspDirectives = [
  "default-src 'self'",
  isProd
    ? "script-src 'self' 'unsafe-inline' https://accounts.google.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com",
  apiUrl
    ? `connect-src 'self' ${apiUrl} ${apiUrl.replace(/^https?/, "http")} ${apiUrl.replace(/^https?/, "https")} https://accounts.google.com`
    : "connect-src 'self' https://accounts.google.com",
  "frame-src 'self' https://accounts.google.com",
  "img-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline' https://accounts.google.com",
  "font-src 'self'",
  "frame-ancestors 'none'",
];

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
