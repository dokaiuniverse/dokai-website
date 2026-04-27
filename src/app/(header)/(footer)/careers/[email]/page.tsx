import type { Metadata } from "next";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { notFound } from "next/navigation";
import CareersDetailPageClient from "./page-client";
import { careersQueryKeys } from "@controllers/careers/keys";

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
    };
  }

  const name = profile.data?.name ?? profile.name ?? email;
  const position =
    profile.data?.position ??
    profile.data?.role ??
    profile.position ??
    profile.role;

  const title = position ? `${name} - ${position}` : name;

  const description =
    profile.data?.summary ??
    profile.data?.description ??
    "DOKAI UNIVERSE Career Profile";

  const image =
    profile.data?.profileImage?.src ??
    profile.data?.thumbnail?.src ??
    profile.data?.image?.src ??
    "/dokai-og-image.png";

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
