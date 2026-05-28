import { Suspense } from "react"
import { VerifyClient } from "./VerifyClientComponent"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-slate-600">Loading…</div>
        </main>
      }
    >
      <VerifyClient />
    </Suspense>
  )
}
