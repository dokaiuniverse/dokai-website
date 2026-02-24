import { getQueryClient } from "@lib/react-query/getQueryClient";
import CareersPageClient from "./client";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";

const CareersPage = async () => {
  const qc = getQueryClient();
  prefetchAppQuery(qc, careersQueriesServer.profileList());

  return (
    <div
      style={{
        minHeight: "100dvh",
      }}
    >
      <CareersPageClient />
    </div>
  );
};

export default CareersPage;
