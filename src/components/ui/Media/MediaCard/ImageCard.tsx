import ErrorComponent from "@components/ui/Status/Error";
import LoadingComponent from "@components/ui/Status/Loading";
import { ImageSource } from "@domain/media";
import Image from "next/image";
import { useEffect, useState } from "react";

const isSupportedImageSrc = (src: string) =>
  src.startsWith("/") ||
  src.startsWith("https://") ||
  src.startsWith("http://") ||
  src.startsWith("blob:");

const ImageCard = ({
  image,
  useAlternative,
}: {
  image?: ImageSource;
  useAlternative?: boolean;
}) => {
  const [state, setState] = useState<{
    step: "loading" | "error" | "loaded" | "idle";
    errorText?: string;
  }>({
    step: "idle",
  });

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    const src = image?.src;
    if (!src || !isSupportedImageSrc(src)) {
      setState({ step: "idle" });
    } else {
      setState({ step: "loading" });
    }
  }, [image?.src]);

  const handleImageError = () =>
    setState({
      step: "error",
      errorText: "Invalid image",
    });

  return (
    <>
      {state.step !== "idle" && image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          style={{
            objectFit: "cover",
            opacity: state.step !== "loaded" ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          onError={handleImageError}
          onLoad={() => setState({ step: "loaded" })}
        />
      )}
      {useAlternative &&
        (state.step === "error" ? (
          <ErrorComponent errorText={state.errorText} />
        ) : state.step === "loading" ? (
          <LoadingComponent />
        ) : null)}
    </>
  );
};

export default ImageCard;
