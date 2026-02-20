import { NextResponse, type NextRequest } from "next/server";
import { getOptionalRole } from "@lib/auth/optionalRole";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

/**
 * @openapi
 * /api/public/works/{slug}:
 *   get:
 *     tags:
 *       - Works
 *     summary: Get work detail by slug (public, published only)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkDetailResponse'
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
  { params }: { params: Promise<{ slug: string }> },
) {
  const {
    isPrivileged,
    supabase: routeSupabase,
    applyCookies,
  } = await getOptionalRole(req);

  const supabase = isPrivileged ? createSupabaseAdminClient() : routeSupabase;

  const slug = (await params).slug;

  const { data, error } = await supabase
    .from("works")
    .select("id, slug, data, is_published, fixed_at, published_at, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  if (!data || (!isPrivileged && !data.is_published)) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      id: data.id,
      slug: data.slug,
      isPublished: data.is_published,
      data: {
        ...data.data,
        fixedAt: data.fixed_at ? new Date(data.fixed_at).toISOString() : null,
      },
      updatedAt: data.updated_at,
    }),
  );
}
