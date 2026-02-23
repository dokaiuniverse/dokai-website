import AboutPageClient from "./client";
import { createSupabaseServerReadOnlyClient } from "@lib/supabase/server";
import { notFound } from "next/navigation";

const AboutPage = async () => {
  const supabase = await createSupabaseServerReadOnlyClient();

  const { data: about, error } = await supabase
    .from("about_page")
    .select("id, data, is_published, updated_at")
    .eq("id", "main")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!about || !about.is_published) notFound();

  return <AboutPageClient aboutInfo={about.data} />;
};

export default AboutPage;
