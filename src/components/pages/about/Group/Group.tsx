import { AboutContentGroup, AboutGroup } from "@domain/about";
import * as CommonStyles from "../style.css";
import * as Styles from "./style.css";
import Editable from "@components/ui/Edit/Editable/Editable";
import StructuredText from "@components/ui/Edit/StructuredText/StructuredText";

type AboutPageServicesProps = {
  content: AboutContentGroup;
  editable?: boolean;
  updateContent?: <T extends AboutContentGroup>(
    updater: (curr: T) => T,
  ) => void;
};

const aboutGroupSpec = {
  levels: [
    { labelKey: "name", childrenKey: "values" }, // values는 string[]
  ],
};

const AboutPageGroupSection = ({
  content,
  editable,
  updateContent,
}: AboutPageServicesProps) => {
  const onChangeName = (name: string) => {
    updateContent?.((prev) => ({ ...prev, name }));
  };

  const onChangeText = (text: string) => {
    updateContent?.((prev) => ({ ...prev, text }));
  };

  const onChangeGroup = (content: AboutGroup[]) => {
    updateContent?.((prev) => ({ ...prev, content }));
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
      <StructuredText
        data={content.content}
        spec={aboutGroupSpec}
        onUpdate={onChangeGroup}
        editable={editable}
        className={Styles.Content}
      >
        <div className={Styles.Quadrant}>
          {content.content.map((group, groupIdx) => (
            <div
              key={`ABOUT_GROUP_${groupIdx}`}
              className={Styles.QuadrantItem}
            >
              <p className={Styles.QuadrantTitle}>{group.name}</p>
              <ul className={Styles.QuadrantList}>
                {group.values.map((value, valueIdx) => (
                  <li key={`ABOUT_GROUP_${groupIdx}_${valueIdx}`}>{value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </StructuredText>
    </div>
  );
};

export default AboutPageGroupSection;
