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
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
        setChecking(false)
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

    const checkPhoneVerified = async () => {
      if (!session) return
      // check profiles table for phone verification status
      try {
        const { data } = await supabase.from("profiles").select("is_phone_verified, phone_number").eq("id", session.user.id).limit(1).single()
        const isVerified = (data as any)?.is_phone_verified ?? true
        const phone = (data as any)?.phone_number ?? session.user.user_metadata?.phone
        if (!isVerified) {
          router.replace(`/auth/verify?phone=${encodeURIComponent(phone)}`)
        }
      } catch (e) {
        // If query fails, allow to continue but log silently
        console.warn(e)
      }
    }

    if (session && allowedRoles) {
      const role = (session.user.user_metadata?.role as string) ?? "client"
      if (!allowedRoles.includes(role)) {
        router.replace("/auth/login?unauthorized=1")
      }
    }

    if (session) {
      checkPhoneVerified()
    }
  }, [router, session, allowedRoles])

  if (session === undefined || checking) {
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
