"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("creator")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-slate-900 px-8 py-8 text-center text-white">
              <CardTitle className="text-3xl">Create your account</CardTitle>
              <CardDescription className="text-slate-300">
                Join as a creator or client and start building your Filipino creative network.
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

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setMessage("Check your inbox for a confirmation link.")
    setTimeout(() => router.push("/dashboard"), 1200)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <Card className="overflow-hidden shadow-2xl">
          <CardHeader className="bg-slate-900 px-8 py-8 text-center text-white">
            <CardTitle className="text-3xl">Create your account</CardTitle>
            <CardDescription className="text-slate-300">
              Join as a creator or client and start building your Filipino creative network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 py-10">
            {message ? (
              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">{message}</div>
            ) : null}

            {error ? (
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 p-4 text-rose-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleRegister}>
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-2"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Role
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="creator">Creator</option>
                    <option value="client">Client</option>
                  </select>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering…" : "Create account"}
              </Button>
            </form>

            <div className="text-sm text-slate-600">
              Already have an account? <Link href="/auth/login" className="font-medium text-slate-900 hover:text-slate-700">Sign in</Link>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-slate-500">
              <Badge variant="outline">Role-based access</Badge>
              <Badge variant="outline">Email sign-up</Badge>
              <Badge variant="outline">Supabase profile metadata</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
