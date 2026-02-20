import { cookies } from "next/headers";
import AdminCareersPageClient from "./page-client";
import { fetchProfileDetail } from "@controllers/careers/fetch";

const AdminCareersPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { email } = await searchParams;

  const cookieStore = await cookies(); // ✅ 여기
  const cookie = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const profileDetail = email
    ? await fetchProfileDetail(email as string, { cookie })
        .then((res) => res.data)
        .catch(() => undefined)
    : undefined;

  return <AdminCareersPageClient profileDetail={profileDetail} />;
};

export default AdminCareersPage;
