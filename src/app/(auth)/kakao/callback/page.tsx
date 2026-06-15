import { Suspense } from "react";
import { KakaoCallbackView } from "@/views/kakao-callback";

export default function Page() {
  return (
    <Suspense>
      <KakaoCallbackView />
    </Suspense>
  );
}
