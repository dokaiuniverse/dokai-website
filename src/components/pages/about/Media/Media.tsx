"use client";

import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";
import { useEffect, useState } from "react";
import EditIcon from "@assets/icons/edit.svg";
import { MediaSource } from "@domain/media";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import PlusSVG from "@assets/icons/plus.svg";
import EditMediaListModal from "@components/ui/Edit/Modal/EditMedia/EditMediaListModal";

const AboutPageMedia = ({
  content,
  editable,
  updateContent,
}: {
  content: AboutContentMedias;
  editable?: boolean;
  updateContent?: <T extends AboutContentMedias>(
    updater: (curr: T) => T,
  ) => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setMedias = (medias: MediaSource[]) => {
    updateContent?.((prev) => ({
      ...prev,
      medias: medias
        .filter((e) => e.src)
        .map((e, i) => ({ ...e, alt: e.alt ?? `about_media_${i}` })),
    }));
  };

  const changeAlign = (align: "LEFT" | "RIGHT") => {
    updateContent?.((prev) => ({
      ...prev,
      align: align === "LEFT" ? "RIGHT" : "LEFT",
    }));
  };

  return (
    <>
      <div className={Styles.Container}>
        <MediaSlider className={Styles.Content} mediaList={content.medias} />
        {editable && (
          <>
            {!content.medias.length ? (
              <label className={Styles.EmptyContaienr}>
                <button
                  className={Styles.AddButton}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <PlusSVG className={Styles.ButtonIcon} />
                </button>
              </label>
            ) : (
              <button
                className={Styles.EditButton}
                onClick={() => setIsEditModalOpen(true)}
              >
                <EditIcon className={Styles.ButtonIcon} />
              </button>
            )}
            <button
              className={Styles.AlignButton({ align: content.align })}
              onClick={() => changeAlign(content.align)}
            >
              <ArrowRightSVG className={Styles.ButtonIcon} />
            </button>
          </>
        )}
        <EditMediaListModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initial={content.medias}
          applyMedias={setMedias}
        />
      </div>
    </>
  );
};

export default AboutPageMedia;
