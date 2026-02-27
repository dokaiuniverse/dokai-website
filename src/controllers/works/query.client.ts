import { QueryDef } from "../common";
import { fetchWorkCheckSlug, fetchWorkDetail } from "./fetch";
import { worksQueryKeys } from "./keys";
import { WorkDetailResponse } from "./types";

export const worksQueriesClient = {
  workDetail: (
    slug: string,
  ): QueryDef<
    WorkDetailResponse,
    readonly ["works", "work-detail", string]
  > => ({
    queryKey: worksQueryKeys.workDetail(slug),
    queryFn: () => fetchWorkDetail(slug),
  }),
  checkSlug: (
    slug: string,
  ): QueryDef<
    { exists: boolean },
    readonly ["works", "check-slug", string]
  > => ({
    queryKey: worksQueryKeys.checkSlug(slug),
    queryFn: () => fetchWorkCheckSlug(slug),
  }),
};
