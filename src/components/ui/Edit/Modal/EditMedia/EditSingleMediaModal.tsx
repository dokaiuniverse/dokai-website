import { MediaSource, MediaType } from "@domain/media";
import EditModalLayout from "../Layout";
import * as Styles from "./style.css";
import { useEffect, useMemo, useState } from "react";
import SelectMedia from "./Select/Select";
import EditImage from "./EditImage/EditImage";
import { uploadImage } from "@utils/uploadImage";
import ArrowLeftSVG from "@assets/icons/arrow-left.svg";
import EditVideo from "./EditVideo/EditVideo";

const EditSingleMediaModal = ({
  open,
  initial,
  onClose,
  applyMedia,
  blockedTypes = [],
}: {
  open: boolean;
  initial: MediaSource | null;
  onClose: () => void;
  applyMedia?: (media: MediaSource | null) => void;
  blockedTypes?: MediaType[];
}) => {
  const [media, setMedia] = useState<MediaSource | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const blockedVideoType = useMemo(() => {
    if (blockedTypes.includes("VIDEO")) return "VIDEO" as const;
    if (blockedTypes.includes("LOOP")) return "LOOP" as const;
    return undefined;
  }, [blockedTypes]);

  const canBack = useMemo(() => {
    const canImage = !blockedTypes?.includes("IMAGE");
    const canVideo = !blockedTypes?.includes("VIDEO");
    const canLoop = !blockedTypes?.includes("LOOP");
    const canAnyVideoLike = canVideo || canLoop;

    return canImage && canAnyVideoLike;
  }, [blockedTypes]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!open) return;
    setMedia(initial);
    setPendingFile(null);
  }, [initial, open]);

  const updateMedia = (updater: (curr: MediaSource) => MediaSource) => {
    setMedia((prev) => (prev ? updater(prev) : null));
  };

  const selectMedia = (type: "IMAGE" | "VIDEO" | "NONE") => {
    if (type === "NONE") {
      setMedia(null);
    } else {
      if (type === "VIDEO" && blockedTypes.includes("VIDEO")) {
        setMedia({
          type: "LOOP",
          src: "",
          alt: "",
          loop: { start: undefined, end: undefined },
        });
      } else {
        setMedia({ type, src: "", alt: "" });
      }
    }
  };

  const handleApply = async () => {
    if (!media) {
      onClose();
      return;
    }

    const nextMedia =
      media.type === "IMAGE" && pendingFile
        ? { ...media, src: (await uploadImage(pendingFile)).url }
        : media;

    applyMedia?.(nextMedia);
    onClose();
  };

  return (
    <EditModalLayout
      title={initial ? "Edit Media" : "Add Media"}
      open={open}
      onClose={onClose}
      className={Styles.SingleContainer}
    >
      <div className={Styles.SingleContent}>
        {!media ? (
          <SelectMedia selectMedia={selectMedia} blockedTypes={blockedTypes} />
        ) : media.type === "IMAGE" ? (
          <EditImage
            media={media}
            updateMedia={updateMedia}
            setPendingFile={setPendingFile}
          />
        ) : (
          <EditVideo
            media={media}
            updateMedia={updateMedia}
            blockedType={blockedVideoType}
          />
        )}
      </div>
      {media && (
        <div className={Styles.SingleButtonContainer}>
          {canBack && (
            <button
              className={Styles.BackButton}
              onClick={() => setMedia(null)}
            >
              <ArrowLeftSVG />
            </button>
          )}
          <button onClick={onClose} className={Styles.CancelButton}>
            Cancel
          </button>
          <button onClick={handleApply} className={Styles.ApplyButton}>
            Apply
          </button>
        </div>
      )}
    </EditModalLayout>
  );
};

export default EditSingleMediaModal;
