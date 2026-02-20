import { useQuery } from "@tanstack/react-query";
import { fetchProfileDetail, fetchProfileList } from "./fetch";
import { queryOptions } from "..";

export const useProfileListQuery = () => {
  return useQuery({
    queryKey: ["profile-list"],
    queryFn: () => fetchProfileList(),
    ...queryOptions,
  });
};

export const useProfileDetailQuery = (email: string) => {
  return useQuery({
    queryKey: ["profile-detail", email],
    queryFn: () => fetchProfileDetail(email),
    ...queryOptions,
  });
};
