import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { isRateLimited } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Missing phone" }, { status: 400 });

    const ip = (req as any).headers?.get("x-forwarded-for") || "local";
    if (isRateLimited(`send-otp:${ip}:${phone}`)) {
      return NextResponse.json({ error: "Too many OTP requests, try later" }, { status: 429 });
    }

    // Trigger Supabase OTP send
    const { data, error } = await supabaseAdmin.auth.signInWithOtp({ phone });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
