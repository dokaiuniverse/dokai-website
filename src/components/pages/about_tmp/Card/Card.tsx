import * as CommonStyles from "../style.css";
import * as Styles from "./style.css";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";
import { AboutCard, AboutContentCard } from "@domain/about";

type AboutPageCardSectionProps = {
  content: AboutContentCard;
};

const AboutPageCardSection = ({ content }: AboutPageCardSectionProps) => {
  return (
    <div className={CommonStyles.Container}>
      <p className={CommonStyles.Title}>{content.name}</p>
      <p className={CommonStyles.Text}>{content.text}</p>
      {content.content.map((card, cardIndex) => (
        <AboutPageCard key={`ABOUT_CARD_${cardIndex}`} card={card} />
      ))}
    </div>
  );
};

const AboutPageCard = ({ card }: { card: AboutCard }) => {
  return (
    <>
      <div className={Styles.WorkflowToolIconContainer}>
        {card.icon && (
          <Image
            src={card.icon}
            alt={card.title}
            fill
            sizes={IMAGE_SIZES}
            className={Styles.WorkflowToolIcon}
          />
        )}
      </div>
      <div className={Styles.WorkflowToolTextContainer}>
        <p className={Styles.WorkflowToolTitle}>{card.title}</p>
        <p className={Styles.WorkflowToolText}>{card.text}</p>
      </div>
    </>
  );
};

export default AboutPageCardSection;
