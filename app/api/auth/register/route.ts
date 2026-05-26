import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { isRateLimited } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, username, email, phone_number, password, role } = body;

    // Basic validation
    if (!full_name || !username || !email || !phone_number || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Rate limit by IP
    const ip = (req as any).headers?.get("x-forwarded-for") || "local";
    if (isRateLimited(`register:${ip}`)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 });
    }

    // sanitize
    const phone = phone_number.replace(/[^0-9+]/g, "");
    const usernameClean = username.trim().toLowerCase();
    const emailClean = email.trim().toLowerCase();

    // Check uniqueness in profiles
    const { data: existingByEmail } = await supabaseAdmin.from("profiles").select("id").eq("email", emailClean).limit(1);
    if (existingByEmail && existingByEmail.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const { data: existingByUsername } = await supabaseAdmin.from("profiles").select("id").eq("username", usernameClean).limit(1);
    if (existingByUsername && existingByUsername.length > 0) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const { data: existingByPhone } = await supabaseAdmin.from("profiles").select("id").eq("phone_number", phone).limit(1);
    if (existingByPhone && existingByPhone.length > 0) {
      return NextResponse.json({ error: "Phone number already registered" }, { status: 400 });
    }

    // Sign up user with Supabase (this will send an OTP to the phone if phone is provided)
    const signUpPayload: any = {
      password,
      options: {
        data: {
          full_name,
          username: usernameClean,
          role,
          email: emailClean,
        },
      },
    };

    // Prefer phone-based sign up for OTP flow
    if (phone) {
      signUpPayload.phone = phone;
    } else {
      signUpPayload.email = emailClean;
    }

    const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp(signUpPayload);

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    // If Supabase returned a user id, create a profile record with pending phone verification
    const userId = (signUpData as any)?.user?.id;

    const profile = {
      id: userId || undefined,
      full_name,
      username: usernameClean,
      email: emailClean,
      phone_number: phone,
      avatar_url: null,
      role,
      is_phone_verified: false,
      bio: null,
      location: null,
      created_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabaseAdmin.from("profiles").insert([profile]);
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "OTP sent to phone. Verify to activate account.", phone: phone });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
