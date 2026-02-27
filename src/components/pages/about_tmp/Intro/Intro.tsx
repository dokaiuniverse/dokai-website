import * as Styles from "./style.css";

type AboutIntroProps = {
  text: string;
};

const AboutIntro = ({ text }: AboutIntroProps) => {
  return (
    <div
      className={Styles.Container}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default AboutIntro;
