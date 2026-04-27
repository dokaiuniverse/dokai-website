import { Metadata } from "next";
import NewsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "News",
};

const NewsPage = async () => {
  return <NewsPageClient />;
};

export default NewsPage;
