import { useState } from "react";
import EditModalLayout from "../Layout";
import ToggleUpSVG from "@assets/icons/toggle-up.svg";
import SectionTextSamplePNG from "@assets/sample/section_text_sample.png";
import SectionGroupSamplePNG from "@assets/sample/section_group_sample.png";
import SectionCardSamplePNG from "@assets/sample/section_card_sample.png";
import SectionTeamSamplePNG from "@assets/sample/section_team_sample.png";
import Image from "next/image";
import ImageSVG from "@assets/icons/image.svg";
import { IMAGE_SIZES } from "@ts/image";
import { AboutContent } from "@domain/about";
import * as Styles from "./style.css";
import PlusSVG from "@assets/icons/plus.svg";

const SectionList = [
  {
    title: "Media Slider",
    sample: (
      <ImageSVG
        style={{
          width: "4rem",
          height: "auto",
          aspectRatio: "1 / 1",
        }}
      />
    ),
    initial: {
      type: "MEDIAS",
      align: "LEFT",
      medias: [],
    },
  },
  {
    title: "Text",
    sample: (
      <Image
        src={SectionTextSamplePNG}
        alt="text-section-sample"
        sizes={IMAGE_SIZES}
        fill
        style={{
          objectFit: "contain",
        }}
      />
    ),
    initial: {
      type: "TEXT",
      name: "",
      text: "",
    },
  },
  {
    title: "Group",
    sample: (
      <Image
        src={SectionGroupSamplePNG}
        alt="group-section-sample"
        sizes={IMAGE_SIZES}
        fill
        style={{
          objectFit: "contain",
        }}
      />
    ),
    initial: {
      type: "GROUP",
      name: "",
      text: "",
      content: [
        {
          name: "tmp1",
          values: ["tmp1", "tmp2", "tmp3"],
        },
        {
          name: "tmp2",
          values: ["tmp1", "tmp2", "tmp3"],
        },
        {
          name: "tmp3",
          values: ["tmp1", "tmp2", "tmp3"],
        },
        {
          name: "tmp4",
          values: ["tmp1", "tmp2", "tmp3"],
        },
      ],
    },
  },
  {
    title: "Card",
    sample: (
      <Image
        src={SectionCardSamplePNG}
        alt="card-section-sample"
        sizes={IMAGE_SIZES}
        fill
        style={{
          objectFit: "contain",
        }}
      />
    ),
    initial: {
      type: "CARD",
      name: "",
      text: "",
      content: [],
    },
  },
  {
    title: "Team",
    sample: (
      <Image
        src={SectionTeamSamplePNG}
        alt="team-section-sample"
        sizes={IMAGE_SIZES}
        fill
        style={{
          objectFit: "contain",
        }}
      />
    ),
    initial: {
      type: "TEAM",
      name: "",
      text: "",
      content: [
        {
          role: "tmp1",
          names: ["tmp1", "tmp2", "tmp3"],
        },
        {
          role: "tmp2",
          names: ["tmp1", "tmp2", "tmp3"],
        },
        {
          role: "tmp3",
          names: ["tmp1", "tmp2", "tmp3"],
        },
        {
          role: "tmp4",
          names: ["tmp1", "tmp2", "tmp3"],
        },
      ],
    },
  },
];

const AddSectionModal = ({
  open,
  onClose,
  addAboutContent,
}: {
  open: boolean;
  onClose: () => void;
  addAboutContent: (content: AboutContent) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setSelectedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <EditModalLayout
      title={"Add Section"}
      open={open}
      onClose={onClose}
      className={Styles.Container}
    >
      <div className={Styles.Content}>
        {SectionList.map((section, idx) => {
          const isOpen = selectedIndex === idx;

          return (
            <div
              key={`ADD_SECTION_${section.title}`}
              onClick={() => toggle(idx)}
              className={Styles.ItemContainer}
            >
              <div className={Styles.ItemHeader}>
                <p className={Styles.ItemTitle}>{section.title}</p>
                <span className={Styles.ItemToggle({ isOpen })}>
                  <ToggleUpSVG className={Styles.ItemToggleIcon} />
                </span>
              </div>

              <div
                className={Styles.ItemContent({ isOpen })}
                onClick={(e) => {
                  e.stopPropagation();
                  addAboutContent(section.initial as AboutContent);
                }}
              >
                <div className={Styles.ItemContentWrapper}>
                  {section.sample}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        disabled={selectedIndex === null}
        onClick={() => {
          if (selectedIndex === null) return;
          addAboutContent(SectionList[selectedIndex].initial as AboutContent);
        }}
        className={Styles.AddButton}
      >
        <PlusSVG className={Styles.AddButtonIcon} />
      </button>
    </EditModalLayout>
  );
};

export default AddSectionModal;
