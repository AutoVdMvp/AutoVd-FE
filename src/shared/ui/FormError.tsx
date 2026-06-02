// 폼 필드 하단에 표시하는 인라인 에러 메시지.
export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="px-2 py-1 text-xs text-rose-deep">
      {message}
    </p>
  );
}
