"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../model/useGoogleLogin";

export function GoogleLoginButton() {
  const { mutate } = useGoogleLogin();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.offsetWidth);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <GoogleLogin
        onSuccess={({ credential }) => {
          if (credential) mutate({ credential });
        }}
        width={width}
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}
