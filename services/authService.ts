import { supabase } from "@/lib/supabaseClient"

export async function signInWithGoogle() {
  if (typeof window === "undefined") {
    throw new Error("Google sign in must be triggered from the browser")
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
  const redirectTo = new URL("/auth/callback?redirect=/", appUrl).toString()

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
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

export async function sendOtpToPhone(phone: string) {
  return supabase.auth.signInWithOtp({ phone })
}

export async function verifyPhoneOtp(phone: string, token: string) {
  // client-side wrapper; server will verify through API route
  // depending on supabase-js this may or may not exist in client
  try {
    // @ts-ignore
    return await (supabase.auth as any).verifyOtp({ phone, token, type: "signup" })
  } catch (err) {
    return { error: err }
  }
}
