import { NextResponse, type NextRequest } from "next/server";
// TODO: 프로젝트에서 쓰는 admin client로 교체
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { Work } from "@domain/work";

type Mode = "main" | "category" | "search";

const WORK_CATEGORIES = [
  "ANIMATE",
  "BRANDING",
  "CHARACTER",
  "AWARD",
  "FILM",
  "COMMERCIAL",
  "SOCIAL_CONTENTS",
] as const;

function parseIntOr(v: string | null, fallback: number) {
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function normalizeCategory(raw: string | null) {
  if (!raw) return "ALL" as const;
  const v = raw.toUpperCase();
  if (v === "ALL") return "ALL" as const;
  if ((WORK_CATEGORIES as readonly string[]).includes(v)) {
    return v as (typeof WORK_CATEGORIES)[number];
  }
  return null;
}

function getQueryTokens(url: URL) {
  const fromRepeat = url.searchParams.getAll("q");
  const fromBracket = url.searchParams.getAll("q[]");

  const tokens = [...fromRepeat, ...fromBracket]
    .flatMap((s) => s.split(/\s+/g))
    .map((s) => s.trim())
    .filter(Boolean);

  return Array.from(new Set(tokens));
}

function buildWebsearchQueryFromTokens(tokens: string[]) {
  const cleaned = tokens
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.replace(/[():"'\\]/g, " "))
    .map((t) => t.replace(/\s+/g, " ").trim())
    .filter((t) => t.length >= 2);

  if (cleaned.length === 0) return null;
  return cleaned.join(" ");
}

type WorkUpsertRequest = {
  slug: string;
  isPublished: boolean;
  data: Work;
  fixedAt?: string | null;
};

/**
 * @openapi
 * /api/admin/works:
 *   post:
 *     tags:
 *       - Works
 *     summary: Create work (admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkUpsertRequest'
 *     responses:
 *       '201':
 *         description: Created
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
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(req: NextRequest) {
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
    .insert({
      slug: body.slug,
      data: body.data,
      is_published: body.isPublished,
      fixed_at: fixedAt,
    })
    .select("id, slug, data, is_published, fixed_at, updated_at")
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500; // unique violation -> slug 중복
    return NextResponse.json({ message: error.message }, { status });
  }

  return NextResponse.json(
    {
      id: data.id,
      slug: data.slug,
      isPublished: data.is_published,
      data: {
        ...data.data,
        fixedAt: data.fixed_at ? new Date(data.fixed_at).toISOString() : null,
      },
      updatedAt: data.updated_at,
    },
    { status: 201 },
  );
}
