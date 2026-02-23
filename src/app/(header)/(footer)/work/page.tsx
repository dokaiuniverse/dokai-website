import { fetchWorkList, WorkListResponse } from "@controllers/work/fetch";
import WorkPageClient from "./client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { WorkCategory } from "@domain/work";
import { headers } from "next/headers";

const INITIAL = {
  mode: "category" as const,
  pageSize: 12,
  category: "EVERYTHING" as WorkCategory | "EVERYTHING",
  q: [] as string[],
};

const WorkPage = async () => {
  const qc = getQueryClient();
  const cookie = (await headers()).get("cookie") ?? "";

  await qc.prefetchInfiniteQuery({
    queryKey: ["works", INITIAL],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchWorkList(
        {
          mode: INITIAL.mode,
          page: pageParam as number,
          pageSize: INITIAL.pageSize,
          category: INITIAL.category,
          q: INITIAL.q,
        },
        { cookie },
      ),
    getNextPageParam: (lastPage: WorkListResponse) => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.page + 1;
    },
    staleTime: 5_000,
    retry: 2,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <WorkPageClient />
    </HydrationBoundary>
  );
};

export default WorkPage;
