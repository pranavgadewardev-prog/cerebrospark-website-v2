// app/api/events/edit/route.ts

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import admin from "@/lib/firebaseAdmin";

export async function PUT(req: Request) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await admin.auth().verifyIdToken(token);

  const body = await req.json();
  const { id, ...updates } = body;

  const { data, error } = await supabaseAdmin
    .from("events")
    .update(updates)
    .eq("id", id);

  return Response.json({ data, error });
}