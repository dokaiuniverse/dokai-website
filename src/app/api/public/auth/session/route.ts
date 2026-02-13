import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { tryGetRole } from "@lib/auth/tryGetRole";

/**
 * @openapi
 * /api/public/auth/session:
 *   get:
 *     tags: [Auth]
 *     summary: Get current session status (logged-in or not)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [loggedIn]
 *               properties:
 *                 loggedIn: { type: boolean }
 *                 email: { type: string, nullable: true }
 *                 role:
 *                   type: string
 *                   nullable: true
 *                   description: "admin | staff | null"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const email = data.user?.email ?? null;
  if (!email) {
    return applyCookies(
      NextResponse.json({ loggedIn: false, email: null, role: null }),
    );
  }

  const role = await tryGetRole(req);

  return applyCookies(
    NextResponse.json({
      loggedIn: true,
      email,
      role: role ?? null,
    }),
  );
}
