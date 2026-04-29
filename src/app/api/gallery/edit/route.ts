import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, media } = body;

    // Basic validation
    if (!id) {
      return Response.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("gallery")
      .update({
        title,
        description,
        media,
      })
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