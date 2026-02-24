import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { createSupabaseServerClient } from "@lib/supabase/server";
import { Role } from "./types";

const initialSessionContext = {
  user: null,
  role: null,
  isPrivileged: false,
};

export async function getSessionContext() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) return initialSessionContext;

  const user = data.user;
  if (!user) return initialSessionContext;

  const admin = createSupabaseAdminClient();

  const { data: allowed, error: aErr } = await admin
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (aErr) {
    return {
      ...initialSessionContext,
      user,
    };
  }

  const role = (allowed?.role as Role | undefined) ?? null;

  return {
    ...initialSessionContext,
    user,
    role,
    isPrivileged: role === "admin" || role === "staff",
  };
}
