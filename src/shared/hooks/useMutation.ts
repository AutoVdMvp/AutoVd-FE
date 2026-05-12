import {
  useMutation as useReactMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export function useMutation<TData = unknown, TError = Error, TVariables = void>(
  options: UseMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> {
  return useReactMutation(options);
}
