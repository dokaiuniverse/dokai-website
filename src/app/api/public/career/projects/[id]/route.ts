import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { getOptionalRole } from "@lib/auth/optionalRole";

/**
 * @openapi
 * /api/public/career/projects/{id}:
 *   get:
 *     tags:
 *       - Career
 *     summary: Get project detail by id (public; admin/staff can see more)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProjectDetailResponse'
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
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const projectId = decodeURIComponent(id);

  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);
  const { user, role } = await getOptionalRole(req);

  // anon: RLS로 published만
  if (!user || !role) {
    const { data, error } = await routeSupabase
      .from("career_projects")
      .select("id, data, is_published, updated_at")
      .eq("id", projectId)
      .maybeSingle();

    if (error) {
      return applyCookies(
        NextResponse.json({ message: error.message }, { status: 500 }),
      );
    }
    if (!data || !data.is_published) {
      return applyCookies(
        NextResponse.json({ message: "Not Found" }, { status: 404 }),
      );
    }

    return applyCookies(
      NextResponse.json({
        isPublished: true,
        data: { ...data.data, id: data.id },
        updatedAt: data.updated_at,
      }),
    );
  }

  // privileged: service_role로 조회 + staff 소유권 검사
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("career_projects")
    .select("id, owner_email, data, is_published, updated_at")
    .eq("id", projectId)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }
  if (!data) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  const myEmailLower = (user.email ?? "").toLowerCase();
  const isOwner =
    role === "staff" &&
    (data.owner_email as string).toLowerCase() === myEmailLower;

  if (role === "staff" && !isOwner && !data.is_published) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      isPublished: !!data.is_published,
      data: { ...data.data, id: data.id },
      updatedAt: data.updated_at,
    }),
  );
}
