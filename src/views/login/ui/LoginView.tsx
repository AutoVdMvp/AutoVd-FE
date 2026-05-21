import { LoginFooter } from "./LoginFooter";
import { LoginHeader } from "./LoginHeader";
import { LoginSocialButtons } from "./LoginSocialButtons";

export function LoginView() {
  return (
    <div className="w-full min-w-70 lg:max-w-112.5 md:max-w-90 max-w-70">
      <div className="flex flex-col gap-6 p-5 border md:p-8 glaze-bg border-warm-200 rounded-2xl shrink-0">
        <LoginHeader />
        <div className="border-t border-warm-200" />
        <LoginSocialButtons />
        <LoginFooter />
      </div>
    </div>
  );
}
