import { About } from "@domain/about";

type AboutPageResponse = {
  data: About;
  updatedAt: string | null;
};

export const fetchAbout = async (): Promise<AboutPageResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/about`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 404) {
    return { data: { intro: "", contents: [] }, updatedAt: null };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch about: ${res.status}`);
  }

  return res.json();
};

export const fetchAboutUpdate = async (data: About): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/about`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        isPublished: true,
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to update about: ${res.status}`);
  }
};
