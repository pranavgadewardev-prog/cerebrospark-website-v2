// app/api/events/delete/route.ts

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}