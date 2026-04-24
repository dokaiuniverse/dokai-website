import type {
  CareerPageDetail,
  Profile,
  ProfileDetail,
  ProfileListItem,
  Project,
} from "@domain/careers";
import { MediaSource } from "@domain/media";

// ===== Responses =====

export type CareerPageDetailResponse = {
  id: string;
  data: CareerPageDetail;
  updatedAt: string;
};

export type ProfileListResponse = {
  items: ProfileListItem[];
};

export type AdminMemberListResponse = {
  items: {
    id: string;
    email: string;
    role: AdminMemberRole;
  }[];
};

export type ProfileDetailResponse = {
  id: string;
  isPublished: boolean;
  data: ProfileDetail;
  updatedAt: string;
};

export type ProjectListInfiniteResponse = {
  items: {
    id: string;
    data: {
      title: string;
      thumbnail: MediaSource;
      ownerEmail: string;
      ownerName: string;
    };
  }[];
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  nextPage: number | null;
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

// ===== AdminMemberListUpdateRequest =====

export type AdminMemberRole = "admin" | "staff";

export type MemberCreateItem = {
  email: string;
  role: AdminMemberRole;
};

export type MemberUpdateItem = {
  id: string;
  email: string;
  role: AdminMemberRole;
};

export type AdminMemberListUpdateRequest = {
  created?: MemberCreateItem[];
  updated?: MemberUpdateItem[];
  deleted?: string[];
};
