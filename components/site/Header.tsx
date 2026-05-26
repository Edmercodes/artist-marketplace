"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogOut, Shield, Home, UserCircle2, LayoutGrid, Tag } from "lucide-react"

import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {label}
    </Link>
  )
}

export function Header() {
  const [user, setUser] = useState<{ email?: string; role?: string } | null>(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      const user = data.user
      if (user) {
        setUser({
          email: user.email ?? undefined,
          role: (user.user_metadata?.role as string) ?? "client",
        })
      }
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      if (session?.user) {
        setUser({
          email: session.user.email ?? undefined,
          role: (session.user.user_metadata?.role as string) ?? "client",
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      mounted = false
      subscription?.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/artists", label: "Artists", icon: LayoutGrid },
    { href: "/marketplace", label: "Marketplace", icon: Tag },
    { href: "/dashboard", label: "Dashboard", icon: UserCircle2 },
    { href: "/admin", label: "Admin", icon: Shield },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 shadow-lg shadow-slate-200 overflow-hidden">
            <Image
              src="/likhapinas.png"
              alt="LikhaPinas logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </span>
          <div>
            <p className="text-sm font-semibold">LikhaPinas</p>
            <p className="text-xs text-slate-500">Philippine artist marketplace</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:hidden">
          <Button variant="outline" size="icon" onClick={() => setOpen((prev) => !prev)}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>

        <nav
          className={`w-full flex-col gap-2 sm:flex sm:w-auto sm:flex-row ${open ? "flex" : "hidden"}`}
        >
          {navLinks.map((link) => {
            if (link.href === "/admin" && user?.role !== "admin") {
              return null
            }
            return <NavLink key={link.href} href={link.href} label={link.label} />
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{user.email}</p>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/auth/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                Login
              </Link>
              <Link href="/auth/register" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
