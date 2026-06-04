import { httpGet } from "@/shared/api";
import { ENDPOINTS } from "@/shared/config";
import type { Video } from "../model/types";

// 비디오 관련 TanStack Query 키/함수 팩토리.
// useSuspenseQuery(videoQueries.list()) 형태로 사용한다.
export const videoQueries = {
  all: () => ["videos"] as const,

  list: () => ({
    queryKey: [...videoQueries.all(), "list"] as const,
    queryFn: () => httpGet<Video[]>(ENDPOINTS.videos.list),
  }),

  detail: (id: string) => ({
    queryKey: [...videoQueries.all(), id] as const,
    queryFn: () => httpGet<Video>(`/api/videos/${id}`),
  }),
};
