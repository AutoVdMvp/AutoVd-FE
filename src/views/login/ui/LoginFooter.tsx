export function LoginFooter() {
  return (
    <p className="text-xs leading-relaxed text-center text-text-muted">
      로그인 시{" "}
      <span className="underline transition-colors cursor-pointer underline-offset-2 hover:text-text-secondary">
        서비스 이용약관
      </span>{" "}
      및{" "}
      <span className="underline transition-colors cursor-pointer underline-offset-2 hover:text-text-secondary">
        개인정보 처리방침
      </span>
      에 동의하게 됩니다.
    </p>
  );
}
