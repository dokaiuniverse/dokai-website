import type { Metadata } from "next";
import WorkDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { worksQueriesServer } from "@controllers/works/query.server";
import { worksQueryKeys } from "@controllers/works/keys";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createMetaTitle,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "@utils/MetaData";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug);

  const qc = getQueryClient();

  await prefetchAppQuery(qc, worksQueriesServer.workDetail(slug));

  const work = await qc.getQueryData<{
    data: {
      title?: string;
      summary?: string;
      thumbnail?: {
        src?: string;
      };
    };
  }>(worksQueryKeys.workDetail(slug));

  if (!work) {
    return {
      title: "Work Not Found",
      openGraph: {
        title: createMetaTitle("Work Not Found"),
      },
      twitter: {
        title: createMetaTitle("Work Not Found"),
      },
    };
  }

  const title = work.data.title ?? "Work";
  const metaTitle = createMetaTitle(title);
  const description = work.data.summary ?? DEFAULT_DESCRIPTION;
  const image = work.data.thumbnail?.src ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title: metaTitle,
      description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: image,
    },
  };
}

const WorkDetailPage = async ({ params }: Props) => {
  const slug = decodeURIComponent((await params).slug);

  const qc = getQueryClient();

  await prefetchAppQuery(qc, worksQueriesServer.workDetail(slug));

  const exist = await qc.getQueryData(worksQueryKeys.workDetail(slug));

  if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <WorkDetailPageClient slug={slug} />
    </HydrationBoundary>
  );
};

export default WorkDetailPage;
