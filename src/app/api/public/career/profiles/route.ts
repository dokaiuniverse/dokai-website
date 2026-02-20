import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { getOptionalRole } from "@lib/auth/optionalRole";

/**
 * @openapi
 * /api/public/career/profiles:
 *   get:
 *     tags:
 *       - Career
 *     summary: List career profiles (public; admin/staff can see more)
 *     description: "Public: published only. Admin: all. Staff: published + own profile."
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileListResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(req: NextRequest) {
  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);
  const { user, role } = await getOptionalRole(req);

  // anon: RLS로 published만
  if (!user || !role) {
    const { data, error } = await routeSupabase
      .from("career_profiles")
      .select("email, data")
      .order("updated_at", { ascending: false });

    if (error) {
      return applyCookies(
        NextResponse.json({ message: error.message }, { status: 500 }),
      );
    }

    const items =
      data?.map((row) => ({
        email: row.email as string,
        avatar: row.data?.avatar ?? null,
      })) ?? [];

    return applyCookies(NextResponse.json({ items }));
  }

  // privileged: service_role로 조회 후 범위 제한
  const admin = createSupabaseAdminClient();

  let query = admin
    .from("career_profiles")
    .select("email, data, is_published")
    .order("updated_at", { ascending: false });

  if (role === "staff") {
    const myEmail = (user.email ?? "").toLowerCase();
    query = query.or(`is_published.eq.true,email.ilike.${myEmail}`);
  }

  const { data, error } = await query;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const items =
    data?.map((row) => ({
      email: row.email as string,
      avatar: row.data?.avatar ?? null,
      name: row.data?.name ?? "",
      role: row.data?.role ?? "",
    })) ?? [];

  return applyCookies(NextResponse.json({ items }));
}
