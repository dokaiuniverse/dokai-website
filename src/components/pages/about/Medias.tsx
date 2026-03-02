import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";

type AboutPageMediasProps = {
  content: AboutContentMedias;
};

const AboutPageMedias = ({ content }: AboutPageMediasProps) => {
  return (
    <MediaSlider mediaList={content.medias} className={Styles.MediasMedia} />
  );
};

export default AboutPageMedias;
