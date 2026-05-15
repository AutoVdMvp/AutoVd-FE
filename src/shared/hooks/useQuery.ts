import {
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { ApiError } from "@/shared/api";

export function useQuery<TData = unknown, TError = ApiError>(
  options: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  return useReactQuery(options);
}
