import * as CommonStyles from "../style.css";
import * as Styles from "./style.css";
import { AboutContentTeam } from "@domain/about";
import React from "react";

type AboutPageTeamProps = {
  content: AboutContentTeam;
};

const AboutPageTeamSection = ({ content }: AboutPageTeamProps) => {
  return (
    <div className={CommonStyles.Container}>
      <p className={CommonStyles.Title}>{content.name}</p>
      <div
        className={CommonStyles.Text}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />

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
    </div>
  );
};

export default AboutPageTeamSection;
