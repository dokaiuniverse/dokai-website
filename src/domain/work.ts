import { Category } from "@ts/categories";
import type { MediaSource } from "./media";

export type WorkCategory =
  | "ANIMATE"
  | "BRANDING"
  | "CHARACTER"
  | "AWARD"
  | "FILM"
  | "COMMERCIAL"
  | "SOCIAL_CONTENTS";

export type WorkMetaField = {
  name: string;
  values: string[];
};

export type WorkCredit = {
  team: string;
  members: {
    role: string;
    names: string[];
  }[];
};

export type WorkProductionDate = {
  date: Date;
  text: string;
};

export type Work = {
  title: string;
  thumbnail: MediaSource | null;
  category: WorkCategory;
  summary: string;
  productionDate: WorkProductionDate;
  productionType: string;
  meta: WorkMetaField[];
  isShortForm: boolean;
  mainMedia: MediaSource | null;
  keyVisuals: MediaSource[];
  credits: WorkCredit[];
};

export type WorkListItem = Pick<
  Work,
  "title" | "thumbnail" | "category" | "summary" | "isShortForm"
>;

export type WorkCard = {
  slug: string;
  title: string;
  thumbnail: MediaSource | null;
  summary: string;
  category: Category;
  fixedAt: string | null;
};
