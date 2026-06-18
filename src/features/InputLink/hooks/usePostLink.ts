import { useMutation } from "@/shared/hooks";
import { ApiError } from "@/shared/api";
import { createProject, CreateProjectRequest } from "../api/postLink";

interface UsePostLinkOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const usePostLink = (options?: UsePostLinkOptions) =>
  useMutation<void, ApiError, CreateProjectRequest>({
    mutationFn: createProject,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
