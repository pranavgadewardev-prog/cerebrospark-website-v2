import { supabaseAdmin } from "@/lib/supabaseAdmin";
import admin from "@/lib/firebaseAdmin";

export async function DELETE(req: Request) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await admin.auth().verifyIdToken(token);

  const { id } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("gallery")
    .delete()
    .eq("id", id);

  return Response.json({ data, error });
}