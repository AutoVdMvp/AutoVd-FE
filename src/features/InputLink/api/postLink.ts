import { httpPost } from "@/shared/api";
import { ENDPOINTS } from "@/shared/config";

export interface CreateProjectRequest {
  article_url: string;
}

export const createProject = (body: CreateProjectRequest): Promise<void> =>
  httpPost<CreateProjectRequest, void>(ENDPOINTS.videos.create, body);
