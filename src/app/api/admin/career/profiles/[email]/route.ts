import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";
import { Profile } from "@domain/careers";

/**
 * @openapi
 * /api/admin/career/profiles/{email}:
 *   put:
 *     tags:
 *       - CareerAdmin
 *     summary: Update profile (admin/staff; staff can update only own)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareerUpdateProfileRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileDetailResponse'
 *   delete:
 *     tags:
 *       - CareerAdmin
 *     summary: Delete profile (admin/staff; staff can delete only own)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '204':
 *         description: No Content
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const email = (await params).email;
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const targetEmail = decodeURIComponent(email);
  if (
    auth.role === "staff" &&
    (auth.user.email ?? "").toLowerCase() !== targetEmail.toLowerCase()
  ) {
    return auth.applyCookies(
      NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    );
  }

  const body = (await req.json()) as { isPublished?: boolean; data?: Profile };

  // email 변경은 권장하지 않음(참조/소유권/FK 문제). 필요하면 별도 endpoint로 분리 추천.
  if (
    body?.data?.email &&
    body.data.email.toLowerCase() !== targetEmail.toLowerCase()
  ) {
    return auth.applyCookies(
      NextResponse.json(
        { message: "Email change is not allowed" },
        { status: 400 },
      ),
    );
  }

  const admin = createSupabaseAdminClient();
  const patch: { data?: Profile; is_published?: boolean } = {};
  if (body.data) patch.data = body.data;
  if (typeof body.isPublished === "boolean")
    patch.is_published = body.isPublished;

  const { data, error } = await admin
    .from("career_profiles")
    .update(patch)
    .eq("email", targetEmail)
    .select("email, data, is_published, updated_at")
    .maybeSingle();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }
  if (!data) {
    return auth.applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  // projects는 별도 조회(필요 시)
  return auth.applyCookies(
    NextResponse.json({
      isPublished: !!data.is_published,
      data: { ...data.data, projects: [] },
      updatedAt: data.updated_at,
    }),
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const email = (await params).email;
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const targetEmail = decodeURIComponent(email);
  if (
    auth.role === "staff" &&
    (auth.user.email ?? "").toLowerCase() !== targetEmail.toLowerCase()
  ) {
    return auth.applyCookies(
      NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    );
  }

  const admin = createSupabaseAdminClient();
  const { error, count } = await admin
    .from("career_profiles")
    .delete({ count: "exact" })
    .eq("email", targetEmail);

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }
  if ((count ?? 0) === 0) {
    return auth.applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return auth.applyCookies(new NextResponse(null, { status: 204 }));
}
