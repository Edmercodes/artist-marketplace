"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertCircle, LogIn } from "lucide-react"

import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [unauthorized, setUnauthorized] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only access search params on the client side
    setUnauthorized(searchParams.get("unauthorized"))
  }, [searchParams])

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
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
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

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
            {unauthorized ? (
              <div className="rounded-2xl bg-rose-50 p-4 text-rose-600">
                <p>You need permission to access that page.</p>
              </div>
            ) : null}

            {message ? (
              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                {message}
              </div>
            ) : null}

            {error ? (
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 p-4 text-rose-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleEmailLogin}>
              <div className="grid gap-4">
                <label className="block text-sm font-medium text-slate-700">
                  Email address
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Password
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-2"
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
                <Link href="/auth/register" className="text-sm text-slate-600 hover:text-slate-900">
                  Create an account
                </Link>
              </div>
            </form>

            <div className="relative py-4 text-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
              <span className="relative bg-slate-50 px-3 text-sm text-slate-500">or continue with</span>
            </div>

            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <LogIn className="h-4 w-4" />
              Continue with Google
            </Button>

            <div className="flex flex-wrap gap-2 text-sm text-slate-500">
              <Badge variant="outline">Email login</Badge>
              <Badge variant="outline">Google OAuth</Badge>
              <Badge variant="outline">Supabase auth</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
