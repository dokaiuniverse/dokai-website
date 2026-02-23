import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";
import { Project } from "@domain/careers";

/**
 * @openapi
 * /api/admin/career/projects:
 *   post:
 *     tags:
 *       - CareerAdmin
 *     summary: Create project (admin/staff; staff can create only own)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareerCreateProjectRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProjectDetailResponse'
 */
export async function POST(req: NextRequest) {
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const body = (await req.json()) as {
    ownerEmail: string;
    isPublished: boolean;
    data: Project; // Project without id (권장)
  };

  const ownerEmail = (body?.ownerEmail ?? "").toString();
  if (!ownerEmail) {
    return auth.applyCookies(
      NextResponse.json({ message: "ownerEmail is required" }, { status: 400 }),
    );
  }

  if (
    auth.role === "staff" &&
    (auth.user.email ?? "").toLowerCase() !== ownerEmail.toLowerCase()
  ) {
    return auth.applyCookies(
      NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    );
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("career_projects")
    .insert({
      owner_email: ownerEmail,
      data: body.data,
      is_published: !!body.isPublished,
    })
    .select("id, owner_email, data, is_published, updated_at")
    .single();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return auth.applyCookies(
    NextResponse.json(
      {
        id: data.id,
        isPublished: !!data.is_published,
        data: { ...data.data, id: data.id },
        updatedAt: data.updated_at,
      },
      { status: 201 },
    ),
  );
}
