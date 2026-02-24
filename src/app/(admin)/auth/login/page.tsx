import LoginPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { authQueriesServer } from "@controllers/auth/query.server";

const LoginPage = async () => {
  const qc = getQueryClient();
  await prefetchAppQuery(qc, authQueriesServer.sessionStatus());

  return <LoginPageClient />;
};

export default LoginPage;
