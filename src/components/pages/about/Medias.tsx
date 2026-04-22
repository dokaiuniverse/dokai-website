import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";

type AboutPageMediasProps = {
  content: AboutContentMedias;
};

const AboutPageMedias = ({ content }: AboutPageMediasProps) => {
  return (
    <div className={Styles.ContentContainer}>
      {!!content.name && (
        <p className={Styles.ContentName({ align: content.align })}>
          {content.name}
        </p>
      )}
      <MediaSlider
        mediaList={content.medias}
        className={Styles.MediasMedia({
          align: content.align,
          size: content.size,
        })}
      />
    </div>
  );
};

export default AboutPageMedias;
