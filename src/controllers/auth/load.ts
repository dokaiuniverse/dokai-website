import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { createSupabaseServerClient } from "@lib/supabase/server";
import { SessionStatus } from "./types";

export const loadSessionStatus = async (): Promise<SessionStatus> => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { email: null, role: null, loggedIn: false };
    }

    const user = data.user;
    const userEmail = user?.email ?? null;
    if (!user) return { email: null, role: null, loggedIn: false };

    const admin = createSupabaseAdminClient();
    const { data: roleRow, error: roleErr } = await admin
      .from("allowed_users")
      .select("role, email")
      .eq("user_id", user.id)
      .maybeSingle();

    if (roleErr || !roleRow) {
      return { email: userEmail, role: null, loggedIn: true };
    }

    const role = roleRow.role ?? null;
    const email = roleRow.email ?? userEmail ?? null;

    return { email, role, loggedIn: true };
  } catch (e) {
    // ✅ 어떤 예외든 "로그인 안됨"으로 안전하게
    return {
      email: null,
      role: null,
      loggedIn: false,
    };
  }
};
