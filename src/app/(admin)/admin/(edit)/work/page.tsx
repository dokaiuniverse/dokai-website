import { fetchWorkDetail } from "@controllers/work/fetch";
import AdminWorkPageClient from "./page-client";
import { cookies } from "next/headers";

const AdminWorkPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { slug } = await searchParams;

  const cookieStore = await cookies(); // ✅ 여기
  const cookie = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const workDetail = slug
    ? await fetchWorkDetail(slug as string, { cookie })
    : undefined;

  return <AdminWorkPageClient workDetail={workDetail} />;
};

export default AdminWorkPage;
