"use client";

import { useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import FloatingButton from "@components/ui/Edit/FloatingButton/FloatingButton";
import { authQueriesClient } from "@controllers/auth/query.client";
import { useRouter } from "nextjs-toploader/app";
import WorkKeyVisuals from "@components/pages/work/KeyVisuals";
import WorkCredits from "@components/pages/work/Credits";
import WorkHeader from "@components/pages/work/Header";
import * as Styles from "./style.css";

const WorkDetailPageClient = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data } = useAppQuery(worksQueriesClient.workDetail(slug));
  const { data: sessionStatus } = useAppQuery(
    authQueriesClient.sessionStatus(),
  );

  if (!data) return null;

  const { data: work, isPublished } = data;

  const editable = sessionStatus?.role === "admin";

  const handleEditWork = () => {
    router.push(`/admin/work?slug=${slug}`);
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <PrivateMark
          isPrivate={!isPublished}
          className={Styles.HeaderPrivateMark}
        />
        <WorkHeader work={work} />
        <WorkKeyVisuals keyVisuals={work.keyVisuals} />
        <WorkCredits credits={work.credits} />
      </div>
      {editable && (
        <div className={Styles.FloatingButtonContainer}>
          <FloatingButton
            type="EDIT"
            onClick={handleEditWork}
            text="Edit Work"
          />
        </div>
      )}
    </>
  );
};

export default WorkDetailPageClient;
