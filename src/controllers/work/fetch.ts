import { Work, WorkCard } from "@domain/work";
import { notFound } from "next/navigation";

// export const fetchAbout = async (): Promise<AboutPageResponse> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/about`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );

//   if (res.status === 404) {
//     return { data: { intro: "", contents: [] }, updatedAt: null };
//   }

//   if (!res.ok) {
//     throw new Error(`Failed to fetch about: ${res.status}`);
//   }

//   return res.json();
// };

export type WorkListResponse = {
  items: WorkCard[];
  hasNext: boolean;
  page: number;
  pageSize: number;
  total: number;
};

export const fetchWorkList = async (
  page: number,
  pageSize: number,
): Promise<WorkListResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/works?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 404) {
    return { items: [], hasNext: false, page: 0, pageSize: 0, total: 0 };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch works: ${res.status}`);
  }

  return res.json();
};

export type WorkDetailResponse = {
  id: string;
  slug: string;
  data: Work;
  isPublished: boolean;
  updatedAt: string;
};

export const fetchWorkDetail = async (
  slug: string,
  opts?: { cookie?: string },
): Promise<WorkDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/works/${slug}`,
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
    throw new Error(`Failed to fetch work: ${res.status}`);
  }

  const data = await res.json();
  data.data.publishedAt = new Date(data.data.publishedAt)
    .getFullYear()
    .toString();
  return data;
};

export const fetchWorkCreate = async (
  slug: string,
  isPublished: boolean,
  data: Work,
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/works`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        isPublished,
        data: {
          ...data,
          publishedAt: new Date(data.publishedAt).toISOString(),
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create work: ${res.status}`);
  }
};

export const fetchWorkDelete = async (id: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/works/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to delete work: ${res.status}`);
  }
};

export const fetchWorkUpdate = async (
  id: string,
  slug: string,
  isPublished: boolean,
  data: Work,
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/works/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        isPublished,
        data: {
          ...data,
          publishedAt: new Date(data.publishedAt).toISOString(),
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to update work: ${res.status}`);
  }
};
