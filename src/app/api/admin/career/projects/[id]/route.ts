import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";
import { Project } from "@domain/careers";

/**
 * @openapi
 * /api/admin/career/projects/{id}:
 *   put:
 *     tags:
 *       - CareerAdmin
 *     summary: Update project (admin/staff; staff can update only own)
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
 *             $ref: '#/components/schemas/CareerUpdateProjectRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProjectDetailResponse'
 *   delete:
 *     tags:
 *       - CareerAdmin
 *     summary: Delete project (admin/staff; staff can delete only own)
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
  const { id } = await params;

  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const projectId = decodeURIComponent(id);
  const admin = createSupabaseAdminClient();

  // 소유권 확인(업데이트 전에 owner_email 확인)
  const { data: curr, error: readErr } = await admin
    .from("career_projects")
    .select("id, owner_email")
    .eq("id", projectId)
    .maybeSingle();

  if (readErr) {
    return auth.applyCookies(
      NextResponse.json({ message: readErr.message }, { status: 500 }),
    );
  }
  if (!curr) {
    return auth.applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  if (auth.role === "staff") {
    const myEmail = (auth.user.email ?? "").toLowerCase();
    if ((curr.owner_email as string).toLowerCase() !== myEmail) {
      return auth.applyCookies(
        NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      );
    }
  }

  const body = (await req.json()) as { isPublished?: boolean; data?: Project };

  const patch: { data?: Project; is_published?: boolean } = {};
  if (body.data) patch.data = body.data;
  if (typeof body.isPublished === "boolean")
    patch.is_published = body.isPublished;

  const { data, error } = await admin
    .from("career_projects")
    .update(patch)
    .eq("id", projectId)
    .select("id, data, is_published, updated_at")
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

  return auth.applyCookies(
    NextResponse.json({
      isPublished: !!data.is_published,
      data: { ...data.data, id: data.id },
      updatedAt: data.updated_at,
    }),
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const projectId = decodeURIComponent(id);
  const admin = createSupabaseAdminClient();

  // 소유권 확인
  const { data: curr, error: readErr } = await admin
    .from("career_projects")
    .select("id, owner_email")
    .eq("id", projectId)
    .maybeSingle();

  if (readErr) {
    return auth.applyCookies(
      NextResponse.json({ message: readErr.message }, { status: 500 }),
    );
  }
  if (!curr) {
    return auth.applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  if (auth.role === "staff") {
    const myEmail = (auth.user.email ?? "").toLowerCase();
    if ((curr.owner_email as string).toLowerCase() !== myEmail) {
      return auth.applyCookies(
        NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      );
    }
  }

  const { error, count } = await admin
    .from("career_projects")
    .delete({ count: "exact" })
    .eq("id", projectId);

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
