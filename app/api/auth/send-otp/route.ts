import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { isRateLimited } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Missing phone" }, { status: 400 });

    const ip = (req as any).headers?.get("x-forwarded-for") || "local";
    if (isRateLimited(`send-otp:${ip}:${phone}`)) {
      return NextResponse.json({ error: "Too many OTP requests, try later" }, { status: 429 });
    }

    const { data: profile, error: profileError } = await supabaseAdmin.from("profiles").select("id").eq("phone_number", phone).single();
    if (profileError || !profile) {
      return NextResponse.json({ error: "Phone number not registered" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.auth.signInWithOtp({ phone });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
