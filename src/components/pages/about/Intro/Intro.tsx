import Editable from "@components/ui/Edit/Editable/Editable";
import * as Styles from "./style.css";

type AboutPageIntroProps = {
  text: string;
  editable?: boolean;
  onChange?: (value: string) => void;
};

const AboutPageIntro = ({ text, editable, onChange }: AboutPageIntroProps) => {
  return (
    <Editable
      mode="RICH"
      value={text}
      editable={editable}
      onChange={onChange}
      className={Styles.Container}
      placeholder="Intro Text"
    />
  );
};

export default AboutPageIntro;
