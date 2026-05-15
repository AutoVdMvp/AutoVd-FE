import axios from "axios";

export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN";

interface ApiErrorInit {
  code: ApiErrorCode;
  message: string;
  status?: number;
  details?: unknown;
}

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly details?: unknown;

  // Api 명세 전이기 때문에 인자를 임시로 설정해놓음

  constructor({ code, message, status, details }: ApiErrorInit) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        return new ApiError({
          code: "TIMEOUT",
          message: "요청 시간이 초과되었습니다.",
        });
      }
      return new ApiError({
        code: "NETWORK_ERROR",
        message: "네트워크 연결을 확인해주세요.",
      });
    }

    const { status } = error.response;
    const message =
      (error.response.data as { message?: string })?.message ?? error.message;
    const details = error.response.data;

    if (status === 401)
      return new ApiError({ code: "UNAUTHORIZED", message, status });
    if (status === 403)
      return new ApiError({ code: "FORBIDDEN", message, status });
    if (status === 404)
      return new ApiError({ code: "NOT_FOUND", message, status });
    if (status === 422)
      return new ApiError({
        code: "VALIDATION_ERROR",
        message,
        status,
        details,
      });
    if (status >= 500)
      return new ApiError({ code: "SERVER_ERROR", message, status });

    return new ApiError({ code: "UNKNOWN", message, status });
  }

  if (error instanceof Error) {
    return new ApiError({ code: "UNKNOWN", message: error.message });
  }

  return new ApiError({
    code: "UNKNOWN",
    message: "알 수 없는 오류가 발생했습니다.",
  });
}
