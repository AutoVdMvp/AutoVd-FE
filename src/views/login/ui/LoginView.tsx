import { LoginFooter } from "./LoginFooter";
import { LoginHeader } from "./LoginHeader";
import { LoginSocialButtons } from "./LoginSocialButtons";

export function LoginView() {
  return (
    <div className="w-full max-w-112.5">
      <div className="flex flex-col gap-6 p-8 border glaze-bg border-warm-200 rounded-2xl">
        <LoginHeader />
        <div className="border-t border-warm-200" />
        <LoginSocialButtons />
        <LoginFooter />
      </div>
    </div>
  );
}
