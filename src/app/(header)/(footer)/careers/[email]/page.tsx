import type { Metadata } from "next";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { notFound } from "next/navigation";
import CareersDetailPageClient from "./page-client";
import { careersQueryKeys } from "@controllers/careers/keys";
import {
  createMetaTitle,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "@utils/MetaData";

type Props = {
  params: Promise<{
    email: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const email = decodeURIComponent((await params).email);

  const qc = getQueryClient();

  await prefetchAppQuery(qc, careersQueriesServer.profileDetail(email));

  const profile = await qc.getQueryData<{
    name?: string;
    position?: string;
    role?: string;
    email?: string;
    data?: {
      name?: string;
      title?: string;
      position?: string;
      role?: string;
      summary?: string;
      description?: string;
      thumbnail?: {
        src?: string;
      };
      profileImage?: {
        src?: string;
      };
      image?: {
        src?: string;
      };
    };
  }>(careersQueryKeys.profileDetail(email));

  if (!profile) {
    return {
      title: "Career Profile Not Found",
      openGraph: {
        title: createMetaTitle("Career Profile Not Found"),
      },
      twitter: {
        title: createMetaTitle("Career Profile Not Found"),
      },
    };
  }

  const name = profile.data?.name ?? profile.name ?? email;

  const position =
    profile.data?.position ??
    profile.data?.role ??
    profile.position ??
    profile.role;

  const title = position ? `${name} - ${position}` : name;
  const metaTitle = createMetaTitle(title);

  const description =
    profile.data?.summary ?? profile.data?.description ?? DEFAULT_DESCRIPTION;

  const image =
    profile.data?.profileImage?.src ??
    profile.data?.thumbnail?.src ??
    profile.data?.image?.src ??
    DEFAULT_OG_IMAGE;

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

const CareersDetailPage = async ({ params }: Props) => {
  const email = decodeURIComponent((await params).email);

  const qc = getQueryClient();

  await prefetchAppQuery(qc, careersQueriesServer.profileDetail(email));

  const exist = await qc.getQueryData(careersQueryKeys.profileDetail(email));

  if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CareersDetailPageClient email={email} />
    </HydrationBoundary>
  );
};

export default CareersDetailPage;
