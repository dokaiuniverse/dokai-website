import { Profile } from "@domain/careers";
import {
  CreateProfileRequest,
  CreateProjectRequest,
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
  UpdateProfileRequest,
  UpdateProjectRequest,
} from "./types";
import { notFound } from "next/navigation";

export const fetchProfileCreate = async ({
  isPublished,
  data,
}: CreateProfileRequest): Promise<ProfileDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/profiles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPublished,
        data,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create profile: ${res.status}`);
  }

  return await res.json();
};

export const fetchProfileUpdate = async ({
  id,
  isPublished,
  data,
}: UpdateProfileRequest & {
  id: string;
}): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/profiles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPublished,
        data,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.status}`);
  }
};

export const fetchProfileDelete = async (id: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/profiles/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to delete profile: ${res.status}`);
  }

  return;
};

export const fetchProfileList = async (): Promise<ProfileListResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/career/profiles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch profile list: ${res.status}`);
  }

  return res.json();
};

export const fetchProfileDetail = async (
  email: string,
  opts?: { cookie?: string },
): Promise<ProfileDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/career/profiles/${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(opts?.cookie ? { cookie: opts.cookie } : {}),
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch profile detail: ${res.status}`);
  }

  return res.json();
};

export const fetchHasProfile = async (): Promise<{ email: string } | false> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/profiles/has-profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch has profile: ${res.status}`);
  }

  return res.json();
};

// Project

export const fetchProjectCreate = async ({
  ownerEmail,
  isPublished,
  data,
}: CreateProjectRequest): Promise<ProjectDetailResponse> => {
  console.log(ownerEmail, isPublished, data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerEmail,
        isPublished,
        data,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create project: ${res.status}`);
  }

  return await res.json();
};

export const fetchProjectUpdate = async ({
  id,
  isPublished,
  data,
}: UpdateProjectRequest): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/projects/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPublished,
        data,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to update project: ${res.status}`);
  }
};

export const fetchProjectDelete = async (id: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/projects/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to delete project: ${res.status}`);
  }

  return;
};

export const fetchProjectDetail = async (
  id: string,
  opts?: { cookie?: string },
): Promise<ProjectDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/career/projects/${encodeURIComponent(id)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(opts?.cookie ? { cookie: opts.cookie } : {}),
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch project detail: ${res.status}`);
  }

  return res.json();
};
