// app/api/events/add/route.ts

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import admin from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await admin.auth().verifyIdToken(token);

  const body = await req.json();

  const {
    title,
    highlight,
    description,
    image,
    link,
    startDate,
    endDate,
    isActive,
  } = body;

  const { data, error } = await supabaseAdmin.from("events").insert([
    {
      title,
      highlight,
      description,
      image,
      link,
      startDate,
      endDate,
      isActive,
    },
  ]);

  return Response.json({ data, error });
}