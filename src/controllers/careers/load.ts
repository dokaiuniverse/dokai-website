// src/controllers/careers/load.ts
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { createSupabaseServerClient } from "@lib/supabase/server";
import type { ProfileDetailResponse, ProfileListResponse } from "./types";
import { getSessionContext } from "@lib/auth/getSessionContext";

const normalizeEmail = (email: string) => decodeURIComponent(email).trim();
const lower = (s: string) => s.toLowerCase();

// Load profile exists by email
export const loadProfileExistsByEmail = async (
  email: string,
): Promise<boolean> => {
  const targetEmail = normalizeEmail(email);
  const targetEmailLower = lower(targetEmail);

  const { user, role } = await getSessionContext();

  // anon: published만 존재
  if (!user || !role) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("career_profiles")
      .select("email, is_published")
      .eq("email", targetEmail)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return !!data?.is_published;
  }

  // privileged: admin client로 조회
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("career_profiles")
    .select("email, is_published")
    .eq("email", targetEmail)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return false;

  if (role === "admin") return true;

  // staff: 본인이면 ok, 아니면 published만
  const myEmailLower = lower(user.email ?? "");
  const isOwner = myEmailLower === targetEmailLower;

  return isOwner ? true : !!data.is_published;
};

// Load profile list
export const loadProfileList =
  async (): Promise<ProfileListResponse | null> => {
    const { user, role } = await getSessionContext();

    if (!user || !role) {
      const supabase = await createSupabaseServerClient();

      const { data, error } = await supabase
        .from("career_profiles")
        .select("email, data->name, data->role, data->avatar")
        .order("updated_at", { ascending: false });

      if (error) return null;

      const items =
        data?.map((row) => ({
          name: row.name ?? "",
          role: row.role ?? "",
          email: row.email as string,
          avatar: row.avatar ?? null,
        })) ?? [];

      return { items: items } as ProfileListResponse;
    }

    const admin = createSupabaseAdminClient();

    let query = admin
      .from("career_profiles")
      .select("email, data->name, data->role, data->avatar, is_published")
      .order("updated_at", { ascending: false });

    if (role === "staff") {
      const myEmail = (user.email ?? "").toLowerCase();
      query = query.or(`is_published.eq.true,email.ilike.${myEmail}`);
    }

    const { data, error } = await query;

    if (error) return null;

    const items =
      data?.map((row) => ({
        name: row.name ?? "",
        role: row.role ?? "",
        email: row.email as string,
        avatar: row.avatar ?? null,
      })) ?? [];

    return { items: items } as ProfileListResponse;
  };

// Load profile detail by email
export const loadProfileDetail = async (
  email: string,
): Promise<ProfileDetailResponse | null> => {
  const targetEmail = normalizeEmail(email);
  const targetEmailLower = lower(targetEmail);

  const { user, role } = await getSessionContext();

  if (!user || !role) {
    const supabase = await createSupabaseServerClient();

    const { data: profile, error: pErr } = await supabase
      .from("career_profiles")
      .select("email, data, is_published, updated_at")
      .eq("email", targetEmail)
      .maybeSingle();

    if (pErr) return null;
    if (!profile || !profile.is_published) return null;

    const { data: projects, error: prErr } = await supabase
      .from("career_projects")
      .select("id, data->title, data->thumbnail")
      .eq("owner_email", targetEmail)
      .order("updated_at", { ascending: false });

    if (prErr) return null;

    return {
      isPublished: true,
      data: {
        ...profile.data,
        projects:
          projects.map((p) => ({
            id: p.id,
            title: p.title ?? "",
            thumbnail: p.thumbnail ?? null,
          })) ?? [],
      },
      updatedAt: profile.updated_at,
    } as ProfileDetailResponse;
  }

  const admin = createSupabaseAdminClient();

  const { data: profile, error: pErr } = await admin
    .from("career_profiles")
    .select("id, email, data, is_published, updated_at")
    .eq("email", targetEmail)
    .maybeSingle();

  if (pErr) return null;
  if (!profile) return null;

  const myEmailLower = lower(user.email ?? "");
  const isOwner = role === "staff" && myEmailLower === targetEmailLower;

  if (role === "staff" && !isOwner && !profile.is_published) return null;

  let prQuery = admin
    .from("career_projects")
    .select("id, data->title, data->thumbnail, is_published")
    .eq("owner_email", targetEmail)
    .order("updated_at", { ascending: false });

  if (role === "staff" && !isOwner) {
    prQuery = prQuery.eq("is_published", true);
  }

  const { data: projects, error: prErr } = await prQuery;

  if (prErr) return null;

  return {
    id: profile.id,
    isPublished: !!profile.is_published,
    data: {
      ...profile.data,
      projects:
        projects.map((p) => ({
          id: p.id,
          title: p.title ?? "",
          thumbnail: p.thumbnail ?? null,
        })) ?? [],
    },
    updatedAt: profile.updated_at,
  } as ProfileDetailResponse;
};
