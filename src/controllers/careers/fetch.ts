import type {
  CreateProfileRequest,
  UpdateProfileRequest,
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./types";
import { fetchApi } from "../common";

// Profile

export const fetchProfileList = () =>
  fetchApi<ProfileListResponse>(`/api/public/career/profiles`);

export const fetchProfileDetail = (email: string) =>
  fetchApi<ProfileDetailResponse>(
    `/api/public/career/profiles/${encodeURIComponent(email)}`,
    {
      method: "GET",
    },
  );

export const fetchProfileCreate = (req: CreateProfileRequest) =>
  fetchApi<ProfileDetailResponse, CreateProfileRequest>(
    `/api/admin/career/profiles`,
    { method: "POST", body: req },
  );

export const fetchProfileUpdate = (
  req: UpdateProfileRequest & { id: string },
) =>
  fetchApi<void, Omit<typeof req, "id">>(
    `/api/admin/career/profiles/${req.id}`,
    {
      method: "PUT",
      body: { isPublished: req.isPublished, data: req.data },
    },
  );

export const fetchProfileDelete = (id: string) =>
  fetchApi<void>(`/api/admin/career/profiles/${id}`, {
    method: "DELETE",
  });

export const fetchHasProfile = () =>
  fetchApi<{ hasProfile: boolean }>(`/api/admin/career/profiles/has-profile`);

export const fetchProfileCheckEmail = (email: string) =>
  fetchApi<{ ok: boolean; available: boolean; message?: string }>(
    `/api/admin/career/profiles/check-email?email=${encodeURIComponent(email)}`,
  );

// Project

export const fetchProjectCreate = (req: CreateProjectRequest) =>
  fetchApi<ProjectDetailResponse, CreateProjectRequest>(
    `/api/admin/career/projects`,
    { method: "POST", body: req },
  );

export const fetchProjectUpdate = (req: UpdateProjectRequest) =>
  fetchApi<void, UpdateProjectRequest>(
    `/api/admin/career/projects/${encodeURIComponent(req.id)}`,
    { method: "PUT", body: req },
  );

export const fetchProjectDelete = (id: string) =>
  fetchApi<void>(`/api/admin/career/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

export const fetchProjectDetail = (id: string) =>
  fetchApi<ProjectDetailResponse>(
    `/api/public/career/projects/${encodeURIComponent(id)}`,
    {
      method: "GET",
    },
  );
