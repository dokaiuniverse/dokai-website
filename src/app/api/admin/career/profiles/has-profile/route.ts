import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";

/**
 * @openapi
 * /api/admin/works/{id}/fix:
 *   patch:
 *     tags:
 *       - Works
 *     summary: Update fixed_at to now() (admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixWorkResponse'
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
export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const { data, error } = await supabase
    .from("career_profiles")
    .select("email, data, is_published, updated_at")
    .eq("email", auth.user?.email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(data ? { email: data.email } : false);
}
