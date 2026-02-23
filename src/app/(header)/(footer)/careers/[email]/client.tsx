"use client";

import CareerDetailProfile from "@components/pages/careers/Profile/Profile";
import * as Styles from "./style.css";
import CareerDetailProjects from "@components/pages/careers/Projects/Projects";
import CareerDetailExperiences from "@components/pages/careers/Experiences/Experiences";
import { ProfileDetail } from "@domain/careers";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useModalStackStore } from "@stores/modalStackStore";

const CareersDetailPageClient = ({
  profileDetail,
}: {
  profileDetail: ProfileDetail;
}) => {
  const searchParams = useSearchParams();
  const { replaceTop } = useModalStackStore();

  useEffect(() => {
    if (searchParams.get("project")) {
      replaceTop("PROJECT", { ownerEmail: profileDetail.email });
    }
  }, [searchParams]);

  if (!profileDetail) return null;

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <CareerDetailProfile profile={profileDetail} />
      <CareerDetailProjects
        email={profileDetail.email}
        projects={profileDetail.projects}
      />
      <CareerDetailExperiences experiences={profileDetail.experiences} />
    </div>
  );
};

export default CareersDetailPageClient;
