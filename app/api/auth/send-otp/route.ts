import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { isRateLimited } from "@/lib/rateLimiter";

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

function isSmsProviderError(error: unknown) {
  const msg = ((error as { message?: string })?.message || String(error || "")).toString().toLowerCase();
  return msg.includes("unsupported") || msg.includes("provider") || msg.includes("sms provider");
}

async function sendEmailOtp(supabaseAdmin: ReturnType<typeof getSupabaseAdmin>, email: string) {
  return supabaseAdmin.auth.signInWithOtp({ email });
}

async function sendTwilioSmsOtp(phone: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifyServiceSid) {
    return { success: false, error: "Twilio fallback not configured" };
  }

  const response = await fetch(`https://verify.twilio.com/v2/Services/${verifyServiceSid}/Verifications`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: phone,
      Channel: "sms",
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data?.message || JSON.stringify(data) };
  }

  return { success: true, data };
}

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Missing phone" }, { status: 400 });

    const ip = (req as any).headers?.get("x-forwarded-for") || "local";
    if (isRateLimited(`send-otp:${ip}:${phone}`)) {
      return NextResponse.json({ error: "Too many OTP requests, try later" }, { status: 429 });
    }

    const phoneCandidates = buildPhoneSearchCandidates(phone);
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id,email,phone_number")
      .in("phone_number", phoneCandidates)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Phone number not registered" }, { status: 400 });
    }

    const providerPhone = normalizePhoneForProvider(profile.phone_number || phone);
    const { error } = await supabaseAdmin.auth.signInWithOtp({ phone: providerPhone });

    if (error) {
      console.error("sendOtp error:", error);

      if (isSmsProviderError(error)) {
        if (profile.email) {
          const { error: emailError } = await sendEmailOtp(supabaseAdmin, profile.email);
          if (!emailError) {
            return NextResponse.json({
              success: true,
              method: "email",
              target: profile.email,
              message: `SMS isn't available. OTP sent to email ${profile.email}.`,
            });
          }
        }

        const twilioResult = await sendTwilioSmsOtp(providerPhone);
        if (twilioResult.success) {
          return NextResponse.json({
            success: true,
            method: "twilio",
            target: providerPhone,
            message: "SMS provider blocked this number. OTP sent through an alternate SMS provider.",
          });
        }

        const supportMessage = profile.email
          ? "SMS isn't available. We attempted email fallback but delivery failed. Contact support for help."
          : "SMS isn't available and no email fallback is available. Contact support for help.";
        return NextResponse.json({ error: supportMessage }, { status: 400 });
      }

      return NextResponse.json({ error: error.message || String(error) }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      method: "sms",
      target: providerPhone,
      message: `OTP sent to ${providerPhone}.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
