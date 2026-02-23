import * as CommonStyles from "../style.css";
import { AboutContentText } from "@domain/about";

type AboutPageTextSectionProps = {
  content: AboutContentText;
};

const AboutPageTextSection = ({ content }: AboutPageTextSectionProps) => {
  return (
    <div className={CommonStyles.Container}>
      <p className={CommonStyles.Title}>{content.name}</p>
      <div
        className={CommonStyles.Text}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
};

export default AboutPageTextSection;
