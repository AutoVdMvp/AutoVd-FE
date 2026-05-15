import { useMutation } from "@/shared/hooks";
import { ApiError } from "@/shared/api";
import { postLink, PostLinkResponse } from "../api/postLink";

interface UsePostLinkOptions {
  onSuccess?: (data: PostLinkResponse) => void;
  onError?: (error: ApiError) => void;
}

/**
 * 실사용 예시
 * const { mutate, isPending, isError } = usePostLink({
  onSuccess: (data) => {
    // data.jobId, data.status 타입 자동완성
    toast("링크가 제출되었습니다");
  },
  onError: (error) => {
    switch (error.code) {
      case "UNAUTHORIZED":    return router.push("/login");
      case "VALIDATION_ERROR": return toast(error.message);
      case "NETWORK_ERROR":   return toast("네트워크를 확인해주세요");
      default:                return toast("오류가 발생했습니다");
    }
  },
});

// 제출 시
mutate({ link: inputValue });


두 레벨의 콜백 차이:


// 1. 훅 초기화 시 — 이 훅을 쓰는 모든 컴포넌트에 공통 적용
usePostLink({ onError: (e) => toast(e.message) });

// 2. mutate 호출 시 — 이 한 번의 호출에만 적용 (위 콜백 이후 추가 실행)
mutate({ link }, { onSuccess: () => router.push("/result") });

// 추가 설명 
// 훅 초기화 — "항상" 해야 할 것
usePostLink({
  onError: (error) => {
    console.error(error.code, error.message); // 모든 실패 로깅
    if (error.code === "UNAUTHORIZED") router.push("/login"); // 전역 인증 처리
  },
});

// mutate 호출 — "이 버튼을 눌렀을 때" 해야 할 것
mutate(
  { link },
  {
    onSuccess: (data) => router.push(`/result/${data.jobId}`), // 이 제출 후에만
    onError: () => toast("링크 제출에 실패했습니다"),          // 이 실패에만
  }
);
실제로 분리 기준은 이렇게 생각하면 돼:

훅 초기화	              mutate 호출
에러 로깅 /             모니터링	성공 후 페이지 이동
401 → 로그인 리다이렉트	  실패 toast 메시지
전역 에러 처리	         버튼별 다른 후처리
 */

export const usePostLink = (options?: UsePostLinkOptions) =>
  useMutation({
    mutationFn: postLink,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
