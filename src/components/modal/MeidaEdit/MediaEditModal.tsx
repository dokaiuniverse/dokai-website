import CrossSVG from "@assets/icons/cross.svg";
import { LoopSource, MediaSource } from "@domain/media";
import MediaCard from "@components/ui/Media/MediaCard";
import PlusSVG from "@assets/icons/plus.svg";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";
import MascotPNG from "@assets/mascot.png";
import ImageSVG from "@assets/icons/image.svg";
import VideoSVG from "@assets/icons/video.svg";
import * as Styles from "./style.css";
import { useEffect, useState } from "react";
import { uploadImage } from "@utils/uploadImage";
import TrashSVG from "@assets/icons/trash.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  medias?: MediaSource[];
  setMedias?: (medias: MediaSource[]) => void;
}

const MediaEditor = ({
  media,
  setModalMedias,
  index,
}: {
  media?: MediaSource | null;
  setModalMedias?: React.Dispatch<React.SetStateAction<MediaSource[]>>;
  index: number;
}) => {
  const isLoop = media?.type === "LOOP";
  const [imageSourceMode, setImageSourceMode] = useState<"FILE" | "URL">(
    "FILE",
  );
  const [uploading, setUploading] = useState(false);

  const [startEnabled, setStartEnabled] = useState(false);
  const [endEnabled, setEndEnabled] = useState(false);
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");

  useEffect(() => {
    if (!media || media.type !== "LOOP") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStartEnabled(false);
      setEndEnabled(false);
      setStartText("");
      setEndText("");
      return;
    }
    const lp = (media as LoopSource).loop;
    setStartEnabled(lp?.start !== undefined);
    setEndEnabled(lp?.end !== undefined);
    setStartText(lp?.start !== undefined ? String(lp.start) : "");
    setEndText(lp?.end !== undefined ? String(lp.end) : "");
  }, [media, index]);

  const isPartialNumber = (v: string) =>
    v === "" ||
    v === "-" ||
    v === "." ||
    v === "-." ||
    /^-?\d*(\.\d*)?$/.test(v);

  // blur에서 확정 파싱
  const parseToNumberOrUndefined = (v: string) => {
    const trimmed = v.trim();
    if (
      trimmed === "" ||
      trimmed === "-" ||
      trimmed === "." ||
      trimmed === "-."
    )
      return undefined;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : undefined;
  };

  const onPickFile = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요.");
      return;
    }

    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      handleChangeSrc(url); // ✅ 최종 URL 저장
      setImageSourceMode("URL"); // 업로드 후엔 URL 모드로 보여줘도 UX 좋음
    } catch (e) {
      alert("업로드에 실패했어요.");
    } finally {
      setUploading(false);
    }
  };

  const updateMedia = (updater: (curr: MediaSource) => MediaSource) => {
    if (!setModalMedias) return;
    setModalMedias((prev) => {
      const next = [...prev];
      next[index] = updater(next[index]);
      return next;
    });
  };

  const handleChangeSrc = (src: string) => updateMedia((m) => ({ ...m, src }));

  const handleChangeAlt = (alt: string) => updateMedia((m) => ({ ...m, alt }));

  const handleChangeVideoType = (type: "VIDEO" | "LOOP") =>
    updateMedia((m) => ({ ...m, type }));

  const handleChangeLoopStart = (start: number | undefined) =>
    updateMedia(
      (m) =>
        ({
          ...m,
          loop: { ...(m as LoopSource).loop, start },
        }) as LoopSource,
    );

  const handleChangeLoopEnd = (end: number | undefined) =>
    updateMedia(
      (m) =>
        ({
          ...m,
          loop: { ...(m as LoopSource).loop, end },
        }) as LoopSource,
    );
  const toggleStartEnabled = (enabled: boolean) => {
    if (!isLoop) return;
    setStartEnabled(enabled);

    if (!enabled) {
      setStartText("");
      handleChangeLoopStart(undefined);
      return;
    }

    // 켰는데 값이 비어있으면 기본값 0
    if (startText.trim() === "") {
      setStartText("0");
      handleChangeLoopStart(0);
    } else {
      const n = parseToNumberOrUndefined(startText);
      handleChangeLoopStart(n ?? 0);
    }
  };

  const toggleEndEnabled = (enabled: boolean) => {
    if (!isLoop) return;
    setEndEnabled(enabled);

    if (!enabled) {
      setEndText("");
      handleChangeLoopEnd(undefined);
      return;
    }

    if (endText.trim() === "") {
      setEndText("0");
      handleChangeLoopEnd(0);
    } else {
      const n = parseToNumberOrUndefined(endText);
      handleChangeLoopEnd(n ?? 0);
    }
  };

  if (!media) return null;

  return (
    <div className={Styles.Detail}>
      <div className={Styles.PreviewFrame}>
        <MediaCard
          key={`MEDIA_EDITOR_MEDIA_${media.type}_${media.src}_${(media as LoopSource).loop?.start}_${(media as LoopSource).loop?.end}`}
          media={media}
          className={Styles.Image}
        />
      </div>

      <div className={Styles.Form}>
        {media.type === "IMAGE" ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {/* 탭 */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="button" onClick={() => setImageSourceMode("FILE")}>
                File
              </button>
              <button type="button" onClick={() => setImageSourceMode("URL")}>
                URL
              </button>
            </div>

            {imageSourceMode === "FILE" ? (
              <label className={Styles.FieldRow}>
                <p className={Styles.FieldLabelSpan2}>Upload :</p>
                <div
                  className={Styles.FieldInputSpanRest}
                  style={{ display: "flex", gap: "0.5rem" }}
                >
                  {!uploading ? (
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                      style={{
                        height: "2rem",
                      }}
                    />
                  ) : (
                    <p>Uploading...</p>
                  )}
                </div>
              </label>
            ) : (
              <div className={Styles.FieldRow}>
                <p className={Styles.FieldLabelSpan2}>Image URL:</p>
                <div
                  className={Styles.FieldInputSpanRest}
                  style={{ display: "flex", gap: "0.5rem" }}
                >
                  <input
                    type="text"
                    value={media.src}
                    onChange={(e) => handleChangeSrc(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <label className={Styles.FieldRow}>
            <p className={Styles.FieldLabelSpan2}>Vimeo URL:</p>
            <input
              type="text"
              className={Styles.FieldInputSpanRest}
              value={media.src}
              onChange={(e) => handleChangeSrc(e.target.value)}
            />
          </label>
        )}

        <label className={Styles.FieldRow}>
          <p className={Styles.FieldLabelSpan2}>Alt Text :</p>
          <input
            type="text"
            className={Styles.FieldInputSpanRest}
            value={media.alt}
            onChange={(e) => handleChangeAlt(e.target.value)}
          />
        </label>

        <span className={Styles.GrowSpacer} />

        {media.type !== "IMAGE" && (
          <>
            <label className={Styles.FieldRow}>
              <p className={Styles.FieldLabelSpan2}>Loop Video</p>
              <input
                type="checkbox"
                style={{ gridColumn: "3 / -1" }}
                checked={isLoop}
                onChange={(e) =>
                  handleChangeVideoType(e.target.checked ? "LOOP" : "VIDEO")
                }
              />
            </label>
            {isLoop && (
              <div className={Styles.FieldRow}>
                <p className={Styles.FieldLabelSpan2}>Loop</p>

                <div className={Styles.InlineRow}>
                  <input
                    type="checkbox"
                    checked={startEnabled}
                    onChange={(e) => toggleStartEnabled(e.target.checked)}
                  />
                  <p>From</p>
                  <input
                    type="text"
                    className={Styles.FlexGrowInput}
                    value={startText}
                    disabled={!startEnabled}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!isPartialNumber(v)) return; // ✅ 소수점/중간입력 허용
                      setStartText(v);
                    }}
                    onBlur={() => {
                      if (!startEnabled) return;
                      const n = parseToNumberOrUndefined(startText);
                      // ✅ 빈칸이어도 disable하지 않음. 값만 undefined 처리(또는 0으로 강제도 가능)
                      handleChangeLoopStart(n);
                    }}
                  />

                  <input
                    type="checkbox"
                    checked={endEnabled}
                    onChange={(e) => toggleEndEnabled(e.target.checked)}
                  />
                  <p>To</p>
                  <input
                    type="text"
                    className={Styles.FlexGrowInput}
                    value={endText}
                    disabled={!endEnabled}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!isPartialNumber(v)) return;
                      setEndText(v);
                    }}
                    onBlur={() => {
                      if (!endEnabled) return;
                      const n = parseToNumberOrUndefined(endText);
                      handleChangeLoopEnd(n);
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const MediaEditModal = ({ isOpen, onClose, medias = [], setMedias }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalMedias, setModalMedias] = useState<MediaSource[]>(medias);
  const selectedMedia =
    selectedIndex === null ? null : modalMedias[selectedIndex];

  useEffect(() => {
    setModalMedias(medias);
  }, [medias]);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(null);
      setModalMedias(medias);
    }
  }, [isOpen]);

  const addNewMedia = (type: "IMAGE" | "VIDEO") => {
    if (!setModalMedias) return;
    setModalMedias([
      ...modalMedias,
      {
        type,
        src: "",
        alt: "",
      },
    ]);
    setSelectedIndex(modalMedias.length);
  };

  const applyChanges = () => {
    if (!setMedias) return;
    setMedias(modalMedias);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={Styles.Overlay} onMouseDown={onClose}>
      <div className={Styles.Modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={Styles.Header}>
          <strong>Media</strong>
          <button
            type="button"
            className={Styles.CloseButton}
            onClick={onClose}
          >
            <CrossSVG style={{ stroke: "black", width: 24, height: 24 }} />
          </button>
        </div>

        <div className={Styles.BodyGrid}>
          <div className={Styles.LeftPane}>
            {selectedIndex === null ? (
              <div className={Styles.CenterPlaceholder}>
                <div className={Styles.MascotWrap}>
                  <Image
                    src={MascotPNG}
                    alt="mascott"
                    fill
                    sizes={IMAGE_SIZES}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className={Styles.PlaceholderTitle}>Select a media</p>
              </div>
            ) : selectedIndex === -1 ? (
              <div className={Styles.TypePickerGrid}>
                <button
                  type="button"
                  className={Styles.TypePickerButton}
                  onClick={() => addNewMedia("IMAGE")}
                >
                  <ImageSVG className={Styles.TypePickerIcon} />
                  <p>Image</p>
                </button>
                <button
                  type="button"
                  className={Styles.TypePickerButton}
                  onClick={() => addNewMedia("VIDEO")}
                >
                  <VideoSVG className={Styles.TypePickerIcon} />
                  <p>Video</p>
                </button>
              </div>
            ) : (
              <MediaEditor
                media={selectedMedia}
                setModalMedias={setModalMedias}
                index={selectedIndex}
              />
            )}
          </div>

          <div className={Styles.RightPane}>
            <div
              style={{
                overflow: "auto",
                scrollbarGutter: "stable",
                flexGrow: "1",
              }}
            >
              {modalMedias.map((media, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <button
                    className={Styles.ThumbButton({
                      selected: selectedIndex === idx,
                    })}
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <MediaCard
                      key={`MEDIA_MODAL_THUMB_${media.type}_${media.src}_${(media as LoopSource).loop?.start}_${(media as LoopSource).loop?.end}_${idx}`}
                      media={media}
                      className={Styles.Image}
                      pointerEvents="auto"
                    />
                  </button>
                  <button
                    className={Styles.DeleteButton}
                    onClick={() => {
                      setModalMedias(modalMedias.filter((_, i) => i !== idx));
                    }}
                  >
                    <TrashSVG style={{ stroke: "black" }} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className={Styles.ThumbButton({
                  selected: selectedIndex === -1,
                })}
                onClick={() => setSelectedIndex(-1)}
              >
                <div
                  className={Styles.AddThumbInner({
                    selected: selectedIndex === -1,
                  })}
                >
                  <PlusSVG />
                </div>
              </button>
            </div>
            <div className={Styles.Footer}>
              <button
                type="button"
                className={Styles.FooterButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={Styles.PrimaryButton}
                onClick={applyChanges}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaEditModal;
