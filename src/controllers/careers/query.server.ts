import { QueryDef } from "../common";
import { ProfileDetailResponse, ProfileListResponse } from "./types";
import { careersQueryKeys } from "./keys";
import { loadProfileDetail, loadProfileList } from "./load";

export const careersQueriesServer = {
  profileList: (): QueryDef<
    ProfileListResponse | null,
    readonly ["careers", "profile-list"]
  > => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => loadProfileList(),
  }),
  profileDetail: (
    email: string,
  ): QueryDef<
    ProfileDetailResponse | null,
    readonly ["careers", "profile-detail", string]
  > => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => loadProfileDetail(email),
  }),
};
