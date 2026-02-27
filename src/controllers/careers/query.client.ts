import { QueryDef } from "../common";
import {
  fetchHasProfile,
  fetchProfileDetail,
  fetchProfileList,
  fetchProjectDetail,
} from "./fetch";
import { careersQueryKeys } from "./keys";
import {
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
} from "./types";

export const careersQueriesClient = {
  profileList: (): QueryDef<
    ProfileListResponse,
    readonly ["careers", "profile-list"]
  > => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => fetchProfileList(),
  }),
  profileDetail: (
    email: string,
  ): QueryDef<
    ProfileDetailResponse,
    readonly ["careers", "profile-detail", string]
  > => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => fetchProfileDetail(email),
  }),
  hasProfile: (): QueryDef<
    { email: string; hasProfile: boolean },
    readonly ["careers", "has-profile"]
  > => ({
    queryKey: careersQueryKeys.hasProfile(),
    queryFn: () => fetchHasProfile(),
  }),
  projectDetail: (
    projectId: string,
  ): QueryDef<
    ProjectDetailResponse,
    readonly ["careers", "project-detail", string]
  > => ({
    queryKey: careersQueryKeys.projectDetail(projectId),
    queryFn: () => fetchProjectDetail(projectId),
  }),
};
