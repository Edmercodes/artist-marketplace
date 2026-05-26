import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { resetRateLimit } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const { phone, token } = await req.json();
    if (!phone || !token) return NextResponse.json({ error: "Missing phone or token" }, { status: 400 });

    // Attempt to verify OTP using Supabase
    // NOTE: Supabase js exposes verifyOtp for phone tokens
    // Depending on supabase-js version, this may be `auth.verifyOtp` with type: 'signup' or 'sms'
    const { data, error } = await (supabaseAdmin.auth as any).verifyOtp({ phone, token, type: "signup" });

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 400 });
    }

    // If verification succeeded and user id is available, mark profile as verified
    const userId = (data as any)?.user?.id;
    if (userId) {
      const { error: updateError } = await supabaseAdmin.from("profiles").update({ is_phone_verified: true }).eq("id", userId);
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    // Clear rate limit for the phone
    resetRateLimit(`send-otp::${phone}`);

    return NextResponse.json({ success: true, message: "Phone verified" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
