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

export type Credit = {
  team: string;
  members: {
    role: string;
    names: string[];
  }[];
};

export type Work = {
  title: string;
  thumbnail: MediaSource | null;
  summary: string;
  category: WorkCategory;
  publishedAt: string;
  productionType: string;
  meta: WorkMetaField[];
  mainMedia: MediaSource | null;
  keyVisuals: MediaSource[];
  credits: Credit[];
};

export type WorkCard = {
  slug: string;
  title: string;
  thumbnail: MediaSource | null;
  summary: string;
  category: WorkCategory;
  fixedAt: string | null;
};
