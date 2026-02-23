import { AboutContentGroup } from "@domain/about";
import * as CommonStyles from "../style.css";
import * as Styles from "./style.css";

type AboutPageGroupSectionProps = {
  content: AboutContentGroup;
};

const AboutPageGroupSection = ({ content }: AboutPageGroupSectionProps) => {
  return (
    <div className={CommonStyles.Container}>
      <p className={CommonStyles.Title}>{content.name}</p>
      <p className={CommonStyles.Text}>{content.text}</p>
      <div className={Styles.Quadrant}>
        {content.content.map((group, groupIdx) => (
          <div key={`ABOUT_GROUP_${groupIdx}`} className={Styles.QuadrantItem}>
            <p className={Styles.QuadrantTitle}>{group.name}</p>
            <ul className={Styles.QuadrantList}>
              {group.values.map((value, valueIdx) => (
                <li key={`ABOUT_GROUP_${groupIdx}_${valueIdx}`}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageGroupSection;
