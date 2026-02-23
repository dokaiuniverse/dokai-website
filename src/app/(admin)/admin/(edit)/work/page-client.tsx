"use client";

import * as WorkStyles from "@app/(header)/(footer)/work/[slug]/style.css";
import { useEffect, useState } from "react";
import { Work } from "@domain/work";
import WorkDetailHeader from "@components/pages/work/Header/Header";
import WorkDetailKeyVisuals from "@components/pages/work/KeyVisuals/KeyVisuals";
import WorkDetailCredits from "@components/pages/work/Credits/Credits";
import {
  fetchWorkCreate,
  fetchWorkDelete,
  fetchWorkUpdate,
  WorkDetailResponse,
} from "@controllers/work/fetch";
import WorkDetailInfo from "@components/pages/work/Info/Info";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import { useRouter } from "nextjs-toploader/app";
import { useModalStackStore } from "@stores/modalStackStore";

const initalWork: Work = {
  title: "",
  category: "ANIMATE",
  summary: "",
  thumbnail: null,
  mainMedia: null,
  publishedAt: "",
  productionType: "",
  meta: [],
  keyVisuals: [],
  credits: [],
};

const AdminWorkPageClient = ({
  workDetail,
}: {
  workDetail?: WorkDetailResponse;
}) => {
  const router = useRouter();
  const [workId, setWorkId] = useState(workDetail?.id ?? null);
  const [slug, setSlug] = useState(workDetail?.slug ?? "");
  const [slugChecked, setSlugChecked] = useState<"OK" | "FAIL" | "NEED_CHECK">(
    "NEED_CHECK",
  );
  const [work, setWork] = useState<Work>(workDetail?.data ?? initalWork);
  const [isPublic, setIsPublic] = useState(workDetail?.isPublished ?? false);

  const updateWork = (updater: (work: Work) => Work) => {
    setWork((prev) => updater(prev));
  };

  const togglePublic = () => setIsPublic((prev) => !prev);

  const push = useModalStackStore((s) => s.push);

  const handleCreateWork = async () => {
    push("API", {
      title: "Create New Work",
      onFetch: async () => fetchWorkCreate(slug, isPublic, work),
      onSuccess: (data) => {
        setWorkId(data.id);
      },
      onConfirm: () => {
        router.replace(`/work/${slug}`);
      },
    });
  };

  const handleUpdateWork = async () => {
    if (!workId) return;
    push("API", {
      title: "Update Work",
      onFetch: async () => fetchWorkUpdate(workId, slug, isPublic, work),
      onConfirm: () => {
        router.replace(`/work/${slug}`);
      },
    });
  };

  const handleDeleteWork = async () => {
    if (!workId) return;
    push("CONFIRM", {
      title: "Delete Work",
      content: "Are you sure to delete this work?",
      onConfirm: () => {
        push("API", {
          title: "Delete Work",
          onFetch: async () => fetchWorkDelete(workId),
          onConfirm: () => {
            router.replace(`/work`);
          },
        });
      },
    });
  };

  return (
    <div className={`${WorkStyles.Container} page-wrapper layout-wrapper`}>
      <WorkDetailInfo
        slug={slug}
        work={work}
        isPublic={isPublic}
        slugChecked={slugChecked}
        setSlug={setSlug}
        updateWork={updateWork}
        togglePublic={togglePublic}
        setSlugChecked={setSlugChecked}
      />
      <WorkDetailHeader work={work} editable updateWork={updateWork} />
      <WorkDetailKeyVisuals work={work} editable updateWork={updateWork} />
      <WorkDetailCredits work={work} editable updateWork={updateWork} />

      <AdminButtons
        adminButtons={
          !workId
            ? [
                {
                  role: "ADMIN",
                  type: "ADD",
                  click: {
                    type: "FUNCTION",
                    onClick: handleCreateWork,
                  },
                  text: "Create New Work",
                },
              ]
            : [
                {
                  role: "ADMIN",
                  type: "SAVE",
                  click: {
                    type: "FUNCTION",
                    onClick: handleUpdateWork,
                  },
                  text: "Update Work",
                },
                {
                  role: "ADMIN",
                  type: "REMOVE",
                  click: {
                    type: "FUNCTION",
                    onClick: handleDeleteWork,
                  },
                  text: "Delete Work",
                },
              ]
        }
      />
    </div>
  );
};

export default AdminWorkPageClient;
