import { useQuery } from "@/shared/hooks";
import { userQueries } from "./queries";

export function useCurrentUser() {
  return useQuery(userQueries.me());
}
