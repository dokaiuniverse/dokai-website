import { getQueryClient } from "@lib/react-query/getQueryClient";
import CareersPageClient from "./client";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CareersPage = async () => {
  const qc = getQueryClient();
  prefetchAppQuery(qc, careersQueriesServer.profileList());

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div
        style={{
          minHeight: "100dvh",
        }}
      >
        <CareersPageClient />
      </div>
    </HydrationBoundary>
  );
};

export default CareersPage;
