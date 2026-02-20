import { useEffect, useState } from "react";
import EditModalLayout from "../Layout";
import * as Styles from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const UploadImageModal = ({
  open,
  onClose,
  uploadImages,
  handleCommit,
}: {
  open: boolean;
  onClose: () => void;
  uploadImages: (
    setProgress: (file: File | null, progress: number, count: number) => void,
  ) => void;
  handleCommit: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [percent, setPercent] = useState("0%");

  const setProgress = (file: File | null, progress: number, count: number) => {
    setFile(file);
    setPercent(`${((progress / count) * 100).toFixed(1)}%`);
  };

  useEffect(() => {
    if (!open) return;
    (async () => {
      await uploadImages(setProgress);
    })();
  }, [open]);

  return (
    <EditModalLayout
      title={percent === "100%" ? "Upload Complete" : "Uploading..."}
      open={open}
      onClose={onClose}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.Content}>
        <div
          className={Styles.Donut}
          style={assignInlineVars({ [Styles.percentVar]: percent })}
        >
          <p className={Styles.DonutText}>{percent}</p>
        </div>
        <p className={Styles.Title}>{file?.name ?? "Upload Complete"}</p>
      </div>

      <div className={Styles.ButtonContainer}>
        <button className={Styles.CloseButton} onClick={onClose}>
          Close
        </button>
        <button
          className={Styles.SaveButton}
          onClick={handleCommit}
          disabled={percent !== "100.0%"}
        >
          Save
        </button>
      </div>
    </EditModalLayout>
  );
};

export default UploadImageModal;
