"use client";

import * as Styles from "./style.css";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import Link from "next/link";
import PlusSVG from "@assets/icons/plus.svg";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProjectDetail } from "@controllers/careers/fetch";
import { queryOptions } from "@controllers/common";
import { useSearchParams } from "next/navigation";
import { useModalStackStore } from "@stores/modalStackStore";
import { useEffect } from "react";
import { useSessionOwner } from "@controllers/auth/session";
import { ProjectListItem } from "@domain/careers";

const CareerProjects = ({
  projects,
  email,
  isReadOnly,
}: {
  projects: ProjectListItem[];
  email: string;
  isReadOnly?: boolean;
}) => {
  const qc = useQueryClient();
  const isOwner = useSessionOwner(email);

  const handleClickProject = async (project: ProjectListItem) => {
    void qc.prefetchQuery({
      queryKey: ["project", project.id],
      queryFn: () => fetchProjectDetail(project.id),
      ...queryOptions,
    });
  };

  const searchParams = useSearchParams();
  const { replaceTop } = useModalStackStore();

  useEffect(() => {
    if (searchParams.get("project")) {
      replaceTop("PROJECT", { ownerEmail: email });
    }
  }, [searchParams]);

  if (!isOwner && !projects.length) return null;

  return (
    <div className={Styles.ProjectContainer({ isReadOnly })}>
      <p className={Styles.ProjectTitle}>work</p>
      <div className={Styles.ProjectContent}>
        {projects.map((project, idx) => (
          <MediaHoverOverlay
            key={`PROJECT_${project.id}`}
            media={project.thumbnail}
            className={Styles.ProjectMedia}
            priority={idx === 0}
          >
            <Link
              href={`?project=${project.id}`}
              scroll={false}
              className={Styles.ProjectOverlay}
              onClick={() => handleClickProject(project)}
            >
              <p className={Styles.ProjectOverlayTitle}>{project.title}</p>
            </Link>
          </MediaHoverOverlay>
        ))}

        {isOwner && (
          <Link
            href="?project=new"
            scroll={false}
            className={Styles.ProjectAddButton}
          >
            <PlusSVG className={Styles.ProjectAddButtonIcon} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CareerProjects;
