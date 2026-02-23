import * as Styles from "./style.css";
import { About } from "@domain/about";
import AboutPageIntro from "@components/pages/about_tmp/Intro/Intro";
import AboutPageMedia from "@components/pages/about_tmp/Media/Media";
import AboutPageTextSection from "@components/pages/about_tmp/Text/Text";
import AboutPageGroupSection from "@components/pages/about_tmp/Group/Group";
import AboutPageCardSection from "@components/pages/about_tmp/Card/Card";
import AboutPageTeamSection from "@components/pages/about_tmp/Team/Team";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";

type AboutPageClientProps = {
  aboutInfo: About;
};

const AboutPageClient = ({ aboutInfo }: AboutPageClientProps) => {
  console.log(aboutInfo);
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
      <AdminButtons
        adminButtons={[
          {
            role: "ADMIN",
            type: "EDIT",
            click: {
              type: "HREF",
              href: "/admin/about",
            },
            text: "Edit About Page",
          },
        ]}
      />
    </div>
  );
};

export default AboutPageClient;
