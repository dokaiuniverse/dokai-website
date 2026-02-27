import type {
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
  ProfileUpsertRequest,
  ProjectUpsertRequest,
} from "./types";
import { fetchApi } from "../common";
import { encodeEmailParam } from "@utils/Email";

// Profile

export const fetchProfileCreate = (req: ProfileUpsertRequest) =>
  fetchApi<{ profileId: string }, ProfileUpsertRequest>(`/api/admin/profiles`, {
    method: "POST",
    body: req,
  });

export const fetchProfileList = () =>
  fetchApi<ProfileListResponse>(`/api/public/profiles`);

export const fetchProfileDetail = (email: string) =>
  fetchApi<ProfileDetailResponse>(
    `/api/public/profiles/${encodeEmailParam(email)}`,
    {
      method: "GET",
    },
  );

export const fetchProfileUpdate = (id: string, req: ProfileUpsertRequest) =>
  fetchApi<void, ProfileUpsertRequest>(`/api/admin/profiles/${id}`, {
    method: "PATCH",
    body: req,
  });

export const fetchProfileDelete = (id: string) =>
  fetchApi<void>(`/api/admin/profiles/${id}`, {
    method: "DELETE",
  });

export const fetchHasProfile = () =>
  fetchApi<{
    email: string;
    hasProfile: boolean;
  }>(`/api/admin/profiles/has-profile`);

export const fetchProfileCheckEmail = (email: string) =>
  fetchApi<{ exists: boolean }>(
    `/api/admin/profiles/check-email?email=${encodeEmailParam(email)}`,
  );

// Project

export const fetchProjectCreate = (req: ProjectUpsertRequest) =>
  fetchApi<{ projectId: string }, ProjectUpsertRequest>(`/api/admin/projects`, {
    method: "POST",
    body: req,
  });

export const fetchProjectDetail = (id: string) =>
  fetchApi<ProjectDetailResponse>(
    `/api/public/projects/${encodeURIComponent(id)}`,
    {
      method: "GET",
    },
  );

export const fetchProjectUpdate = (id: string, req: ProjectUpsertRequest) =>
  fetchApi<void, ProjectUpsertRequest>(
    `/api/admin/projects/${encodeURIComponent(id)}`,
    { method: "PATCH", body: req },
  );

export const fetchProjectDelete = (id: string) =>
  fetchApi<void>(`/api/admin/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
