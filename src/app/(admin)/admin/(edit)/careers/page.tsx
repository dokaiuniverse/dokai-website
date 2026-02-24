import AdminCareersPageServer from "./page-server";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { loadProfileExistsByEmail } from "@controllers/careers/load";
import notFound from "@app/not-found";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const AdminCareersPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const sp = await searchParams;
  const email = sp.email as string;

  const qc = getQueryClient();
  prefetchAppQuery(qc, careersQueriesServer.profileDetail(email));

  const existsOrNew = email ? await loadProfileExistsByEmail(email) : true;
  if (!existsOrNew) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <AdminCareersPageServer email={email} />
    </HydrationBoundary>
  );
};

export default AdminCareersPage;
