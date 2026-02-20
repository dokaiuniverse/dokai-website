"use client";

import * as Styles from "./style.css";
import { About } from "@domain/about";
import { useAboutQuery } from "./query";
import AboutPageIntro from "@components/pages/about/Intro/Intro";
import AboutPageMedia from "@components/pages/about/Media/Media";
import AboutPageTextSection from "@components/pages/about/Text/Text";
import AboutPageGroupSection from "@components/pages/about/Group/Group";
import AboutPageCardSection from "@components/pages/about/Card/Card";
import AboutPageTeamSection from "@components/pages/about/Team/Team";

type AboutPageClientProps = {
  aboutInfo?: About;
};

const AboutPageClient = ({}: AboutPageClientProps) => {
  const { data, isLoading, isError } = useAboutQuery();

  const aboutInfo = data?.data;

  if (isLoading) return <div>Loading...</div>;

  if (isError || !aboutInfo) return <div>Error</div>;

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <AboutPageIntro text={aboutInfo.intro} />
      {aboutInfo.contents.map((content, index) => (
        <div
          key={`ABOUT_CONTENT_${index}`}
          className={Styles.Content({
            align:
              content.type === "MEDIAS" && content.align === "LEFT"
                ? "LEFT"
                : "RIGHT",
          })}
        >
          {content.type === "MEDIAS" ? (
            <AboutPageMedia content={content} />
          ) : content.type === "TEXT" ? (
            <AboutPageTextSection content={content} />
          ) : content.type === "GROUP" ? (
            <AboutPageGroupSection content={content} />
          ) : content.type === "CARD" ? (
            <AboutPageCardSection content={content} />
          ) : content.type === "TEAM" ? (
            <AboutPageTeamSection content={content} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default AboutPageClient;
