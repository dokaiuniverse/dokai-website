export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import AboutPageClient from "./page-client";
import { fetchAbout } from "@controllers/about/fetch";

const AdminAboutPage = async () => {
  const about = await fetchAbout();
  return <AboutPageClient aboutInfo={about.data} />;
};

export default AdminAboutPage;
