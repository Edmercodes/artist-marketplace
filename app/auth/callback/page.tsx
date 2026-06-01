"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const finishSignIn = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""))
      const redirect =
        searchParams.get("redirect") || hashParams.get("redirect") || "/dashboard"
      const errorDescription =
        searchParams.get("error_description") || hashParams.get("error_description")

      if (errorDescription) {
        setError(errorDescription)
        return
      }

      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")

      if (accessToken && refreshToken) {
        const sessionData = {
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: hashParams.get("token_type") || "bearer",
          expires_in: hashParams.get("expires_in") ? Number(hashParams.get("expires_in")) : undefined,
          provider_token: hashParams.get("provider_token") || undefined,
          provider_refresh_token: hashParams.get("provider_refresh_token") || undefined,
        }

        const { error } = await supabase.auth.setSession(sessionData as {
          access_token: string
          refresh_token: string
          token_type?: string
          expires_in?: number
          provider_token?: string
          provider_refresh_token?: string
        })

        if (error) {
          setError(error.message)
          return
        }
      } else if (searchParams.get("code")) {
        const code = searchParams.get("code")

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            setError(error.message)
            return
          }
        }
      }

      router.replace(redirect.startsWith("/") ? redirect : "/dashboard")
    }

    void finishSignIn()
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle>{error ? "Sign-in failed" : "Finishing sign-in"}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="space-y-4">
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 p-4 text-rose-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
              <Link className="text-sm font-medium text-slate-900 hover:text-slate-700" href="/auth/login">
                Back to sign in
              </Link>
            </div>
          ) : (
            <p className="text-slate-600">Please wait while we complete your session.</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
