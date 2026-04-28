import { supabaseAdmin } from "@/lib/supabaseAdmin";
import admin from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await admin.auth().verifyIdToken(token);

  const body = await req.json();

  const { title, description, media } = body;

  const { data, error } = await supabaseAdmin.from("gallery").insert([
    {
      title,
      description,
      media, // JSON array
    },
  ]);

  return Response.json({ data, error });
}