import { Metadata } from "next";
import AboutPageClient from "./client";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = async () => {
  return <AboutPageClient />;
};

export default AboutPage;
