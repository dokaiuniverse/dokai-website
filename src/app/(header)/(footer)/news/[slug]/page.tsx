import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NewsDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { newsQueryKeys } from "@controllers/news/keys";
import { notFound } from "next/navigation";
import { newsQueriesServer } from "@controllers/news/query.server";

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
    };
  }

  const title = news.data.title ?? "News";
  const description =
    news.data.summary ?? "Image Beyond AI. Create with Humanity";
  const image = news.data.thumbnail?.src ?? "/dokai-og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
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
