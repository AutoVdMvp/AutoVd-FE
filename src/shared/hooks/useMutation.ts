import {
  useMutation as useReactMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiError } from "@/shared/api";

export function useMutation<
  TData = unknown,
  TError = ApiError,
  TVariables = void,
>(
  options: UseMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> {
  return useReactMutation(options);
}
