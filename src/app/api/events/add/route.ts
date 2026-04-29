// app/api/events/add/route.ts

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
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

    // Basic validation
    if (!title || !startDate) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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