import { GoogleLoginButton, KakaoLoginButton } from "@/features/auth";

export function LoginSocialButtons() {
  return (
    <div className="flex flex-col gap-3">
      <KakaoLoginButton />
      <GoogleLoginButton />
    </div>
  );
}
