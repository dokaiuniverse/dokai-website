import { Metadata } from "next";
import CareersPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Careers",
};

const CareersPage = async () => {
  return <CareersPageClient />;
};

export default CareersPage;
