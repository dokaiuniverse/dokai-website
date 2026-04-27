import ContactPageClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return <ContactPageClient />;
};

export default ContactPage;
