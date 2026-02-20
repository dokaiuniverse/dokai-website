import type {
  Profile,
  ProfileDetail,
  ProfileListItem,
  Project,
} from "@domain/careers";

// ===== Responses =====

export type ProfileListResponse = {
  items: ProfileListItem[];
};

export type ProfileDetailResponse = {
  isPublished: boolean;
  data: ProfileDetail;
  updatedAt: string;
};

export type ProjectDetailResponse = {
  isPublished: boolean;
  data: Project;
  updatedAt: string;
};

// ===== Requests =====
// NOTE:
// - path param으로 email/id를 받는 update/delete는 body에 key를 중복으로 넣지 않는 형태 추천
// - create는 email/id를 body에 포함(프로젝트는 profileEmail을 별도 필드로 받는 방식 권장)

export type CreateProfileRequest = {
  isPublished: boolean;
  data: Profile; // email 포함
};

export type UpdateProfileRequest = {
  isPublished?: boolean;
  data?: Profile; // email 바꿀거면 별도 정책 필요(권장: email 변경 금지)
};

export type CreateProjectRequest = {
  ownerEmail: string; // 어떤 프로필에 귀속되는지
  isPublished: boolean;
  data: Omit<Project, "id">; // id는 DB에서 생성하는게 일반적
};

export type UpdateProjectRequest = {
  isPublished?: boolean;
  data?: Project; // id 변경은 금지 권장
};

// ===== Mutations common responses =====

export type IdResponse = { id: string };
export type EmailResponse = { email: string };

export type TogglePublishResponse = {
  id: string;
  isPublished: boolean;
};
