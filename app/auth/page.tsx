import Link from "next/link"

export default function AuthIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Authentication</p>
          <h1 className="text-4xl font-semibold text-slate-900">Sign in or create an account</h1>
          <p className="mx-auto max-w-2xl text-slate-600">
            Use email/password or Google login, then explore protected routes and role-aware admin pages.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/auth/login" className="rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-lg hover:bg-slate-800">
              Login
            </Link>
            <Link href="/auth/register" className="rounded-2xl border border-slate-200 px-6 py-4 text-slate-900 shadow-sm hover:bg-slate-50">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
