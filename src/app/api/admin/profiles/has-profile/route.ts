import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { decodeEmailParam } from "@utils/Email";

/**
 * @openapi
 * /api/admin/profiles/has-profile:
 *   patch:
 *     tags:
 *       - Profiles
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
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: u, error: uErr } = await supabase.auth.getUser();
  if (uErr || !u.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const myEmail = decodeEmailParam(u.user.email ?? "");
  if (!myEmail) {
    return applyCookies(
      NextResponse.json(
        { message: "email not found in session" },
        { status: 400 },
      ),
    );
  }

  const { data, error } = await supabase
    .from("career_profiles")
    .select("id")
    .eq("email", myEmail)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      email: myEmail,
      hasProfile: !!data,
    }),
  );
}
