"use client";

interface KakaoLoginButtonProps {
  onClick?: () => void;
}

export function KakaoLoginButton({
  onClick = () => {},
}: KakaoLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-full h-12 rounded-xl bg-[#FEE500] text-[#3C1E1E] font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
    >
      <span className="absolute left-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C6.477 3 2 6.72 2 11.28c0 2.88 1.664 5.412 4.18 6.924l-1.065 3.96c-.094.346.292.625.594.422l4.762-3.152c.494.066.998.1 1.529.1 5.523 0 10-3.72 10-8.254C22 6.72 17.523 3 12 3z"
            fill="#3C1E1E"
          />
        </svg>
      </span>
      카카오로 계속하기
    </button>
  );
}
