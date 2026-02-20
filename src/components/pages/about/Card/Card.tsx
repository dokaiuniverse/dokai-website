import * as CommonStyles from "../style.css";
import * as Styles from "./style.css";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";
import { AboutCard, AboutContentCard } from "@domain/about";
import TrashSVG from "@assets/icons/trash.svg";
import PlusSVG from "@assets/icons/plus.svg";

import { useState } from "react";
import Editable from "@components/ui/Edit/Editable/Editable";
import EditIconModal from "@components/ui/Edit/Modal/EditIcon/EditIconModal";

type AboutPageCardSectionProps = {
  content: AboutContentCard;
  editable?: boolean;
  index?: number;
  updateContent?: <T extends AboutContentCard>(updater: (curr: T) => T) => void;
};

const AboutPageCardSection = ({
  content,
  editable,
  index,
  updateContent,
}: AboutPageCardSectionProps) => {
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [iconTargetIndex, setIconTargetIndex] = useState<number | null>(null);

  const openIconModal = (cardIndex: number) => {
    if (!editable) return;
    setIconTargetIndex(cardIndex);
    setIconModalOpen(true);
  };

  const closeIconModal = () => {
    setIconModalOpen(false);
  };

  const onApplyIcon = (nextUrl: string) => {
    if (iconTargetIndex === null) return;
    updateContent?.((prev) => ({
      ...prev,
      content: prev.content.map((c, i) =>
        i === iconTargetIndex ? { ...c, icon: nextUrl } : c,
      ),
    }));
  };

  const onChangeName = (name: string) => {
    updateContent?.((prev) => ({ ...prev, name }));
  };

  const onChangeText = (text: string) => {
    updateContent?.((prev) => ({ ...prev, text }));
  };

  const onAddCard = () => {
    updateContent?.((prev) => ({
      ...prev,
      content: [...prev.content, { title: "", text: "", icon: "" }],
    }));
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
      {content.content.map((card, cardIndex) => (
        <AboutPageCard
          key={`ABOUT_CARD_${index}_${cardIndex}`}
          card={card}
          cardIndex={cardIndex}
          editable={editable}
          updateContent={updateContent}
          openModal={openIconModal}
        />
      ))}
      {editable && (
        <>
          <button onClick={onAddCard} className={Styles.AddButton}>
            <PlusSVG className={Styles.AddButtonIcon} />
          </button>
          <EditIconModal
            title="Icon"
            open={iconModalOpen}
            onClose={closeIconModal}
            onApply={onApplyIcon}
            initialUrl={
              iconTargetIndex === null
                ? undefined
                : content.content[iconTargetIndex]?.icon
            }
          />
        </>
      )}
    </div>
  );
};

const AboutPageCard = ({
  card,
  cardIndex,
  editable,
  updateContent,
  openModal,
}: {
  card: AboutCard;
  cardIndex: number;
  editable?: boolean;
  updateContent?: <T extends AboutContentCard>(updater: (prev: T) => T) => void;
  openModal?: (cardIndex: number) => void;
}) => {
  const onChangeCardTitle = (cardIndex: number) => (title: string) => {
    updateContent?.((prev) => ({
      ...prev,
      content: prev.content.map((c, i) =>
        i === cardIndex ? { ...c, title } : c,
      ),
    }));
  };

  const onChangeCardText = (cardIndex: number) => (text: string) => {
    updateContent?.((prev) => ({
      ...prev,
      content: prev.content.map((c, i) =>
        i === cardIndex ? { ...c, text } : c,
      ),
    }));
  };

  const onRemoveCard = (cardIndex: number) => {
    updateContent?.((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== cardIndex),
    }));
  };

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
        {editable && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: "1",
            }}
            onClick={() => openModal?.(cardIndex)} // 여기 index는 map의 index!
          ></div>
        )}
      </div>
      <div className={Styles.WorkflowToolTextContainer}>
        <Editable
          mode="TEXT"
          value={card.title}
          editable={editable}
          onChange={onChangeCardTitle(cardIndex)}
          className={Styles.WorkflowToolTitle}
          placeholder="Card Title"
        />
        <Editable
          mode="TEXT"
          value={card.text}
          editable={editable}
          onChange={onChangeCardText(cardIndex)}
          className={Styles.WorkflowToolText}
          placeholder="Card Text"
        />
        {editable && (
          <button
            onClick={() => onRemoveCard(cardIndex)}
            className={Styles.RemoveButton}
          >
            <TrashSVG className={Styles.RemoveButtonIcon} />
          </button>
        )}
      </div>
    </>
  );
};

export default AboutPageCardSection;
