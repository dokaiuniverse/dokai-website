"use client";

import { MediaSource } from "@domain/media";
import UploadSVG from "@assets/icons/upload.svg";
import * as Styles from "./style.css";
import { useEffect, useRef, useState } from "react";
import MediaCard from "@components/ui/Media/MediaCard";

const EditImage = ({
  media,
  updateMedia,
  setPendingFile,
}: {
  media?: MediaSource;
  updateMedia: (updater: (curr: MediaSource) => MediaSource) => void;
  setPendingFile: (file: File | null) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const ownedBlobUrlRef = useRef<string | null>(null);

  const src = media?.src || "";
  const alt = media?.alt || "";

  const cleanupOwnedBlob = () => {
    if (ownedBlobUrlRef.current) {
      URL.revokeObjectURL(ownedBlobUrlRef.current);
      ownedBlobUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupOwnedBlob();
    };
  }, []);

  const handlePickFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    cleanupOwnedBlob();

    const blobUrl = URL.createObjectURL(file);
    ownedBlobUrlRef.current = blobUrl;

    setPendingFile(file);
    setIsFile(true);

    updateMedia((prev) => ({
      ...prev,
      src: blobUrl,
      alt: prev.alt || file.name,
    }));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    handlePickFile(f);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handlePickFile(f);
    e.currentTarget.value = "";
  };

  const handleChangeSrc = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMedia((prev) => ({ ...prev, src: e.target.value }));
  };

  const handleChangeAlt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMedia((prev) => ({ ...prev, alt: e.target.value }));
  };

  const handleClearData = () => {
    setPendingFile(null);
    setIsFile(false);
    cleanupOwnedBlob();
    updateMedia((prev) => ({ ...prev, src: "", alt: "" }));
  };

  if (!media) return null;

  return (
    <div
      className={Styles.Container}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div data-dragging={isDragging} className={Styles.DragOverlay}>
        <UploadSVG className={Styles.DragOverlayIcon} />
      </div>
      <label className={Styles.MediaContainer}>
        <MediaCard media={media} className={Styles.Media} useAlternative />
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeFile}
          className={Styles.UploadInput}
        />
      </label>

      <div className={Styles.Content}>
        <div className={Styles.SourceContainer}>
          <p className={Styles.Title}>Image URL</p>
          <div className={Styles.InputContainer}>
            <input
              type="text"
              value={src}
              onChange={handleChangeSrc}
              className={Styles.Input}
              disabled={isFile}
            />
            {isFile && (
              <button className={Styles.ClearButton} onClick={handleClearData}>
                Clear
              </button>
            )}
          </div>
        </div>

        <div className={Styles.DescriptionContainer}>
          <p className={Styles.Title}>Description</p>
          <textarea
            value={alt}
            onChange={handleChangeAlt}
            className={Styles.TextArea}
          />
        </div>

        <label className={Styles.UploadContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
            className={Styles.UploadInput}
          />
          <UploadSVG className={Styles.UploadIcon} />
          <p className={Styles.UploadText}>Drag & drop your Image</p>
          <p className={Styles.UploadSubText}>
            or <span>browse files</span>
          </p>
        </label>
      </div>
    </div>
  );
};

export default EditImage;
