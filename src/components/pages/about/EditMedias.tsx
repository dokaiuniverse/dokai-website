import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import PlusSVG from "@assets/icons/plus.svg";
import { useModalStackStore } from "@stores/modalStackStore";

const AboutPageEditMedias = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();
  const { watch, setValue } = form;

  const { push } = useModalStackStore();

  const content = watch(`contents.${index}`) as AboutContentMedias;
  const align = content.align;

  const handleEditMedias = () => {
    push("EDIT_MEDIA_LIST", {
      initial: content.medias,
      applyMedias: (medias) => {
        setValue(`contents.${index}.medias`, medias);
      },
    });
  };

  const handleChangeAlign = () => {
    setValue(`contents.${index}.align`, align === "LEFT" ? "RIGHT" : "LEFT");
  };

  return (
    <div className={Styles.EditMediasContainer}>
      {content.medias.length ? (
        <MediaSlider
          mediaList={content.medias}
          className={Styles.MediasMedia}
        />
      ) : (
        <button
          className={Styles.EditMediasAddMediaButton}
          onClick={handleEditMedias}
        >
          <PlusSVG className={Styles.EditMediasAddMediaButtonIcon} />
        </button>
      )}
      <button
        onClick={handleChangeAlign}
        className={Styles.EditMediasAlignButton({ align })}
      >
        <ArrowRightSVG className={Styles.EditMediasAlignButtonIcon} />
      </button>
      <EditButton
        onClick={handleEditMedias}
        className={Styles.EditMediasEditButton}
      />
    </div>
  );
};

export default AboutPageEditMedias;
