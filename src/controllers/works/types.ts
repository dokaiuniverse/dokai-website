import { Work } from "@domain/work";

// ===== Responses =====

export type WorkDetailResponse = {
  id: string;
  slug: string;
  isPublished: boolean;
  data: Work;
  updatedAt: string;
};

// ===== Requests =====

export type WorkUpsertRequest = {
  slug: string;
  isPublished: boolean;
  data: Work;
};
