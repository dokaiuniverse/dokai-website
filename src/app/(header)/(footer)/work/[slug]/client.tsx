"use client";

import WorkDetailHeader from "@components/pages/work/Header/Header";
import * as Styles from "./style.css";

import { Work } from "@domain/work";
import WorkDetailKeyVisuals from "@components/pages/work/KeyVisuals/KeyVisuals";
import WorkDetailCredits from "@components/pages/work/Credits/Credits";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";

const WorkDetailPageClient = ({ work, slug }: { work: Work; slug: string }) => {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <WorkDetailHeader work={work} />
      <WorkDetailKeyVisuals work={work} />
      <WorkDetailCredits work={work} />
      <AdminButtons
        adminButtons={[
          {
            role: "ADMIN",
            type: "EDIT",
            click: {
              type: "HREF",
              href: `/admin/work?slug=${slug}`,
            },
            text: "Edit Work",
          },
        ]}
      />
    </div>
  );
};

export default WorkDetailPageClient;
