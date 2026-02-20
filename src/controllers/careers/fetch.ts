import { Profile } from "@domain/careers";
import {
  CreateProfileRequest,
  ProfileDetailResponse,
  ProfileListResponse,
  UpdateProfileRequest,
} from "./types";
import { notFound } from "next/navigation";

export const fetchProfileCreate = async ({
  isPublished,
  data,
}: CreateProfileRequest): Promise<void> => {
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
};

export const fetchProfileUpdate = async ({
  email,
  isPublished,
  data,
}: UpdateProfileRequest & {
  email: string;
}): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/profiles/${encodeURIComponent(email)}`,
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

export const fetchProfileDelete = async (email: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/career/profiles/${encodeURIComponent(email)}`,
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
