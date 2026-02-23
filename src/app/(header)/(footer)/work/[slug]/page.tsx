import { fetchWorkDetail } from "@controllers/work/fetch";
import WorkDetailPageClient from "./client";
import { cookies } from "next/headers";

const WorkDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const cookieStore = await cookies(); // ✅ 여기
  const cookie = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const workDetail = await fetchWorkDetail(slug, { cookie });

  return (
    <>
      <WorkDetailPageClient work={workDetail.data} slug={slug} />
    </>
  );
};

export default WorkDetailPage;
