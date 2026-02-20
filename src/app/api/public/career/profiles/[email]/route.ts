import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { getOptionalRole } from "@lib/auth/optionalRole";

/**
 * @openapi
 * /api/public/career/profiles/{email}:
 *   get:
 *     tags:
 *       - Career
 *     summary: Get profile detail by email (public; admin/staff can see more)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileDetailResponse'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const email = (await params).email;
  const targetEmail = decodeURIComponent(email);
  const targetEmailLower = targetEmail.toLowerCase();

  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);
  const { user, role } = await getOptionalRole(req);

  // anon: RLS로 profile published만
  if (!user || !role) {
    const { data: profile, error: pErr } = await routeSupabase
      .from("career_profiles")
      .select("email, data, is_published, updated_at")
      .eq("email", targetEmail)
      .maybeSingle();

    if (pErr) {
      return applyCookies(
        NextResponse.json({ message: pErr.message }, { status: 500 }),
      );
    }
    if (!profile || !profile.is_published) {
      return applyCookies(
        NextResponse.json({ message: "Not Found" }, { status: 404 }),
      );
    }

    // projects도 RLS로 published만
    const { data: projects, error: prErr } = await routeSupabase
      .from("career_projects")
      .select("id, data")
      .eq("owner_email", targetEmail)
      .order("updated_at", { ascending: false });

    if (prErr) {
      return applyCookies(
        NextResponse.json({ message: prErr.message }, { status: 500 }),
      );
    }

    const projectCards =
      projects?.map((row) => ({
        id: row.id as string,
        title: row.data?.title ?? "",
        thumbnail: row.data?.thumbnail ?? null,
      })) ?? [];

    return applyCookies(
      NextResponse.json({
        isPublished: true,
        data: { ...profile.data, projects: projectCards },
        updatedAt: profile.updated_at,
      }),
    );
  }

  // privileged: service_role로 profile 조회
  const admin = createSupabaseAdminClient();
  const { data: profile, error: pErr } = await admin
    .from("career_profiles")
    .select("email, data, is_published, updated_at")
    .eq("email", targetEmail)
    .maybeSingle();

  if (pErr) {
    return applyCookies(
      NextResponse.json({ message: pErr.message }, { status: 500 }),
    );
  }
  if (!profile) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  const myEmailLower = (user.email ?? "").toLowerCase();
  const isOwner = role === "staff" && myEmailLower === targetEmailLower;

  // staff인데 소유자가 아니면 published만 허용
  if (role === "staff" && !isOwner && !profile.is_published) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  // projects 조회: admin이면 전부, staff면 (published + 본인 소유면 전부)
  let prQuery = admin
    .from("career_projects")
    .select("id, data, is_published")
    .eq("owner_email", targetEmail)
    .order("updated_at", { ascending: false });

  if (role === "staff" && !isOwner) {
    prQuery = prQuery.eq("is_published", true);
  }

  const { data: projects, error: prErr } = await prQuery;
  if (prErr) {
    return applyCookies(
      NextResponse.json({ message: prErr.message }, { status: 500 }),
    );
  }

  const projectCards =
    projects?.map((row) => ({
      id: row.id as string,
      title: row.data?.title ?? "",
      thumbnail: row.data?.thumbnail ?? null,
    })) ?? [];

  return applyCookies(
    NextResponse.json({
      isPublished: !!profile.is_published,
      data: { ...profile.data, projects: projectCards },
      updatedAt: profile.updated_at,
    }),
  );
}
