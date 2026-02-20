import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import CareersDetailPageClient from "./client";
import { cookies } from "next/headers";
import { fetchProfileDetail } from "@controllers/careers/fetch";

const CareersDetailPage = async ({
  params,
}: {
  params: Promise<{ email: string }>;
}) => {
  const { email } = await params;
  const cookieStore = await cookies(); // ✅ 여기
  const cookie = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const profileDetail = await fetchProfileDetail(email, { cookie });

  return (
    <>
      <CareersDetailPageClient profileDetail={profileDetail.data} />
      <AdminButtons
        adminButtons={[
          {
            role: "STAFF",
            type: "EDIT",
            click: {
              type: "HREF",
              href: `/admin/careers?email=${encodeURIComponent(email)}`,
            },
            email: decodeURIComponent(email),
          },
        ]}
      />
    </>
  );
};

export default CareersDetailPage;
