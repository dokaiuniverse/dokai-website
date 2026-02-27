import { getQueryClient } from "@lib/react-query/getQueryClient";
import CareersPageClient from "./page-client";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CareersPage = async () => {
  const qc = getQueryClient();
  await prefetchAppQuery(qc, careersQueriesServer.profileList());

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CareersPageClient />
    </HydrationBoundary>
  );
};

export default CareersPage;
