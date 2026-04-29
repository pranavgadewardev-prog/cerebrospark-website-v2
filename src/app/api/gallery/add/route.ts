import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, media } = body;

    // Basic validation
    if (!title || !media) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.from("gallery").insert([
      {
        title,
        description,
        media, // JSON array
      },
    ]);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}