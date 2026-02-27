import type { WorkDetailResponse, WorkUpsertRequest } from "./types";
import { fetchApi } from "../common";

export const fetchWorkDetail = (slug: string) =>
  fetchApi<WorkDetailResponse>(
    `/api/public/works/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );

export const fetchWorkCheckSlug = (slug: string) =>
  fetchApi<{ exists: boolean }>(
    `/api/admin/works/check-slug?slug=${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );

export const fetchWorkCreate = (body: WorkUpsertRequest) =>
  fetchApi<{ workId: string }, WorkUpsertRequest>("/api/admin/works", {
    method: "POST",
    body: body,
  });

export const fetchWorkUpdate = (id: string, body: WorkUpsertRequest) =>
  fetchApi<void, WorkUpsertRequest>(`/api/admin/works/${id}`, {
    method: "PUT",
    body: body,
  });

export const fetchWorkDelete = (id: string) =>
  fetchApi<void>(`/api/admin/works/${id}`, {
    method: "DELETE",
  });
