import { supabase } from "@/lib/supabaseClient"
import type { CreatorProfile, UserRole } from "@/types/supabase"

const AVATAR_BUCKET = "avatars"

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split(".").pop() ?? "png"
  const filePath = `profiles/${userId}/${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    })

  if (uploadError) {
    return { error: uploadError, publicUrl: null }
  }

  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath)
  return { error: null, publicUrl: data.publicUrl }
}

export async function upsertProfile(profile: {
  auth_id: string
  email: string
  role: UserRole
  full_name?: string
  username?: string
  avatar_url?: string
  location?: string
  bio?: string
}) {
  const { error } = await supabase.from("profiles").upsert({
    auth_id: profile.auth_id,
    email: profile.email,
    role: profile.role,
    full_name: profile.full_name,
    username: profile.username,
    avatar_url: profile.avatar_url,
    location: profile.location,
    bio: profile.bio,
  })
  return { error }
}

export async function upsertCreatorProfile(data: CreatorProfile) {
  const { error } = await supabase.from("creator_profiles").upsert({
    user_id: data.user_id,
    categories: data.categories,
    pricing: data.pricing,
    availability: data.availability,
    portfolio: data.portfolio?.map((item) => ({
      title: item.title,
      url: item.url,
      description: item.description,
    })),
  })
  return { error }
}
