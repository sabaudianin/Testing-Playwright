import { useQuery } from "react-query";

export function useUserQuery() {
  return useQuery("/user", { placeholderData: { user: {} } });
}
