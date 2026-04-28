"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { auth } from "@/lib/firebase";

export default function AddEventPage() {
  const [title, setTitle] = useState("");
  const [highlight, setHighlight] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  /* ================= IMAGE UPLOAD ================= */

  const uploadImage = async () => {
    if (!imageFile) return null;

    const filePath = `events/${Date.now()}-${imageFile.name}`;

    const { error } = await supabase.storage
      .from("eventImages")
      .upload(filePath, imageFile);

    if (error) throw error;

    const { data } = supabase.storage
      .from("eventImages")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  /* ================= FORM SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      if (new Date(startDate) > new Date(endDate)) {
        setLoading(false);
        alert("End date must be after start date");
        return;
      }

      if (!imageUrl) throw new Error("Image upload failed");

      // const { error } = await supabase.from("events").insert([
      //   {
      //     title,
      //     highlight,
      //     description,
      //     link,
      //     startDate,
      //     endDate,
      //     image: imageUrl,
      //     isActive: true,
      //   },
      // ]);

      const user = auth.currentUser;
      const token = await user?.getIdToken();

      if (!token) throw new Error("Unauthorized");

      const res = await fetch("/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          highlight,
          description,
          link,
          startDate,
          endDate,
          image: imageUrl,
          isActive: true,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to add event");
      }

      // if (error) throw error;

      alert("Event added successfully!");

      setTitle("");
      setHighlight("");
      setDescription("");
      setLink("");
      setStartDate("");
      setEndDate("");
      setImageFile(null);
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] selection:bg-yellow-200">
      {/* Header */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">
            Event Management
          </h1>

          <button
            form="event-form"
            disabled={loading}
            className="bg-gray-100 hover:bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-medium transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Page Heading */}

        <header className="mb-12">
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            Create new event.
          </h2>

          <p className="text-xl text-gray-500 font-medium">
            Add awards, announcements or company achievements.
          </p>
        </header>

        {/* Form */}

        <form id="event-form" onSubmit={handleSubmit} className="space-y-12">
          {/* Event Information */}

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Event Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-500 ml-1">
                  Event Title
                </label>

                <input
                  placeholder="Best Aerial Innovation Award 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl text-black transition focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 ml-1">
                  Highlight Text
                </label>

                <input
                  placeholder="Latest Achievement"
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl text-black transition focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 ml-1">
                  Description
                </label>

                <textarea
                  placeholder="Explain the achievement..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl text-black transition focus:outline-none focus:border-yellow-400 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 ml-1">
                  Event Link
                </label>

                <input
                  placeholder="https://example.com/event"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl text-black transition focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </section>

          {/* Event Duration */}

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Event Duration
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-500 ml-1">
                  Start Date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl text-black transition focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 ml-1">
                  End Date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl text-black transition focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </section>

          {/* Image Upload */}

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Event Image
            </h3>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-yellow-400 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="space-y-2">
                <div className="text-3xl">📸</div>

                <p className="text-gray-600 font-medium">
                  {imageFile ? imageFile.name : "Click to upload event image"}
                </p>

                <p className="text-xs text-gray-400">PNG / JPG / WEBP</p>
              </div>
            </div>
          </section>

          {/* Submit Button */}

          <button
            disabled={loading}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition shadow-xl shadow-black/10"
          >
            {loading ? "Uploading..." : "Add Event"}
          </button>
        </form>
      </div>
    </section>
  );
}
