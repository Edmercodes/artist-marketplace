"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function useTimer(initial = 0) {
  const [time, setTime] = useState(initial)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (time <= 0) return
    timerRef.current = window.setInterval(() => setTime((t) => t - 1), 1000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [time])

  return { time, setTime }
}

export function VerifyClient() {
  const router = useRouter()
  const params = useSearchParams()
  const phone = params?.get("phone") || ""

  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const { time, setTime } = useTimer(0)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [otpMethod, setOtpMethod] = useState<"sms" | "email" | "twilio">("sms")
  const [otpTarget, setOtpTarget] = useState<string>(phone)

  const sendOtp = useCallback(async () => {
    if (!phone) {
      setError("Missing phone number")
      return
    }

    setError(null)
    setMessage(null)
    setOtpLoading(true)

    try {
      const resp = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })
      const text = await resp.text()
      let body: { error?: string; method?: string; target?: string; message?: string } = {}
      try {
        body = JSON.parse(text)
      } catch {
        body = { error: text }
      }
      setOtpLoading(false)
      if (!resp.ok) {
        setError(body.error || "Could not send OTP")
        return
      }
      setOtpMethod((body.method as "sms" | "email" | "twilio") || "sms")
      setOtpTarget(body.target || phone)
      setMessage(body.message || "OTP sent. Enter the code from SMS.")
      setTime(120)
    } catch (error: unknown) {
      setOtpLoading(false)
      const message = error instanceof Error ? error.message : String(error)
      setError(message || "Send OTP failed")
    }
  }, [phone, setTime])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (!phone) {
      return
    }

    const timer = window.setTimeout(() => {
      void sendOtp()
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [phone, sendOtp])

  const updateAt = (idx: number, val: string) => {
    if (!/^[0-9]*$/.test(val) && val !== "") return
    const next = [...code]
    next[idx] = val.slice(-1)
    setCode(next)
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus()
  }

  const handleVerify = async () => {
    setError(null)
    setLoading(true)
    const token = code.join("")

    if (token.length !== 6) {
      setLoading(false)
      setError("Enter the 6-digit code")
      return
    }

    try {
      const resp = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: otpMethod, target: otpTarget, token }),
      })
      const text = await resp.text()
      let body: { error?: string; message?: string } = {}
      try {
        body = JSON.parse(text)
      } catch {
        body = { error: text }
      }

      if (!resp.ok) {
        setLoading(false)
        setError(body.error || body.message || "Verification failed")
        return
      }

      setLoading(false)
      setMessage(body.message || "Verified. Redirecting…")
      setTimeout(() => router.push("/onboarding"), 800)
    } catch (error: unknown) {
      setLoading(false)
      const message = error instanceof Error ? error.message : String(error)
      setError(message || "Verification error")
    }
  }

  const handleResend = async () => {
    if (time > 0) return
    await sendOtp()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden shadow-2xl bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-semibold">Verify your code</h2>
          <p className="text-sm text-slate-600 mt-2">
            Enter the 6-digit code sent to {otpTarget || phone} via {otpMethod.toUpperCase()}.
          </p>
          {otpMethod !== "sms" ? (
            <p className="text-sm text-slate-500 mt-1">
              We sent a fallback code because SMS delivery was unavailable for your number.
            </p>
          ) : null}

          <div className="mt-6 flex items-center justify-center gap-2">
            {code.map((c, i) => (
              <Input
                key={i}
                ref={(el) => {
                  if (el) inputsRef.current[i] = el
                }}
                value={c}
                onChange={(e) => updateAt(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[i] && i > 0) {
                    inputsRef.current[i - 1]?.focus()
                  }
                }}
                className="w-12 h-12 text-center text-xl"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {error && <div className="mt-4 text-rose-600">{error}</div>}
          {message && <div className="mt-4 text-emerald-700">{message}</div>}

          <div className="mt-6 flex gap-2">
            <Button onClick={handleVerify} disabled={loading}>
              {loading ? "Verifying…" : "Verify"}
            </Button>

            <Button variant="outline" onClick={handleResend} disabled={otpLoading || time > 0}>
              {time > 0 ? `Resend in ${time}s` : otpLoading ? "Sending…" : "Resend code"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
