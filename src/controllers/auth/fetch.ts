import { createSupabaseBrowserClient } from "@lib/supabase/browser";
import { fetchApi } from "../common";
import { SessionStatus } from "./types";

export const fetchSessionStatus = () =>
  fetchApi<SessionStatus>(`/api/public/auth/session`, {
    method: "GET",
  });

export const fetchLogout = async () => {
  const supabase = createSupabaseBrowserClient();
  await supabase.auth.signOut();
};
