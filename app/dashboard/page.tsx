"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { type User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    return () => clearTimeout(id)
  }, [])

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
    router.push("/auth/login")
  }

  const role = (user?.user_metadata?.role as string) ?? "client"

  const analytics = [
    { label: "Total commissions", value: "24", description: "This month" },
    { label: "Earnings", value: "₱42,800", description: "Paid this month" },
    { label: "New messages", value: "18", description: "Last 7 days" },
    { label: "Profile views", value: "3.2k", description: "Last 30 days" },
  ]

  const recentActivities = [
    { id: 1, title: "New commission request received", time: "2 hours ago" },
    { id: 2, title: "Client left a 5-star review", time: "Yesterday" },
    { id: 3, title: "Updated portfolio gallery", time: "3 days ago" },
    { id: 4, title: "Message replied to a client", time: "Last week" },
  ]

  return (
    <AuthGuard>
      <DashboardShell
        title="Your artist dashboard"
        description="Manage your profile, view protected pages, and see your current role."
        active="dashboard"
        showAdmin={role === "admin"}
        userEmail={user?.email ?? undefined}
        userRole={role}
      >
        <div className="space-y-6">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-10 text-white">
              <CardTitle className="text-3xl">Welcome back</CardTitle>
              <p className="mt-3 max-w-2xl text-slate-200">
                Signed in as <span className="font-medium text-slate-900">{user?.email}</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 py-10">
              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default">Role: {role}</Badge>
                    {role === "admin" ? (
                      <Badge variant="secondary">Admin access</Badge>
                    ) : (
                      <Badge variant="outline">Standard access</Badge>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-slate-700">Quick actions</p>
                  <div className="mt-6 space-y-4">
                    <Button className="w-full" onClick={() => router.push("/admin")}>Go to admin page</Button>
                    <Button variant="secondary" className="w-full" onClick={handleSignOut} disabled={loading}>
                      {loading ? "Signing out…" : "Sign out"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {analytics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900">{metric.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h3 className="text-xl font-semibold text-slate-900">Recent activity</h3>
                  <div className="mt-6 space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-medium text-slate-900">{activity.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h3 className="text-xl font-semibold text-slate-900">Insights</h3>
                  <p className="mt-3 text-slate-600">Track commission growth and engagement from your artist profile.</p>
                  <div className="mt-6 space-y-4 text-sm text-slate-600">
                    <p>• Most active clients are requesting portrait work.</p>
                    <p>• Your profile views are up 28% this month.</p>
                    <p>• Response time is within 2 hours on average.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-slate-900">Protected route demo</h3>
                <p className="mt-2 text-slate-600">
                  This page is guarded by a client-side authentication check. Users who aren’t signed in are redirected to the login page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </AuthGuard>
  )
}
