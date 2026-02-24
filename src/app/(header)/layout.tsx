import { getQueryClient } from "@lib/react-query/getQueryClient";
import * as Styles from "./style.css";
import Header from "@components/layout/Header/Header";
import { prefetchAppQuery } from "@controllers/common";
import { authQueriesServer } from "@controllers/auth/query.server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  const qc = getQueryClient();
  await prefetchAppQuery(qc, authQueriesServer.sessionStatus());

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div className={Styles.Layout}>
        <Header />
        <div className={Styles.Content}>{children}</div>
      </div>
    </HydrationBoundary>
  );
};

export default HeaderLayout;
