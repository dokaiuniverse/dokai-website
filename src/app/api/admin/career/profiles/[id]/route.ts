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
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const admin = createSupabaseAdminClient();

  if (auth.role === "staff") {
    const { data: target, error: targetErr } = await admin
      .from("career_profiles")
      .select("email")
      .eq("id", id)
      .maybeSingle();

    if (targetErr) {
      return auth.applyCookies(
        NextResponse.json({ message: targetErr.message }, { status: 500 }),
      );
    }
    if (!target) {
      return auth.applyCookies(
        NextResponse.json({ message: "Not Found" }, { status: 404 }),
      );
    }

    const me = (auth.user.email ?? "").toLowerCase();
    const owner = (target.email ?? "").toLowerCase();
    if (!me || me !== owner) {
      return auth.applyCookies(
        NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      );
    }
  }

  const body = (await req.json()) as { isPublished?: boolean; data?: Profile };

  // email 변경은 권장하지 않음(참조/소유권/FK 문제). 필요하면 별도 endpoint로 분리 추천.
  if (body?.data?.email) {
    const { data: current, error: currErr } = await admin
      .from("career_profiles")
      .select("email")
      .eq("id", id)
      .maybeSingle();

    if (currErr) {
      return auth.applyCookies(
        NextResponse.json({ message: currErr.message }, { status: 500 }),
      );
    }
    if (!current) {
      return auth.applyCookies(
        NextResponse.json({ message: "Not Found" }, { status: 404 }),
      );
    }

    if (
      (body.data.email ?? "").toLowerCase() !==
      (current.email ?? "").toLowerCase()
    ) {
      return auth.applyCookies(
        NextResponse.json(
          { message: "Email change is not allowed" },
          { status: 400 },
        ),
      );
    }
  }

  const patch: { data?: Profile; is_published?: boolean } = {};
  if (body.data) patch.data = body.data;
  if (typeof body.isPublished === "boolean")
    patch.is_published = body.isPublished;

  const { data, error } = await admin
    .from("career_profiles")
    .update(patch)
    .eq("id", id)
    .select("id, email, data, is_published, updated_at")
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
      id: data.id,
      isPublished: !!data.is_published,
      data: { ...data.data, projects: [] },
      updatedAt: data.updated_at,
    }),
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const admin = createSupabaseAdminClient();

  // staff는 본인만 삭제 가능하게 유지하려면 target row email 확인
  if (auth.role === "staff") {
    const { data: target, error: targetErr } = await admin
      .from("career_profiles")
      .select("email")
      .eq("id", id)
      .maybeSingle();

    if (targetErr) {
      return auth.applyCookies(
        NextResponse.json({ message: targetErr.message }, { status: 500 }),
      );
    }
    if (!target) {
      return auth.applyCookies(
        NextResponse.json({ message: "Not Found" }, { status: 404 }),
      );
    }

    const me = (auth.user.email ?? "").toLowerCase();
    const owner = (target.email ?? "").toLowerCase();
    if (!me || me !== owner) {
      return auth.applyCookies(
        NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      );
    }
  }

  const { error, count } = await admin
    .from("career_profiles")
    .delete({ count: "exact" })
    .eq("id", id);

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
