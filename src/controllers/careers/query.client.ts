import { QueryDef } from "../common";
import { fetchHasProfile, fetchProfileDetail, fetchProfileList } from "./fetch";
import { careersQueryKeys } from "./queryKeys";
import { ProfileDetailResponse, ProfileListResponse } from "./types";

export const careersQueriesClient = {
  profileList: (): QueryDef<
    ProfileListResponse,
    readonly ["profile-list"]
  > => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => fetchProfileList(),
  }),
  profileDetail: (
    email: string,
  ): QueryDef<ProfileDetailResponse, readonly ["profile-detail", string]> => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => fetchProfileDetail(email),
  }),
  hasProfile: (): QueryDef<
    { hasProfile: boolean },
    readonly ["has-profile"]
  > => ({
    queryKey: careersQueryKeys.hasProfile(),
    queryFn: () => fetchHasProfile(),
  }),
};
