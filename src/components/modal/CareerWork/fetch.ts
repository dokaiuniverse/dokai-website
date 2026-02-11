import { MediaSource } from "@components/ui/Media/types";

export type ContentText = {
  type: "TEXT";
  name: string;
  value: string;
};

export type ContentList = {
  type: "LIST";
  name: string;
  value: string[];
};

export type Content = ContentText | ContentList;

export type CareerWork = {
  title: string;
  content: Content[];
  medias: MediaSource[];
};

const fetchCareerWork = (careerWorkId: string): Promise<CareerWork> => {
  console.log(careerWorkId);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "BRAND FILM 2026",
        content: [
          {
            type: "TEXT",
            name: "Role",
            value: "Creative director",
          },
          {
            type: "TEXT",
            name: "Project Description",
            value:
              '"The Day We Keep Close" is about the philosophy of "A special day at home." It is a brand film of DOSSY, a pajama brand that is released with the emotions and atmosphere of a modern couple living with their cat.',
          },
          {
            type: "LIST",
            name: "Skills",
            value: ["Graphic", "3D"],
          },
        ],
        medias: [
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
          {
            type: "IMAGE",
            src: "/nhi_1.png",
            alt: "brand_film_2026",
          },
        ],
      });
    }, 500);
  });
};

export default fetchCareerWork;
