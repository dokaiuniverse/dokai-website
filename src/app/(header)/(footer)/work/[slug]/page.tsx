import { fetchWorkDetail } from "@controllers/work/fetch";
import WorkDetailPageClient from "./client";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
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
      <WorkDetailPageClient work={workDetail.data} />
      <AdminButtons
        adminButtons={[
          {
            role: "ADMIN",
            type: "EDIT",
            click: {
              type: "HREF",
              href: `/admin/work?slug=${slug}`,
            },
          },
        ]}
      />
    </>
  );
};

export default WorkDetailPage;
