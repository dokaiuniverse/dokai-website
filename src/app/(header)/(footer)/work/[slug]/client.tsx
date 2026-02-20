"use client";

import WorkDetailHeader from "@components/pages/work/Header/Header";
import * as Styles from "./style.css";

import { Work } from "@domain/work";
import WorkDetailKeyVisuals from "@components/pages/work/KeyVisuals/KeyVisuals";
import WorkDetailCredits from "@components/pages/work/Credits/Credits";

const WorkDetailPageClient = ({ work }: { work: Work }) => {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <WorkDetailHeader work={work} />
      <WorkDetailKeyVisuals work={work} />
      <WorkDetailCredits work={work} />
    </div>
  );
};

export default WorkDetailPageClient;
