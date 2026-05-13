"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, LogIn } from "lucide-react"

import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LoginClient() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null) 
  // SAFE replacement for useSearchParams
  const [unauthorized, setUnauthorized] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      return params.get("unauthorized")
    }
    return null
  })

  // Remove the useEffect entirely

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/dashboard")
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "consent",
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <Card className="overflow-hidden shadow-2xl">
          <CardHeader className="bg-slate-900 px-8 py-8 text-center text-white">
            <CardTitle className="text-3xl">Welcome back</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in with email or Google to continue to your artist dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 py-10">
            {unauthorized && (
              <div className="rounded-2xl bg-rose-50 p-4 text-rose-600">
                You need permission to access that page.
              </div>
            )}

            {message && (
              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                {message}
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 p-4 text-rose-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {/* EMAIL LOGIN */}
            <form className="space-y-4" onSubmit={handleEmailLogin}>
              <div className="grid gap-4">
                <label className="text-sm font-medium text-slate-700">
                  Email address
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Password
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2"
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <Link
                  href="/auth/register"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Create account
                </Link>
              </div>
            </form>

            {/* DIVIDER */}
            <div className="relative py-4 text-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
              <span className="relative bg-slate-50 px-3 text-sm text-slate-500">
                or continue with
              </span>
            </div>

            {/* GOOGLE LOGIN */}
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
              type="button"
            >
              <LogIn className="h-4 w-4" />
              Continue with Google
            </Button>

            <div className="flex gap-2 text-sm text-slate-500">
              <Badge variant="outline">Email</Badge>
              <Badge variant="outline">Google</Badge>
              <Badge variant="outline">Supabase</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}