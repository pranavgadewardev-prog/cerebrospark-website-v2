"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type EventItem = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
};

type Media = {
  type: string;
  url: string;
};

type GalleryDBItem = {
  id: string;
  title: string;
  description: string;
  media: Media[];
};

export default function GalleryPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, title, description, media")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      const mapped = (data || []).map((item: GalleryDBItem) => {
        const firstImage = item.media?.find((m: Media) => m.type === "image");

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          coverImage: firstImage?.url || "/products/cs-krishi.png",
        };
      });

      setEvents(mapped);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) return null;

  return (
    <section className="min-h-screen bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900 mb-12 border-l-8 border-yellow-400 pl-6">
          EVENT <span className="text-yellow-500">GALLERY</span>
        </h1>

        <div className="flex flex-col gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-8 items-center border border-gray-200"
            >
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full md:w-64 h-48 object-cover rounded-xl bg-gray-100"
              />

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-6">{event.description}</p>

                <Link
                  href={`/gallery/${event.id}`}
                  className="bg-gray-900 text-yellow-400 px-6 py-3 rounded-lg font-bold uppercase text-sm hover:bg-yellow-400 hover:text-gray-900 transition-all inline-block"
                >
                  View Images
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
