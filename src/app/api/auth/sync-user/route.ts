import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { uid, email, name } = await req.json();

    // 1. Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("firebase_uid", uid)
      .single();

    // 2. If not → create user
    if (!existingUser) {
      await supabase.from("users").insert({
        firebase_uid: uid,
        email,
        name,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}