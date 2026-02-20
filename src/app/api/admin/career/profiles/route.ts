import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";
import { Profile } from "@domain/careers";

/**
 * @openapi
 * /api/admin/career/profiles:
 *   post:
 *     tags:
 *       - CareerAdmin
 *     summary: Create profile (admin/staff; staff can create only own)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareerCreateProfileRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileDetailResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const admin = createSupabaseAdminClient();

  const body = (await req.json()) as {
    isPublished: boolean;
    data: Profile; // Profile
  };

  const email = (body?.data?.email ?? "").toString();
  if (!email) {
    return auth.applyCookies(
      NextResponse.json({ message: "data.email is required" }, { status: 400 }),
    );
  }

  if (
    auth.role === "staff" &&
    (auth.user.email ?? "").toLowerCase() !== email.toLowerCase()
  ) {
    return auth.applyCookies(
      NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    );
  }

  const { data, error } = await admin
    .from("career_profiles")
    .insert({
      email,
      data: body.data,
      is_published: !!body.isPublished,
    })
    .select("email, data, is_published, updated_at")
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status }),
    );
  }

  return auth.applyCookies(
    NextResponse.json(
      {
        isPublished: !!data.is_published,
        data: { ...data.data, projects: [] },
        updatedAt: data.updated_at,
      },
      { status: 201 },
    ),
  );
}
