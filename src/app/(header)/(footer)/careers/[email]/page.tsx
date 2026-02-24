import CareersDetailPageServer from "./page-server";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { loadProfileExistsByEmail } from "@controllers/careers/load";
import { notFound } from "next/navigation";

const CareersDetailPage = async ({
  params,
}: {
  params: Promise<{ email: string }>;
}) => {
  const { email } = await params;

  const qc = getQueryClient();
  prefetchAppQuery(qc, careersQueriesServer.profileDetail(email));

  const exists = await loadProfileExistsByEmail(email);
  if (!exists) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CareersDetailPageServer email={email} />
    </HydrationBoundary>
  );
};

export default CareersDetailPage;
