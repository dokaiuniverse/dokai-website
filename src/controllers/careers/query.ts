import { useQuery } from "@tanstack/react-query";
import {
  fetchHasProfile,
  fetchProfileDetail,
  fetchProfileList,
  fetchProjectDetail,
} from "./fetch";
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

export const useHasProfileQuery = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["has-profile"],
    queryFn: () => fetchHasProfile(),
    ...queryOptions,
    enabled,
  });
};

export const useProjectDetailQuery = (projectId?: string | null) => {
  return useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: () => fetchProjectDetail(projectId!),
    ...queryOptions,
    enabled: !!projectId,
  });
};
