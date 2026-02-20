import { WorkCategory } from "@domain/work";
import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard";
import { useEffect, useState } from "react";
import { MediaSource } from "@domain/media";
import PlusSVG from "@assets/icons/plus.svg";
import EditSVG from "@assets/icons/edit.svg";

const CategoryList: WorkCategory[] = [
  "ANIMATE",
  "BRANDING",
  "CHARACTER",
  "AWARD",
  "FILM",
  "COMMERCIAL",
  "SOCIAL_CONTENTS",
];

import ToggleUpSVG from "@assets/icons/toggle-up.svg";
import { Work } from "@domain/work";
import EditSingleMediaModal from "@components/ui/Edit/Modal/EditMedia/EditSingleMediaModal";

const WorkDetailInfo = ({
  slug,
  work,
  isPublic,
  setSlug,
  slugChecked,
  updateWork,
  togglePublic,
  setSlugChecked,
}: {
  slug: string;
  work: Work;
  isPublic: boolean;
  setSlug: (slug: string) => void;
  slugChecked: "OK" | "FAIL" | "NEED_CHECK";
  setSlugChecked: (slugChecked: "OK" | "FAIL" | "NEED_CHECK") => void;
  updateWork: (updater: (work: Work) => Work) => void;
  togglePublic: () => void;
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    setSlugChecked("NEED_CHECK");
  }, [slug]);

  const setCategory = (category: WorkCategory) => {
    updateWork((prev) => ({ ...prev, category }));
  };

  const setSummary = (summary: string) => {
    updateWork((prev) => ({ ...prev, summary }));
  };

  const setThumbnail = (thumbnail: MediaSource | null) => {
    updateWork((prev) => ({ ...prev, thumbnail }));
  };

  return (
    <div className={Styles.Container}>
      <div className={Styles.MediaContainer}>
        {work.thumbnail ? (
          <>
            <MediaCard media={work.thumbnail} className={Styles.Media} />
            <button
              className={Styles.EditButton}
              onClick={() => setOpenEditModal(true)}
            >
              <EditSVG className={Styles.ButtonIcon} />
            </button>
          </>
        ) : (
          <label className={Styles.MediaEmptyContainer}>
            <button
              className={Styles.MediaAddButton}
              onClick={() => setOpenEditModal(true)}
            >
              <PlusSVG className={Styles.MediaAddButtonIcon} />
            </button>
          </label>
        )}
      </div>
      <div className={Styles.InfoContainer}>
        <div className={Styles.InfoItem}>
          <p className={Styles.InfoTitle}>Page Slug</p>
          <div className={Styles.SlugInputContainer}>
            <input
              type="text"
              placeholder="page-slug"
              className={Styles.SlugInput}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <button
              className={Styles.SlugButton}
              disabled={slugChecked !== "NEED_CHECK"}
              onClick={() => setSlugChecked("FAIL")}
            >
              {slugChecked === "NEED_CHECK"
                ? "Check"
                : slugChecked === "FAIL"
                  ? "❌ Fail"
                  : "✅ OK"}
            </button>
          </div>
        </div>
        <div className={Styles.InfoItem}>
          <p className={Styles.InfoTitle}>Work Category</p>
          <div className={Styles.CategorySelectWrapper}>
            <select
              className={Styles.CategorySelect}
              value={work.category}
              onChange={(e) => setCategory(e.target.value as WorkCategory)}
            >
              {CategoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ToggleUpSVG className={Styles.CategorySelectIcon} />
          </div>
        </div>
        <div className={`${Styles.InfoItem} ${Styles.SummaryItem}`}>
          <p className={Styles.InfoTitle}>Work Summary</p>
          <textarea
            placeholder="summary"
            className={Styles.SummaryTextArea}
            value={work.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
      </div>
      <label className={Styles.ToggleRow}>
        <div className={Styles.ToggleText}>
          <p className={Styles.ToggleTitle}>Public</p>
          <p className={Styles.ToggleDesc}>
            Publish this page so anyone can view it.
          </p>
        </div>

        <div className={Styles.ToggleWrapper} data-on={isPublic}>
          <button
            type="button"
            className={Styles.Toggle}
            aria-pressed={isPublic}
            onClick={togglePublic}
          >
            <span className={Styles.Knob} />
          </button>
        </div>
      </label>
      <EditSingleMediaModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        initial={work.thumbnail}
        applyMedia={setThumbnail}
        blockedTypes={["VIDEO"]}
      />
    </div>
  );
};

export default WorkDetailInfo;
