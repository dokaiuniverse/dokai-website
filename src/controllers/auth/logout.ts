import { createSupabaseBrowserClient } from "@lib/supabase/browser";

export const handleLogout = async () => {
  const supabase = createSupabaseBrowserClient();
  await supabase.auth.signOut();
  window.location.href = "/auth/login";
};
