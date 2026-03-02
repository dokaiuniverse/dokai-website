import type {
  CareerPageDetail,
  Profile,
  ProfileDetail,
  ProfileListItem,
  Project,
} from "@domain/careers";

// ===== Responses =====

export type CareerPageDetailResponse = {
  id: string;
  data: CareerPageDetail;
  updatedAt: string;
};

export type ProfileListResponse = {
  items: ProfileListItem[];
};

export type ProfileDetailResponse = {
  id: string;
  isPublished: boolean;
  data: ProfileDetail;
  updatedAt: string;
};

export type ProjectDetailResponse = {
  id: string;
  isPublished: boolean;
  data: Project;
  updatedAt: string;
};

// ===== Requests =====

export type CareerPageUpsertRequest = {
  data: CareerPageDetail;
};

export type ProfileUpsertRequest = {
  isPublished: boolean;
  data: Profile; // email 포함
};

export type ProjectUpsertRequest = {
  ownerEmail: string;
  isPublished: boolean;
  data: Project;
};

// ===== Mutations common responses =====

export type IdResponse = { id: string };
export type EmailResponse = { email: string };

export type TogglePublishResponse = {
  id: string;
  isPublished: boolean;
};
