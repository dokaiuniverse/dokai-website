import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { Role } from "@lib/auth/types";

/**
 * @openapi
 * /api/public/auth/session:
 *   get:
 *     tags: [Auth]
 *     summary: Get current session status (logged-in or not)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [loggedIn]
 *               properties:
 *                 loggedIn: { type: boolean }
 *                 email: { type: string, nullable: true }
 *                 role:
 *                   type: string
 *                   nullable: true
 *                   description: "admin | staff | null"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (error || !user) {
    return NextResponse.json(null);
  }

  const userEmail = user.email?.toLowerCase() ?? null;

  const { data: roleRow } = await supabase
    .from("allowed_users")
    .select("role, email")
    .eq("user_id", user.id)
    .maybeSingle();

  const role = (roleRow?.role as Role) ?? null;
  const email = roleRow?.email ?? userEmail ?? null;

  const { data: profile } = await supabase
    .from("career_profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  return applyCookies(
    NextResponse.json({
      email,
      role,
      loggedIn: true,
      hasProfile: !!profile,
    }),
  );
}
