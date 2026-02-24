import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";

/**
 * @openapi
 * /api/admin/career/profiles/check-email:
 *   get:
 *     tags:
 *       - Career
 *     summary: Check if email is available (admin/staff)
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean }
 *                 available: { type: boolean }
 *                 message: { type: string }
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server Error
 */
export async function GET(req: NextRequest) {
  const supabase = createSupabaseAdminClient();

  const auth = await requireRole(req, ["admin", "staff"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const { searchParams } = new URL(req.url);
  const email = (searchParams.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { ok: false, available: false, message: "email is required" },
      { status: 400 },
    );
  }

  // (선택) 간단 이메일 포맷 체크
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return NextResponse.json(
      { ok: false, available: false, message: "invalid email" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("career_profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 },
    );
  }

  // data가 있으면 이미 존재 => 사용 불가
  const available = !data;

  return NextResponse.json({
    ok: available,
    available,
    message: available ? "available" : "already in use",
  });
}
