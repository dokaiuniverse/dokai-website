"use client";

import CareerDetailProfile from "@components/pages/careers/Profile/Profile";
import * as Styles from "./style.css";
import CareerDetailProjects from "@components/pages/careers/Projects/Projects";
import CareerDetailExperiences from "@components/pages/careers/Experiences/Experiences";
import { ProfileDetail } from "@domain/careers";

const CareersDetailPageClient = ({
  profileDetail,
}: {
  profileDetail: ProfileDetail;
}) => {
  if (!profileDetail) return null;

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <CareerDetailProfile profile={profileDetail} />
      <CareerDetailProjects
        email={profileDetail.email}
        projects={profileDetail.projects}
      />
      <CareerDetailExperiences experiences={profileDetail.experiences} />
      {/* <AdminButtons
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
      /> */}
    </div>
  );
};

export default CareersDetailPageClient;
