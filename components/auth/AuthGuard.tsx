"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { type Session } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabaseClient"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
      }
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session)
      }
    })

    return () => {
      mounted = false
      subscription?.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session === null) {
      router.replace("/auth/login")
      return
    }

    if (session && allowedRoles) {
      const role = (session.user.user_metadata?.role as string) ?? "client"
      if (!allowedRoles.includes(role)) {
        router.replace("/auth/login?unauthorized=1")
      }
    }
  }, [router, session, allowedRoles])

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl">
          <p>Loading your workspace…</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
