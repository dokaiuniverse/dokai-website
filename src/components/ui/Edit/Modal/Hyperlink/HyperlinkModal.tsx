import { useEffect, useState } from "react";
import EditModalLayout from "../Layout";
import Image from "next/image";
import LoadingPNG from "@assets/Loading.png";
import ErrorPNG from "@assets/Error.png";
import { IMAGE_SIZES } from "@ts/image";
import * as Styles from "./style.css";

type OgData = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

type OgStep = "idle" | "loading" | "ready" | "error";

type OgState = {
  step: OgStep;
  url: string;
  og: OgData | null;
  error?: string;
};

const initialOgState: OgState = {
  step: "idle",
  url: "",
  og: null,
  error: undefined,
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
    <p className={Styles.StatusText}>⏳ loading OpenGraph data...</p>
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

const OgView = ({ og, url }: { og: OgData; url: string }) => {
  return (
    <div className={Styles.OgViewContainer}>
      <div className={Styles.OgViewImageContainer}>
        {og.image && (
          // next/image 써도 됨
          <img src={og.image} alt="" className={Styles.OgViewImage} />
        )}
      </div>
      <div className={Styles.OgViewTextContainer}>
        <p className={Styles.OgViewTitle}>{og.title ?? "제목 없음"}</p>
        <p className={Styles.OgViewDescription}>{og.description ?? ""}</p>
        <p className={Styles.OgViewUrl}>{og.url ?? url}</p>
      </div>
    </div>
  );
};

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const HyperlinkModal = ({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: (url: string) => void;
}) => {
  const [url, setUrl] = useState("");
  const [ogState, setOgState] = useState<OgState>(initialOgState);

  useEffect(() => {
    if (!open) return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUrl("");
    setOgState(initialOgState);
  }, [open]);

  const handlePreviewUrl = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    if (!isValidUrl(trimmedUrl)) {
      setOgState((prev) => ({
        ...prev,
        step: "error",
        error: "Invalid URL",
      }));
      return;
    }

    setOgState((prev) => ({
      ...prev,
      step: "loading",
    }));

    fetch(`/api/public/og?url=${encodeURIComponent(trimmedUrl)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("OpenGraph fetch failed");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return (await r.json()) as OgData;
      })
      .then((data) => {
        setOgState((prev) => ({
          ...prev,
          step: "ready",
          og: data,
          url: trimmedUrl,
        }));
      })
      .catch(() => {
        setOgState((prev) => ({
          ...prev,
          step: "error",
          error: "could not fetch OpenGraph data",
        }));
      });
  };

  return (
    <EditModalLayout
      title={"Hyperlink"}
      open={open}
      onClose={onClose}
      className={Styles.Container}
    >
      <div className={Styles.Content}>
        <div className={Styles.URLInputContainer}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className={Styles.URLInput}
          />
          <button onClick={handlePreviewUrl} className={Styles.URLButton}>
            Preview
          </button>
        </div>
        <div className={Styles.Wrapper}>
          {ogState.step === "ready" && ogState.og !== null ? (
            <OgView og={ogState.og} url={url} />
          ) : ogState.step === "loading" ? (
            <LoadingView />
          ) : ogState.step === "error" ? (
            <ErrorView text={ogState.error ?? "Unknown Error"} />
          ) : (
            <p>URL to preview</p>
          )}
        </div>
      </div>
      <div className={Styles.ButtonContainer}>
        <button onClick={onClose} className={Styles.CancelButton}>
          Cancel
        </button>
        <button
          onClick={() => {
            if (ogState.step !== "ready" || ogState.url === "") {
              return;
            }
            onApply(ogState.url);
          }}
          className={Styles.AddButton}
        >
          Apply
        </button>
      </div>
    </EditModalLayout>
  );
};

export default HyperlinkModal;
