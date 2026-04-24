import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { AdminMemberListUpdateRequest } from "@controllers/careers/types";

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  let body: AdminMemberListUpdateRequest;
  try {
    body = (await req.json()) as AdminMemberListUpdateRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const { created = [], updated = [], deleted = [] } = body;

  if (deleted.length) {
    const { error } = await supabase
      .from("allowed_users")
      .delete()
      .in("id", deleted);
    if (error) {
      return applyCookies(
        NextResponse.json({ message: error.message }, { status: 500 }),
      );
    }
  }

  if (updated.length) {
    for (const u of updated) {
      const { error } = await supabase
        .from("allowed_users")
        .update({ email: u.email, role: u.role })
        .eq("id", u.id);
      if (error) {
        return applyCookies(
          NextResponse.json({ message: error.message }, { status: 500 }),
        );
      }
    }
  }

  if (created.length) {
    const { error } = await supabase
      .from("allowed_users")
      .insert(created.map((c) => ({ email: c.email, role: c.role })));

    if (error) {
      return applyCookies(
        NextResponse.json({ message: error.message }, { status: 500 }),
      );
    }
  }

  return applyCookies(NextResponse.json({ success: true }));
}
