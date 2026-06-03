import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { resetRateLimit } from "@/lib/rateLimiter";

function normalizePhoneForProvider(phone: string) {
  const cleaned = phone.replace(/[^0-9+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (/^0\d{10}$/.test(cleaned)) return `+63${cleaned.slice(1)}`;
  if (/^\d{10}$/.test(cleaned)) return `+${cleaned}`;
  return cleaned;
}

function buildPhoneSearchCandidates(phone: string) {
  const cleaned = phone.replace(/[^0-9+]/g, "");
  const candidates = new Set<string>([cleaned]);

  if (cleaned.startsWith("+")) {
    candidates.add(cleaned.slice(1));
  } else if (/^0\d{10}$/.test(cleaned)) {
    candidates.add(cleaned.slice(1));
    candidates.add(`+63${cleaned.slice(1)}`);
  } else if (/^\d{10}$/.test(cleaned)) {
    candidates.add(`+${cleaned}`);
  }

  return Array.from(candidates);
}

async function verifyTwilioOtp(phone: string, token: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifyServiceSid) {
    return { success: false, error: "Twilio fallback not configured" };
  }

  const response = await fetch(`https://verify.twilio.com/v2/Services/${verifyServiceSid}/VerificationCheck`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: phone,
      Code: token,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data?.message || JSON.stringify(data) };
  }

  return { success: data?.status === "approved", error: data?.message ?? null };
}

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { target, token, method } = await req.json();
    if (!target || !token || !method) {
      return NextResponse.json({ error: "Missing target, token, or method" }, { status: 400 });
    }

    if (method === "twilio") {
      const providerPhone = normalizePhoneForProvider(target);
      const result = await verifyTwilioOtp(providerPhone, token);
      if (!result.success) {
        return NextResponse.json({ error: result.error || "Invalid verification code" }, { status: 400 });
      }

      const phoneCandidates = buildPhoneSearchCandidates(target);
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .in("phone_number", phoneCandidates)
        .single();

      if (profileError || !profile) {
        return NextResponse.json({ error: "Profile not found for this phone number" }, { status: 400 });
      }

      const { error: updateError } = await supabaseAdmin.from("profiles").update({ is_phone_verified: true }).eq("id", profile.id);
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      resetRateLimit(`send-otp:${target}`);
      return NextResponse.json({
        success: true,
        message: "Phone verified via fallback SMS provider. Please log in with your password.",
        redirectTo: "/auth/login",
      });
    }

    const verifyParams: Record<string, string> = { token, type: method === "email" ? "email" : "sms" };
    if (method === "email") {
      verifyParams.email = target;
    } else {
      verifyParams.phone = normalizePhoneForProvider(target);
    }

    const { data, error } = await (supabaseAdmin.auth as any).verifyOtp(verifyParams);
    if (error) {
      console.error("verifyOtp error:", error);
      const msg = (error?.message || "").toString().toLowerCase();
      if (msg.includes("unsupported") || msg.includes("provider")) {
        return NextResponse.json({ error: "SMS provider doesn't support this phone number or country" }, { status: 400 });
      }
      return NextResponse.json({ error: error.message || String(error) }, { status: 400 });
    }

    const userId = (data as any)?.user?.id;
    if (userId) {
      const { error: updateError } = await supabaseAdmin.from("profiles").update({ is_phone_verified: true }).eq("id", userId);
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    resetRateLimit(`send-otp:${target}`);
    return NextResponse.json({ success: true, message: "Phone verified", redirectTo: "/onboarding" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
