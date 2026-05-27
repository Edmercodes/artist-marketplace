"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("creator")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  if (!mounted) return <div />

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          username,
          email,
          phone_number: phone,
          password,
          role,
        }),
      })

      const text = await resp.text()
      let body: { error?: string } = {}
      try {
        body = JSON.parse(text)
      } catch {
        body = { error: text }
      }

      setLoading(false)

      if (!resp.ok) {
        setError(body.error || "Registration failed")
        return
      }

      router.push(`/auth/verify?phone=${encodeURIComponent(phone)}`)
    } catch (error: unknown) {
      setLoading(false)
      const message = error instanceof Error ? error.message : String(error)
      setError(message || "Something went wrong")
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <Card className="overflow-hidden shadow-2xl">
          <CardHeader className="bg-slate-900 px-8 py-8 text-center text-white">
            <CardTitle className="text-3xl">Create your account</CardTitle>
            <CardDescription className="text-slate-300">Register with your phone to receive an SMS verification code.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 py-10">
            {message && <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">{message}</div>}
            {error && (
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 p-4 text-rose-700">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid gap-4">
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2" required />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Username
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2" required />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Phone number
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" placeholder="+639XXXXXXXXX" required />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Email address
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" required />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Password
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" required />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Role
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200">
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
              <Badge variant="outline">Phone required</Badge>
              <Badge variant="outline">SMS OTP</Badge>
              <Badge variant="outline">Role-based access</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
