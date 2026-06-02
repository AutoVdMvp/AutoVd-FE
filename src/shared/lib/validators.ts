import { z } from "zod";

// 기사 링크 등 URL 입력 필드에 사용하는 공통 zod 스키마.
// zod v4에서 .url() 체이닝이 deprecated → refine으로 native URL 검증 사용.
export const urlSchema = z
  .string()
  .min(1, "링크를 입력해주세요")
  .refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "올바른 URL 형식을 입력해주세요");
