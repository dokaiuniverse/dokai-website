import * as CommonStyles from "../style.css";
import { AboutContentText } from "@domain/about";
import Editable from "@components/ui/Edit/Editable/Editable";

type AboutPageTextSectionProps = {
  content: AboutContentText;
  editable?: boolean;
  updateContent?: <T extends AboutContentText>(updater: (curr: T) => T) => void;
};

const AboutPageTextSection = ({
  content,
  editable,
  updateContent,
}: AboutPageTextSectionProps) => {
  const onChangeName = (name: string) => {
    updateContent?.((prev) => ({ ...prev, name }));
  };

  const onChangeText = (text: string) => {
    updateContent?.((prev) => ({ ...prev, text }));
  };

  return (
    <div className={CommonStyles.Container}>
      <Editable
        mode="TEXT"
        value={content.name}
        editable={editable}
        onChange={onChangeName}
        className={CommonStyles.Title}
        placeholder="Name"
      />
      <Editable
        mode="RICH"
        value={content.text}
        editable={editable}
        onChange={onChangeText}
        className={CommonStyles.Text}
        placeholder="Input Text"
      />
    </div>
  );
};

export default AboutPageTextSection;
