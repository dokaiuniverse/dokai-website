import * as Styles from "./style.css";

type AboutPageIntroProps = {
  text: string;
};

const AboutPageIntro = ({ text }: AboutPageIntroProps) => {
  return (
    <div
      className={Styles.Container}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default AboutPageIntro;
