import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let _supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Avoid throwing during build-time (prerender). Export a proxy that will
  // throw a clear error if any code tries to use the client at runtime.
  // This prevents Next.js from failing the build with a less helpful message
  // and makes it clear the environment variables are missing.
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set; exporting proxy supabase.")
  const handler: ProxyHandler<any> = {
    get() {
      throw new Error(
        "Supabase client not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment."
      )
    },
    apply() {
      throw new Error(
        "Supabase client not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment."
      )
    },
  }
  _supabase = new Proxy({}, handler) as any
}

export const supabase = _supabase as ReturnType<typeof createClient>
