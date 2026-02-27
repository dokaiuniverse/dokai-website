import { Work, WorkCard, WorkCategory } from "@domain/work";

export type WorkListResponse = {
  items: WorkCard[];
  hasNext: boolean;
  page: number;
  pageSize: number;
  total: number;
};

export type WorkMode = "main" | "category" | "search";

export type FetchWorksParams = {
  mode?: WorkMode;
  page?: number; // 1-based
  pageSize?: number;
  category?: WorkCategory | "EVERYTHING";
  q?: string[]; // repeatable
};

type FetchOptions = { cookie?: string };

export async function fetchWorkList(
  {
    mode = "main",
    page = 1,
    pageSize = 12,
    category = "EVERYTHING",
    q = [],
  }: FetchWorksParams = {},
  opts: FetchOptions = {},
) {
  const sp = new URLSearchParams();
  sp.set("mode", mode);
  sp.set("page", String(page));
  sp.set("pageSize", String(pageSize));
  sp.set("category", category);

  // repeatable q
  q.filter(Boolean).forEach((v) => sp.append("q", v));

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL ?? ""
    }/api/public/works?${sp.toString()}`,
    {
      method: "GET",
      // 캐시 정책은 취향/요구사항에 맞게
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(opts?.cookie ? { cookie: opts.cookie } : {}),
      },
    },
  );

  if (res.status === 404) {
    return { items: [], hasNext: false, page: 0, pageSize: 0, total: 0 };
  }

  if (!res.ok) {
    // API가 {message}로 내려주니 최대한 활용
    let msg = `Request failed (${res.status})`;
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }

  return (await res.json()) as WorkListResponse;
}

export type WorkDetailResponse = {
  id: string;
  slug: string;
  data: Work;
  isPublished: boolean;
  updatedAt: string;
};
