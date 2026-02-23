import { MediaSource } from "@domain/media";
import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import EditIcon from "@assets/icons/edit.svg";
import { useState } from "react";
import PlusSVG from "@assets/icons/plus.svg";
import EditMediaListModal from "@components/ui/Edit/Modal/EditMedia/EditMediaListModal";
import { Work } from "@domain/work";

const WorkDetailKeyVisuals = ({
  work,
  editable,
  updateWork,
}: {
  work: Work;
  editable?: boolean;
  updateWork?: (updater: (work: Work) => Work) => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setKeyVisuals = (keyVisuals: MediaSource[]) => {
    updateWork?.((prev) => ({ ...prev, keyVisuals }));
  };

  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>Key visual</p>

      <div className={Styles.MediaContainer}>
        {work.keyVisuals.map((visual, i) => (
          <MediaCard key={i} media={visual} className={Styles.Media} />
        ))}
        {editable && (
          <label className={Styles.MediaEmptyContainer}>
            <button
              className={Styles.MediaAddButton}
              onClick={() => setIsEditModalOpen(true)}
            >
              <PlusSVG className={Styles.MediaAddButtonIcon} />
            </button>
          </label>
        )}
      </div>
      {editable && (
        <button
          className={Styles.EditButton}
          onClick={() => setIsEditModalOpen(true)}
        >
          <EditIcon className={Styles.ButtonIcon} />
        </button>
      )}
      <EditMediaListModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initial={work.keyVisuals}
        applyMedias={setKeyVisuals}
      />
    </div>
  );
};

export default WorkDetailKeyVisuals;
