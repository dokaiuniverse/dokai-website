import { NextResponse, type NextRequest } from "next/server";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";
import { ProfileUpsertRequest } from "@controllers/careers/types";

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase
    .from("allowed_users")
    .select("id, email, role")
    .order("email", { ascending: true });

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const items = (data ?? []).map((row) => ({
    id: row.id,
    email: row.email,
    role: row.role,
  }));

  return applyCookies(NextResponse.json({ items }));
}

export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  let body: ProfileUpsertRequest;
  try {
    body = (await req.json()) as ProfileUpsertRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const email = (body.data.email ?? "").toString();
  if (!email) {
    return applyCookies(
      NextResponse.json({ message: "email is required" }, { status: 400 }),
    );
  }

  const { data, error } = await supabase
    .from("career_profiles")
    .insert({
      email,
      data: body.data,
      is_published: !!body.isPublished,
    })
    .select("id")
    .single();

  if (error) {
    return applyCookies(
      NextResponse.json(
        { message: error.message },
        { status: supabaseErrorToStatus(error) },
      ),
    );
  }

  return applyCookies(
    NextResponse.json(
      {
        profileId: data.id,
      },
      { status: 201 },
    ),
  );
}
