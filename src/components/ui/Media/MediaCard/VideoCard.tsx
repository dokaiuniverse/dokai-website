import ErrorComponent from "@components/ui/Status/Error";
import LoadingComponent from "@components/ui/Status/Loading";
import { LoopSource, VideoSource } from "@domain/media";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const VimeoPlayer = dynamic(() => import("../VimeoPlayer"), { ssr: false });

const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"]);

export function extractVimeoId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;

  if (/^\d{6,12}$/.test(s)) return s;

  let url: URL;
  try {
    url =
      s.startsWith("http://") || s.startsWith("https://")
        ? new URL(s)
        : new URL(`https://${s}`);
  } catch {
    return null;
  }

  if (!VIMEO_HOSTS.has(url.hostname)) return null;

  const match = url.pathname.match(/(?:\/video\/|\/)?(\d{6,12})(?:\/|$)/);
  return match?.[1] ?? null;
}

const VideoCard = ({
  video,
  useAlternative,
  blockInteractive,
}: {
  video?: VideoSource | LoopSource;
  useAlternative?: boolean;
  blockInteractive?: boolean;
}) => {
  const [state, setState] = useState<{
    step: "loading" | "error" | "loaded" | "idle";
    errorText?: string;
  }>({
    step: "idle",
  });

  const videoId = useMemo(() => extractVimeoId(video?.src ?? ""), [video?.src]);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    if (!videoId) {
      setState({ step: "idle" });
    } else {
      setState({ step: "loading" });
    }
  }, [videoId]);

  const handleImageError = () =>
    setState({
      step: "error",
      errorText: "Invalid image",
    });

  return (
    <>
      {state.step !== "idle" && video && videoId && (
        <VimeoPlayer
          videoId={videoId}
          loop={video.type === "LOOP" ? video.loop : undefined}
          onError={handleImageError}
          onLoad={() => setState({ step: "loaded" })}
        />
      )}
      {blockInteractive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
        />
      )}
      {useAlternative && state.step !== "loaded" && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            bottom: "0",
          }}
        >
          {state.step === "error" ? (
            <ErrorComponent errorText={state.errorText} />
          ) : state.step === "loading" ? (
            <LoadingComponent />
          ) : null}
        </div>
      )}
    </>
  );
};

export default VideoCard;
