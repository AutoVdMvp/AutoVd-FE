import {
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export function useQuery<TData = unknown, TError = Error>(
  options: UseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  return useReactQuery(options);
}
