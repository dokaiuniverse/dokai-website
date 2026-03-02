import { QueryDef } from "../common";
import { AboutDetailResponse } from "./types";
import { loadAboutDetail } from "./load";
import { aboutQueryKeys } from "./keys";

export const aboutQueriesServer = {
  aboutDetail: (): QueryDef<
    AboutDetailResponse | null,
    readonly ["about", "about-detail"]
  > => ({
    queryKey: aboutQueryKeys.aboutDetail(),
    queryFn: () => loadAboutDetail(),
  }),
};
