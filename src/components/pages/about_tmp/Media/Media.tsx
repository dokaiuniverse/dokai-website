import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";

const AboutPageMedia = ({ content }: { content: AboutContentMedias }) => {
  return (
    <>
      <div className={Styles.Container}>
        <MediaSlider className={Styles.Content} mediaList={content.medias} />
      </div>
    </>
  );
};

export default AboutPageMedia;
