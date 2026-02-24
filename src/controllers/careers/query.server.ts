import { QueryDef } from "../common";
import { ProfileDetailResponse, ProfileListResponse } from "./types";
import { careersQueryKeys } from "./queryKeys";
import { loadProfileDetail, loadProfileList } from "./load";

export const careersQueriesServer = {
  profileList: (): QueryDef<
    ProfileListResponse | null,
    readonly ["profile-list"]
  > => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => loadProfileList(),
  }),
  profileDetail: (
    email: string,
  ): QueryDef<
    ProfileDetailResponse | null,
    readonly ["profile-detail", string]
  > => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => loadProfileDetail(email),
  }),
};
