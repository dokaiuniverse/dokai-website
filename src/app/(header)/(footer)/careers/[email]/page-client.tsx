"use client";

import CareerProfile from "@components/pages/careers/Profile";
import CareerProjects from "@components/pages/careers/Projects";
import CareerExperiences from "@components/pages/careers/Experiences";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import * as Styles from "./style.css";
import { useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";

const CareersDetailPageClient = ({ email }: { email: string }) => {
  const { data } = useAppQuery(careersQueriesClient.profileDetail(email));

  if (!data) return null;

  const { data: profileDetail, isPublished } = data;

  return (
    <div className={`${Styles.Content} page-wrapper layout-wrapper`}>
      <PrivateMark
        isPrivate={!isPublished}
        className={Styles.HeaderPrivateMark}
      />
      <CareerProfile profileDetail={profileDetail} />
      <CareerProjects
        projects={profileDetail.projects}
        email={profileDetail.email}
      />
      <CareerExperiences experiences={profileDetail.experiences} />
      <AdminButtons
        adminButtons={[
          {
            role: "STAFF",
            type: "EDIT",
            click: {
              type: "HREF",
              href: `/admin/careers?email=${encodeURIComponent(profileDetail.email)}`,
            },
            email: decodeURIComponent(profileDetail.email),
          },
        ]}
      />
    </div>
  );
};

export default CareersDetailPageClient;
