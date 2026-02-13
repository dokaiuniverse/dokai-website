import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SessionStatus } from "./session.type";

export async function getSessionStatusServer(): Promise<SessionStatus> {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll: () => {}, // 읽기만
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;

  return { loggedIn: !!email, email, role: null };
}
