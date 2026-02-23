import { MediaSource } from "@domain/media";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";
import React from "react";

const MediaCard = ({
  media,
  className,
  useAlternative,
  blockInteractive,
}: {
  media: MediaSource;
  className?: string;
  useAlternative?: boolean;
  blockInteractive?: boolean;
}) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        background: "#EFEFEF",
      }}
    >
      {media.type === "IMAGE" ? (
        <ImageCard
          image={media}
          useAlternative={useAlternative}
          key={`IMAGE_CARD_${media.src}`}
        />
      ) : (
        <VideoCard
          video={media}
          useAlternative={useAlternative}
          blockInteractive={blockInteractive}
          key={`VIDEO_CARD_${media.src}${media.type === "LOOP" ? `_${media.loop?.start}_${media.loop?.end}` : ""}`}
        />
      )}
    </div>
  );
};

export default React.memo(MediaCard);
