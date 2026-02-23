import Editable from "@components/ui/Edit/Editable/Editable";
import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { MediaSource } from "@domain/media";
import { Work, WorkMetaField } from "@domain/work";
import PlusSVG from "@assets/icons/plus.svg";
import StructuredText from "@components/ui/Edit/StructuredText/StructuredText";
import EditSVG from "@assets/icons/edit.svg";
import { useState } from "react";
import EditSingleMediaModal from "@components/ui/Edit/Modal/EditMedia/EditSingleMediaModal";

const workMetaSpec = {
  levels: [
    { labelKey: "name", childrenKey: "values" }, // values는 string[]
  ],
};

const WorkDetailHeader = ({
  work,
  editable,
  updateWork,
}: {
  work: Work;
  editable?: boolean;
  updateWork?: (updater: (work: Work) => Work) => void;
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const setTitle = (title: string) => {
    updateWork?.((prev) => ({ ...prev, title }));
  };

  const setPublishedAt = (publishedAt: string) => {
    updateWork?.((prev) => ({ ...prev, publishedAt }));
  };

  const setProductionType = (productionType: string) => {
    updateWork?.((prev) => ({ ...prev, productionType }));
  };

  const setMeta = (meta: WorkMetaField[]) => {
    updateWork?.((prev) => ({ ...prev, meta }));
  };

  const setMainMedia = (mainMedia: MediaSource | null) => {
    updateWork?.((prev) => ({ ...prev, mainMedia }));
  };

  console.log(work.meta);

  return (
    <div className={Styles.Grid}>
      <Editable
        mode="TEXT"
        value={work.title}
        onChange={setTitle}
        editable={editable}
        placeholder="Title..."
        className={Styles.Title}
      />

      <div className={Styles.MetaColumn}>
        <div className={Styles.PrimaryMeta}>
          <Editable
            mode="TEXT"
            value={`${!editable ? new Date(work.publishedAt).getFullYear() : work.publishedAt}`}
            onChange={setPublishedAt}
            editable={editable}
            placeholder="2025-02-16..."
          />
          <Editable
            mode="TEXT"
            value={work.productionType}
            onChange={setProductionType}
            editable={editable}
            placeholder="100% AI-gene..."
          />
          <span className={Styles.Divider} />
        </div>

        <StructuredText
          data={work.meta}
          spec={workMetaSpec}
          onUpdate={setMeta}
          editable={editable}
          className={Styles.MetaList}
        >
          {work.meta.map((info) => (
            <div key={`WORK_META_${info.name}`} className={Styles.MetaItem}>
              <p className={Styles.MetaTitle}>{info.name}</p>
              {info.values.map((value) => (
                <p
                  key={`WORK_META_${info.name}_${value}`}
                  className={Styles.MetaContent}
                >
                  {value}
                </p>
              ))}
            </div>
          ))}
        </StructuredText>
      </div>

      <div className={Styles.MediaContainer}>
        {work.mainMedia ? (
          <>
            <MediaCard media={work.mainMedia} className={Styles.Media} />
            {editable && (
              <button
                className={Styles.EditButton}
                onClick={() => setOpenEditModal(true)}
              >
                <EditSVG className={Styles.ButtonIcon} />
              </button>
            )}
          </>
        ) : (
          editable && (
            <label className={Styles.MediaEmptyContainer}>
              <button
                className={Styles.MediaAddButton}
                onClick={() => setOpenEditModal(true)}
              >
                <PlusSVG className={Styles.MediaAddButtonIcon} />
              </button>
            </label>
          )
        )}
      </div>
      <EditSingleMediaModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        initial={work.mainMedia}
        applyMedia={setMainMedia}
      />
    </div>
  );
};

export default WorkDetailHeader;
