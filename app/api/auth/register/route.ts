import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { isRateLimited } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();
    const { full_name, username, email, phone_number, password, role } = body;

    if (!full_name || !username || !email || !phone_number || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || "local";
    if (isRateLimited(`register:${ip}`)) {
      return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 });
    }

    const phone = phone_number.replace(/[^0-9+]/g, "");
    const usernameClean = username.trim().toLowerCase();
    const emailClean = email.trim().toLowerCase();

    const { data: existingByEmail } = await supabaseAdmin.from("profiles").select("id").eq("email", emailClean).limit(1);
    if (existingByEmail?.length) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const { data: existingByUsername } = await supabaseAdmin.from("profiles").select("id").eq("username", usernameClean).limit(1);
    if (existingByUsername?.length) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const { data: existingByPhone } = await supabaseAdmin.from("profiles").select("id").eq("phone_number", phone).limit(1);
    if (existingByPhone?.length) {
      return NextResponse.json({ error: "Phone number already registered" }, { status: 400 });
    }

    const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.signUp({
      email: emailClean,
      password,
      options: {
        data: {
          full_name,
          username: usernameClean,
          role,
          phone_number: phone,
        },
      },
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    const userId = signUpData?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User creation failed - no ID returned" },
        { status: 500 }
      );
    }

    // Verify auth user actually exists in auth.users before inserting profile
    const { data: authUser, error: authCheckError } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (authCheckError || !authUser?.user) {
      return NextResponse.json(
        { error: "Auth user verification failed" },
        { status: 500 }
      );
    }

    const profile = {
      id: userId,
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

    return NextResponse.json({ success: true, message: "Registration complete. Verify your phone to activate your account.", phone });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
