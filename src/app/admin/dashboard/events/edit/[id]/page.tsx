"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

/* ================= TYPES ================= */

interface Event {
  id: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  link?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

/* ================= COMPONENT ================= */

export default function EditEventPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [highlight, setHighlight] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* ================= FETCH EVENT ================= */

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch("/api/events");

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const { data } = await res.json();

        const event = data.find((e: Event) => e.id === id);

        if (event) {
          setTitle(event.title);
          setHighlight(event.highlight);
          setDescription(event.description);
          setLink(event.link || "");
          setStartDate(event.startDate);
          setEndDate(event.endDate);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  /* ================= UPDATE EVENT ================= */

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🔐 Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        alert("End date must be after start date");
        return;
      }

      const user = auth.currentUser;
      const token = await user?.getIdToken();

      if (!token) {
        alert("Unauthorized");
        return;
      }

      const res = await fetch("/api/events/edit", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          highlight,
          description,
          link,
          startDate,
          endDate,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update event");
      }

      alert("Event updated successfully!");
      router.push("/admin/dashboard/events/list");
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-8">Edit Event</h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* HIGHLIGHT */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Highlight
            </label>
            <input
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* LINK */}
          <div>
            <label className="block text-sm font-semibold mb-2">Link</label>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </section>
  );
}
