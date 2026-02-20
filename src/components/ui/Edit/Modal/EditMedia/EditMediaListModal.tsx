import { MediaSource, MediaType } from "@domain/media";
import EditModalLayout from "../Layout";
import { useEffect, useMemo, useState } from "react";
import SideBar from "./SideBar/SideBar";
import * as Styles from "./style.css";
import EmptyMedia from "./Empty/Empty";
import SelectMedia from "./Select/Select";
import EditImage from "./EditImage/EditImage";
import { uploadImage } from "@utils/uploadImage";
import UploadImageModal from "../UploadImage/UploadImageModal";
import EditVideo from "./EditVideo/EditVideo";

const EditMediaListModal = ({
  open,
  initial,
  onClose,
  applyMedias,
  blockedTypes = [],
}: {
  open: boolean;
  initial?: MediaSource[];
  onClose: () => void;
  applyMedias?: (medias: MediaSource[]) => void;
  blockedTypes?: MediaType[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [medias, setMedias] = useState<{ id: number; media: MediaSource }[]>(
    [],
  );
  const [pendingFiles, setPendingFiles] = useState<Map<number, File>>(
    () => new Map(),
  );
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const blockedVideoType = useMemo(() => {
    if (blockedTypes.includes("VIDEO")) return "VIDEO" as const;
    if (blockedTypes.includes("LOOP")) return "LOOP" as const;
    return undefined;
  }, [blockedTypes]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!open) return;
    setMedias(initial?.map((media, i) => ({ media, id: i })) ?? []);
    setSelectedIndex(null);
    setPendingFiles(new Map());
    setOpenUploadModal(false);
  }, [initial, open]);

  const deleteMedia = (id: number) => {
    setSelectedIndex(null);
    setMedias((prev) => prev.filter((item) => item.id !== id));
  };

  const addMedia = (type: "IMAGE" | "VIDEO" | "NONE") => {
    if (type === "NONE") {
      setSelectedIndex(null);
    } else {
      const media: MediaSource =
        type === "VIDEO" && blockedTypes.includes("VIDEO")
          ? {
              type: "LOOP",
              src: "",
              alt: "",
              loop: { start: undefined, end: undefined },
            }
          : { type, src: "", alt: "" };

      setMedias((prev) => [
        ...prev,
        {
          media,
          id: prev.length,
        },
      ]);

      setSelectedIndex(medias.length);
    }
  };

  const updateMedia =
    (id: number) => (updater: (media: MediaSource) => MediaSource) => {
      setMedias((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, media: updater(item.media) } : item,
        ),
      );
    };

  const setPendingFile = (id: number) => (file: File | null) => {
    setPendingFiles((prev) => {
      const next = new Map(prev);
      if (!file) next.delete(id);
      else next.set(id, file);
      return next;
    });
  };

  const uploadPendingImages = async (
    setProgress: (file: File | null, progress: number, count: number) => void,
  ) => {
    let i = 0;
    for (const [id, file] of pendingFiles.entries()) {
      setProgress(file, i++, pendingFiles.size);
      const { url } = await uploadImage(file);

      setPendingFile(id)(null);
      updateMedia(id)((prev) => ({ ...prev, src: url }));
    }
    setProgress(null, pendingFiles.size, pendingFiles.size);
  };

  const handleCommit = () => {
    applyMedias?.(medias.map((item) => item.media));
    onClose();
  };

  const handleApply = async () => {
    if (pendingFiles.size) {
      setOpenUploadModal(true);
      return;
    }

    handleCommit();
  };

  return (
    <EditModalLayout
      title={initial ? "Edit Medias" : "Add Medias"}
      open={open}
      onClose={onClose}
      className={Styles.ListContainer}
      maxWidth="48rem"
    >
      <div className={Styles.ListContent}>
        {selectedIndex === null ? (
          <EmptyMedia onClick={() => setSelectedIndex(-1)} />
        ) : selectedIndex === -1 ? (
          <SelectMedia blockedTypes={blockedTypes} selectMedia={addMedia} />
        ) : medias[selectedIndex] ? (
          medias[selectedIndex].media.type === "IMAGE" ? (
            <EditImage
              media={medias[selectedIndex].media}
              updateMedia={updateMedia(medias[selectedIndex].id)}
              setPendingFile={setPendingFile(medias[selectedIndex].id)}
            />
          ) : (
            <EditVideo
              media={medias[selectedIndex].media}
              updateMedia={updateMedia(medias[selectedIndex].id)}
              blockedType={blockedVideoType}
            />
          )
        ) : null}
      </div>

      <div className={Styles.ListSideBar}>
        <SideBar
          medias={medias}
          deleteMedia={deleteMedia}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className={Styles.ListButtonContainer}>
          <button onClick={onClose} className={Styles.CancelButton}>
            Cancel
          </button>
          <button onClick={handleApply} className={Styles.ApplyButton}>
            Apply
          </button>
        </div>
      </div>

      <UploadImageModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
        uploadImages={uploadPendingImages}
        handleCommit={handleCommit}
      />
    </EditModalLayout>
  );
};

export default EditMediaListModal;
