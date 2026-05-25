import { supabase } from "@/lib/supabaseClient"

export async function signInWithGoogle() {
  if (typeof window === "undefined") {
    throw new Error("Google sign in must be triggered from the browser")
  }

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback?redirect=/onboarding`,
      queryParams: {
        prompt: "consent",
      },
    },
  })
}

export async function signUpWithEmail(email: string, password: string, role: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  })
}
