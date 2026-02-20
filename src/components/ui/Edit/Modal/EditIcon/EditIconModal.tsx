import { useCallback, useEffect, useMemo, useState } from "react";
import EditModalLayout from "../Layout";
import * as Styles from "./style.css";
import LoadingPNG from "@assets/Loading.png";
import ErrorPNG from "@assets/Error.png";
import { IMAGE_SIZES } from "@ts/image";
import Image from "next/image";
import UploadSVG from "@assets/icons/upload.svg";
import ImageSVG from "@assets/icons/image.svg";
import { validateImage } from "@utils/Image";
import { uploadImage } from "@utils/uploadImage";

type Mode = "FILE" | "URL";

type FileStep = "idle" | "uploading" | "ready" | "error";
type UrlStep = "idle" | "loading" | "ready" | "error";

type FileState = {
  step: FileStep;
  file: File | null;
  previewUrl: string | null;
  errorText: string | null;
};

type UrlState = {
  step: UrlStep;
  input: string;
  previewUrl: string | null;
  errorText: string | null;
};

const LoadingView = () => (
  <div className={Styles.StatusContainer}>
    <div className={Styles.StatusIconContainer}>
      <Image
        src={LoadingPNG}
        alt="loading"
        sizes={IMAGE_SIZES}
        fill
        className={`${Styles.StatusIcon} ${Styles.LoadingIcon}`}
      />
    </div>
    <p className={Styles.StatusText}>⏳ Uploading image...</p>
  </div>
);

const ErrorView = ({ text }: { text: string }) => (
  <div className={Styles.StatusContainer}>
    <div className={Styles.StatusIconContainer}>
      <Image
        src={ErrorPNG}
        alt="error"
        sizes={IMAGE_SIZES}
        fill
        className={Styles.StatusIcon}
      />
    </div>
    <p className={Styles.StatusText}>❌ {text}</p>
    <p className={Styles.StatusSubText}>Please try again</p>
  </div>
);

const initialFileState: FileState = {
  step: "idle",
  file: null,
  previewUrl: null,
  errorText: null,
};

const initialUrlState: UrlState = {
  step: "idle",
  input: "",
  previewUrl: null,
  errorText: null,
};

function isValidHttpUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const EditIconModal = ({
  title,
  open,
  onClose,
  initialUrl,
  onApply,
}: {
  title?: string;
  open: boolean;
  onClose: () => void;
  initialUrl?: string;
  onApply?: (url: string) => void;
}) => {
  const [mode, setMode] = useState<Mode>("FILE");
  const [fileState, setFileState] = useState<FileState>(initialFileState);
  const [urlState, setUrlState] = useState<UrlState>(initialUrlState);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 브라우저 기본 동작(파일 열기) 방지
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 자식 요소 이동으로 인한 깜빡임 방지 (컨테이너 밖으로 나갈 때만 false)
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const f = e.dataTransfer.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setMode("FILE");
      setFileState((s) => ({
        ...s,
        step: "error",
        errorText: "Only image files are allowed",
        previewUrl: null,
        file: null,
      }));
      return;
    }

    handlePickFile(f);
  };

  const resetAll = useCallback(() => {
    setMode("FILE");
    setFileState(initialFileState);
    setUrlState(initialUrlState);
  }, []);

  const showLoadingForTarget = useCallback((target: Mode, url: string) => {
    if (target === "URL") {
      setMode("URL");
      setUrlState((s) => ({
        ...s,
        step: "loading",
        input: url,
        previewUrl: null,
        errorText: null,
      }));
      setFileState(initialFileState);
    } else {
      setMode("FILE");
      setFileState((s) => ({
        ...s,
        step: "uploading",
        file: null,
        previewUrl: null,
        errorText: null,
      }));
      setUrlState(initialUrlState);
    }
  }, []);

  const setReady = useCallback((target: Mode, url: string) => {
    if (target === "URL") {
      setMode("URL");
      setUrlState({
        step: "ready",
        input: url,
        previewUrl: url,
        errorText: null,
      });
      setFileState(initialFileState);
    } else {
      setMode("FILE");
      setFileState((s) => ({
        ...s,
        step: "ready",
        previewUrl: url,
        errorText: null,
        file: null,
      }));
      setUrlState(initialUrlState);
    }
  }, []);

  const setError = useCallback((target: Mode, msg: string, url?: string) => {
    if (target === "URL") {
      setMode("URL");
      setUrlState((s) => ({
        ...s,
        step: "error",
        input: url ?? s.input,
        previewUrl: null,
        errorText: msg,
      }));
      setFileState(initialFileState);
    } else {
      setMode("FILE");
      setFileState((s) => ({
        ...s,
        step: "error",
        previewUrl: null,
        errorText: msg,
        file: null,
      }));
      setUrlState(initialUrlState);
    }
  }, []);

  // open 시 initialUrl로 초기화 + 이미지 검증
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    (async () => {
      const url = initialUrl?.trim();
      if (!url) {
        resetAll();
        return;
      }

      // ✅ 기존 규칙 유지
      const target: Mode = url.startsWith("https") ? "URL" : "FILE";

      showLoadingForTarget(target, url);

      try {
        await validateImage(url);
        if (cancelled) return;
        setReady(target, url);
      } catch {
        if (cancelled) return;
        setError(target, "Image URL is invalid or expired", url);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, initialUrl, resetAll, setError, setReady, showLoadingForTarget]);

  // 닫힐 때(initialUrl 만료 등) 무효면 비우기 (너가 추가한 의도 유지)
  useEffect(() => {
    if (open) return;

    let cancelled = false;

    (async () => {
      const url = initialUrl?.trim();
      if (!url) return;

      try {
        await validateImage(url);
      } catch {
        if (cancelled) return;
        onApply?.("");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, initialUrl, onApply]);

  // 탭 전환 시 떠나는 탭이 error면 초기화
  const changeMode = useCallback((next: Mode) => {
    setMode((prev) => {
      if (prev === next) return prev;

      if (prev === "FILE") {
        setFileState((s) => (s.step === "error" ? initialFileState : s));
      } else {
        setUrlState((s) => (s.step === "error" ? initialUrlState : s));
      }

      return next;
    });
  }, []);

  const handleChangeTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeMode(e.target.value as Mode);
  };

  const handlePickFile = async (file: File) => {
    // 이전 blob 미리보기 해제
    setFileState((s) => {
      if (s.previewUrl?.startsWith("blob:")) URL.revokeObjectURL(s.previewUrl);
      return s;
    });

    // 로컬 미리보기
    const blobUrl = URL.createObjectURL(file);

    setMode("FILE");
    setUrlState(initialUrlState);
    setFileState({
      step: "ready", // 업로드 안하니 ready로 두는 게 자연스러움
      file,
      previewUrl: blobUrl,
      errorText: null,
    });
  };

  const handlePreviewUrl = async () => {
    const url = urlState.input.trim();
    if (!url) return;

    if (!isValidHttpUrl(url)) {
      setUrlState((s) => ({ ...s, step: "error", errorText: "Invalid URL" }));
      return;
    }

    setUrlState((s) => ({ ...s, step: "loading", errorText: null }));

    try {
      await validateImage(url);
      setMode("URL");
      setFileState(initialFileState);
      setUrlState((s) => ({
        ...s,
        step: "ready",
        previewUrl: url,
        errorText: null,
      }));
    } catch {
      setUrlState((s) => ({
        ...s,
        step: "error",
        errorText: "Invalid URL",
        previewUrl: null,
      }));
    }
  };

  const activePreviewUrl = useMemo(
    () => (mode === "FILE" ? fileState.previewUrl : urlState.previewUrl),
    [mode, fileState.previewUrl, urlState.previewUrl],
  );

  const canAdd = useMemo(() => {
    if (mode === "FILE")
      return fileState.step === "ready" && !!fileState.previewUrl;
    return urlState.step === "ready" && !!urlState.previewUrl;
  }, [
    mode,
    fileState.step,
    fileState.previewUrl,
    urlState.step,
    urlState.previewUrl,
  ]);

  const handleAdd = async () => {
    if (!activePreviewUrl) return;
    if (mode === "FILE") {
      const { url } = await uploadImage(fileState.file!);
      onApply?.(url);
      onClose();
    } else {
      onApply?.(activePreviewUrl);
      onClose();
    }
  };

  return (
    <EditModalLayout
      title={title}
      open={open}
      onClose={onClose}
      className={Styles.Container}
    >
      <div className={Styles.TabContainer}>
        <label className={Styles.TabItem}>
          <p>File</p>
          <input
            type="radio"
            name="mode"
            value="FILE"
            checked={mode === "FILE"}
            onChange={handleChangeTab}
            className={Styles.TabItemInput}
          />
        </label>

        <label className={Styles.TabItem}>
          <p>URL</p>
          <input
            type="radio"
            name="mode"
            value="URL"
            checked={mode === "URL"}
            onChange={handleChangeTab}
            className={Styles.TabItemInput}
          />
        </label>

        <span className={Styles.TabIndicator} />
      </div>

      <div className={Styles.Content}>
        {mode === "FILE" ? (
          <label
            className={Styles.UploadContainer}
            data-dragging={isDragging}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handlePickFile(f);
                e.currentTarget.value = "";
              }}
              style={{ display: "none" }}
            />
            {fileState.step === "ready" && fileState.previewUrl ? (
              <Image
                src={fileState.previewUrl}
                alt=""
                sizes={IMAGE_SIZES}
                fill
                className={Styles.Image}
              />
            ) : fileState.step === "uploading" ? (
              <LoadingView />
            ) : fileState.step === "error" ? (
              <ErrorView text={fileState.errorText ?? "Error"} />
            ) : (
              <div className={Styles.UploadContent}>
                <UploadSVG className={Styles.UploadIcon} />
                <p className={Styles.UploadText}>Drag & drop your Image here</p>
                <p className={Styles.UploadSubText}>
                  or <span>browse files</span>
                </p>
              </div>
            )}
          </label>
        ) : (
          <div className={Styles.URLContainer}>
            <div className={Styles.URLHeader}>
              <p className={Styles.URLTitle}>Image URL</p>
              <div className={Styles.URLInputContainer}>
                <input
                  type="text"
                  className={Styles.URLInput}
                  placeholder="https://..."
                  value={urlState.input}
                  onChange={(e) =>
                    setUrlState((s) => ({
                      ...s,
                      input: e.target.value,
                      ...(s.step === "ready"
                        ? { step: "idle", previewUrl: null }
                        : null),
                    }))
                  }
                />
                <button
                  type="button"
                  className={Styles.URLButton}
                  onClick={handlePreviewUrl}
                >
                  Preview
                </button>
              </div>
            </div>

            <div className={Styles.URLContent}>
              {urlState.step === "idle" && (
                <div className={Styles.URLEmpty}>
                  <ImageSVG className={Styles.URLEmptyIcon} />
                </div>
              )}

              {urlState.step === "loading" && <LoadingView />}

              {urlState.step === "error" && (
                <ErrorView text={urlState.errorText ?? "Invalid URL"} />
              )}

              {urlState.step === "ready" && urlState.previewUrl && (
                <Image
                  src={urlState.previewUrl}
                  alt=""
                  sizes={IMAGE_SIZES}
                  fill
                  className={Styles.Image}
                />
              )}
            </div>
          </div>
        )}

        <div className={Styles.ButtonContainer}>
          <button
            type="button"
            className={Styles.CancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={Styles.AddButton}
            disabled={!canAdd}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </EditModalLayout>
  );
};

export default EditIconModal;
