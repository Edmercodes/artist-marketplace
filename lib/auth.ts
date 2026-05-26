import { supabaseAdmin } from "./supabaseServer";

export type Profile = {
  id: string;
  full_name?: string | null;
  username: string;
  email: string;
  phone_number: string;
  avatar_url?: string | null;
  role: string;
  is_phone_verified: boolean;
  bio?: string | null;
  location?: string | null;
  created_at?: string | null;
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("id", id).single();
  if (error) return null;
  return data as Profile;
}

export async function getProfileByPhone(phone: string): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("phone_number", phone).single();
  if (error) return null;
  return data as Profile;
}
