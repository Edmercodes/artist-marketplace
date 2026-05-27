import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { resetRateLimit } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { phone, token } = await req.json();
    if (!phone || !token) return NextResponse.json({ error: "Missing phone or token" }, { status: 400 });

    const { data, error } = await (supabaseAdmin.auth as any).verifyOtp({ phone, token, type: "sms" });
    if (error) {
      return NextResponse.json({ error: error.message || String(error) }, { status: 400 });
    }

    const userId = (data as any)?.user?.id;
    if (userId) {
      const { error: updateError } = await supabaseAdmin.from("profiles").update({ is_phone_verified: true }).eq("id", userId);
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    resetRateLimit(`send-otp:${phone}`);
    return NextResponse.json({ success: true, message: "Phone verified" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
