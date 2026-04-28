// app/api/events/route.ts

import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get("admin");

  let query = supabase.from("events").select("*");

  if (!isAdmin) {
    // 👤 Public users → only active
    query = query.eq("isActive", true);
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  return Response.json({ data, error });
}