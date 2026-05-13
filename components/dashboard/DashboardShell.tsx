"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useState } from "react"
import { Home, LayoutGrid, Shield, Menu, UserCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DashboardShellProps {
  title: string
  description: string
  active: "dashboard" | "admin"
  showAdmin?: boolean
  userEmail?: string
  userRole?: string
  children: ReactNode
}

const navigation = [
  { label: "Dashboard", href: "/dashboard", key: "dashboard", icon: Home },
  { label: "Artists", href: "/artists", key: "artists", icon: LayoutGrid },
  { label: "Marketplace", href: "/marketplace", key: "marketplace", icon: LayoutGrid },
]

export function DashboardShell({
  title,
  description,
  active,
  showAdmin = false,
  userEmail,
  userRole,
  children,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto flex min-h-screen flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="block rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
            <Button variant="outline" size="icon" onClick={() => setCollapsed((prev) => !prev)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          {!collapsed ? (
            <nav className="mt-4 space-y-2">
              {navigation.map((item) => (
                <Link key={item.key} href={item.href} className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active === item.key ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                }`}>
                  <item.icon className="mr-2 inline h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              {showAdmin ? (
                <Link
                  href="/admin"
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active === "admin" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Shield className="mr-2 inline h-4 w-4" />
                  Admin
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:block">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{userEmail?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-slate-900">{userEmail ?? "Your Dashboard"}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{userRole ?? "member"}</p>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active === item.key ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              {showAdmin ? (
                <Link
                  href="/admin"
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active === "admin" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              ) : null}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Quick tips</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the sidebar to navigate between your dashboard, marketplace, and artists directory.
              </p>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-orange-500">{title}</p>
                  <h1 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h1>
                  <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
                </div>
              </div>
            </div>
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}
