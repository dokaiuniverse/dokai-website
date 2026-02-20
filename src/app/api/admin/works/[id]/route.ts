import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { Work } from "@domain/work";

type WorkUpsertRequest = {
  slug: string;
  isPublished: boolean;
  data: Work;
  fixedAt?: string | null;
};

/**
 * @openapi
 * /api/admin/works/{id}:
 *   put:
 *     tags:
 *       - Works
 *     summary: Update work (admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkUpsertRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkDetailResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *   delete:
 *     tags:
 *       - Works
 *     summary: Delete work (admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const supabase = createSupabaseAdminClient();

  let body: WorkUpsertRequest;
  try {
    body = (await req.json()) as WorkUpsertRequest;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.slug || typeof body.slug !== "string") {
    return NextResponse.json({ message: "slug is required" }, { status: 400 });
  }
  if (typeof body.isPublished !== "boolean") {
    return NextResponse.json(
      { message: "isPublished is required" },
      { status: 400 },
    );
  }
  if (!body.data || typeof body.data !== "object") {
    return NextResponse.json({ message: "data is required" }, { status: 400 });
  }

  const fixedAt =
    body.fixedAt === undefined || body.fixedAt === null || body.fixedAt === ""
      ? null
      : body.fixedAt;

  const { data, error } = await supabase
    .from("works")
    .update({
      slug: body.slug,
      data: body.data,
      is_published: body.isPublished,
      fixed_at: fixedAt,
    })
    .eq("id", id)
    .select("id, slug, data, is_published, fixed_at, updated_at")
    .maybeSingle();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json({ message: error.message }, { status });
  }
  if (!data) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    slug: data.slug,
    isPublished: data.is_published,
    data: {
      ...data.data,
      fixedAt: data.fixed_at ? new Date(data.fixed_at).toISOString() : null,
    },
    updatedAt: data.updated_at,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const supabase = createSupabaseAdminClient();

  const { error, count } = await supabase
    .from("works")
    .delete({ count: "exact" })
    .eq("id", id);

  console.log(id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  if ((count ?? 0) === 0) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
