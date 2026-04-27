import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NewsDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { newsQueryKeys } from "@controllers/news/keys";
import { notFound } from "next/navigation";
import { newsQueriesServer } from "@controllers/news/query.server";
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

  await prefetchAppQuery(qc, newsQueriesServer.newsDetail(slug));

  const news = await qc.getQueryData<{
    data: {
      title?: string;
      summary?: string;
      thumbnail?: {
        src?: string;
      };
    };
  }>(newsQueryKeys.newsDetail(slug));

  if (!news) {
    return {
      title: "News Not Found",
      openGraph: {
        title: createMetaTitle("News Not Found"),
      },
      twitter: {
        title: createMetaTitle("News Not Found"),
      },
    };
  }

  const title = news.data.title ?? "News";
  const metaTitle = createMetaTitle(title);
  const description = news.data.summary ?? DEFAULT_DESCRIPTION;
  const image = news.data.thumbnail?.src ?? DEFAULT_OG_IMAGE;

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

const NewsDetailPage = async ({ params }: Props) => {
  const slug = decodeURIComponent((await params).slug);

  const qc = getQueryClient();

  await prefetchAppQuery(qc, newsQueriesServer.newsDetail(slug));

  const exist = await qc.getQueryData(newsQueryKeys.newsDetail(slug));

  if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NewsDetailPageClient slug={slug} />
    </HydrationBoundary>
  );
};

export default NewsDetailPage;
