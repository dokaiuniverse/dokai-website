import type { Metadata } from "next";
import WorkDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { worksQueriesServer } from "@controllers/works/query.server";
import { worksQueryKeys } from "@controllers/works/keys";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

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
    };
  }

  return {
    title: work.data.title,
    description: work.data.summary,
    openGraph: {
      title: work.data.title,
      description: work.data.summary,
      images: work.data.thumbnail?.src,
    },
    twitter: {
      title: work.data.title,
      description: work.data.summary,
      images: work.data.thumbnail?.src,
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
