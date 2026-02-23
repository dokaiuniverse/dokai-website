import CareersPageClient from "./client";
import { getSessionStatusServer } from "@controllers/auth/session.server";

const CareersPage = async () => {
  const session = await getSessionStatusServer();

  return <CareersPageClient session={session} />;
};

export default CareersPage;
