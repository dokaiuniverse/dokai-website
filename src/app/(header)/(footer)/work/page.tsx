import { Metadata } from "next";
import WorkPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Works",
};

const WorkPage = async () => {
  return <WorkPageClient />;
};

export default WorkPage;
