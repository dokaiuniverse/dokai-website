import * as CommonStyles from "../style.css";
import * as Styles from "./style.css";
import { AboutContentTeam, AboutTeam } from "@domain/about";
import React from "react";
import Editable from "@components/ui/Edit/Editable/Editable";
import StructuredText from "@components/ui/Edit/StructuredText/StructuredText";

const aboutTeamSpec = {
  levels: [
    { labelKey: "role", childrenKey: "names" }, // values는 string[]
  ],
};

type AboutPageTeamProps = {
  content: AboutContentTeam;
  editable?: boolean;
  updateContent?: <T extends AboutContentTeam>(updater: (curr: T) => T) => void;
};

const AboutPageTeamSection = ({
  content,
  editable,
  updateContent,
}: AboutPageTeamProps) => {
  const onChangeName = (name: string) => {
    updateContent?.((prev) => ({ ...prev, name }));
  };

  const onChangeText = (text: string) => {
    updateContent?.((prev) => ({ ...prev, text }));
  };

  const onChangeTeam = (content: AboutTeam[]) => {
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
        spec={aboutTeamSpec}
        onUpdate={onChangeTeam}
        editable={editable}
        className={Styles.Content}
      >
        <div className={Styles.TeamContainer}>
          {content.content.map((member, memberIdx) => (
            <React.Fragment key={`ABOUT_TEAM_${memberIdx}`}>
              <p className={Styles.TeamRole}>{member.role}</p>
              <div className={Styles.TeamNames}>
                {member.names.map((name, nameIdx) => (
                  <p key={`ABOUT_TEAM_${memberIdx}_${nameIdx}`}>{name}</p>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </StructuredText>
    </div>
  );
};

export default AboutPageTeamSection;
