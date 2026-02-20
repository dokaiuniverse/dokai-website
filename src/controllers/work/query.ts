import { useQuery } from "@tanstack/react-query";
import { fetchWorkList } from "./fetch";
import { queryOptions } from "..";

export const useWorkListQuery = (page = 1, pageSize = 12) => {
  return useQuery({
    queryKey: ["work-list", page, pageSize],
    queryFn: () => fetchWorkList(page, pageSize),
    ...queryOptions,
  });
};
