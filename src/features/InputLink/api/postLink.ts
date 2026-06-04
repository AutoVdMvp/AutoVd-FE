import { httpPost } from "@/shared/api";
import { ENDPOINTS } from "@/shared/config";

export interface PostLinkRequest {
  link: string;
}

// TODO: 백엔드 API 명세 확정 후 교체
export interface PostLinkResponse {
  jobId: string;
  status: "queued" | "processing" | "done";
}

export const postLink = (body: PostLinkRequest): Promise<PostLinkResponse> =>
  httpPost<PostLinkRequest, PostLinkResponse>(ENDPOINTS.link.post, body);
