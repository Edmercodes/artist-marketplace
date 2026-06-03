"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { type User } from "@supabase/supabase-js"
import { ShieldAlert } from "lucide-react"

import { AuthGuard } from "@/components/auth/AuthGuard"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardShell
        title="Admin dashboard"
        description="Manage listings, user roles, and site settings from the admin console."
        active="admin"
        showAdmin={true}
        userEmail={user?.email ?? undefined}
        userRole={(user?.user_metadata?.role as string) ?? "admin"}
      >
        <div className="space-y-6">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-950 to-slate-800 px-8 py-10 text-white">
              <div className="flex items-center gap-4">
                <ShieldAlert className="h-7 w-7 text-amber-300" />
                <div>
                  <CardTitle className="text-3xl">Admin access only</CardTitle>
                  <p className="text-slate-300">Only users with the `admin` role can view this page.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 px-8 py-10">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-slate-900">Role-based access</h2>
                <p className="mt-3 text-slate-600">
                  Your role is <span className="font-medium text-slate-900">{(user?.user_metadata?.role as string) ?? "client"}</span>.
                </p>
                <p className="mt-2 text-slate-600">
                  Users without the admin role are redirected back to the login page.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button onClick={() => router.push("/dashboard")}>Return to dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </AuthGuard>
  )
}
