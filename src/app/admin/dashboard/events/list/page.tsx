// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { auth } from "@/lib/firebase";

// interface Event {
//   id: string;
//   title: string;
//   highlight: string;
//   description: string;
//   image: string;
//   link?: string;
//   startDate: string;
//   endDate: string;
//   isActive: boolean;
// }

// export default function EventsAdminPage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH EVENTS ================= */

//   const fetchEvents = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/events?admin=true");

//       if (!res.ok) {
//         throw new Error("Failed to fetch events");
//       }

//       const { data } = await res.json();
//       setEvents(data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   /* ================= TOGGLE ACTIVE ================= */

//   const toggleActive = async (id: string, current: boolean) => {
//     try {
//       const user = auth.currentUser;
//       const token = await user?.getIdToken();

//       if (!token) {
//         alert("Unauthorized");
//         return;
//       }

//       const res = await fetch("/api/events/edit", {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           isActive: !current,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update event");
//       }

//       fetchEvents(); // refresh
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   /* ================= DELETE EVENT ================= */

//   const handleDelete = async (id: string) => {
//     const confirmDelete = confirm("Are you sure you want to delete this event?");
//     if (!confirmDelete) return;

//     try {
//       const user = auth.currentUser;
//       const token = await user?.getIdToken();

//       if (!token) {
//         alert("Unauthorized");
//         return;
//       }

//       const res = await fetch("/api/events/delete", {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete event");
//       }

//       fetchEvents();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   /* ================= HELPERS ================= */

//   const isExpired = (endDate: string) => {
//     return new Date(endDate) < new Date();
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString();
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-gray-100 px-8 py-16">
//       <h1 className="text-3xl font-bold mb-10">Manage Events</h1>

//       {loading && <p className="text-gray-500">Loading events...</p>}

//       {!loading && events.length === 0 && (
//         <p className="text-gray-500">No events found</p>
//       )}

//       <div className="grid gap-6">
//         {events.map((event) => {
//           const expired = isExpired(event.endDate);

//           const status = expired
//             ? "Expired"
//             : event.isActive
//             ? "Active"
//             : "Inactive";

//           return (
//             <div
//               key={event.id}
//               className="bg-white rounded-2xl p-6 shadow flex gap-6 items-center"
//             >
//               {/* IMAGE */}
//               <div className="relative w-40 h-28 rounded-lg overflow-hidden">
//                 <Image
//                   src={event.image}
//                   alt={event.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{event.title}</h2>

//                 <p className="text-gray-500 text-sm">{event.highlight}</p>

//                 <p className="text-sm text-gray-400 mt-2">
//                   {formatDate(event.startDate)} →{" "}
//                   {formatDate(event.endDate)}
//                 </p>

//                 <span
//                   className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
//                     status === "Active"
//                       ? "bg-green-100 text-green-700"
//                       : status === "Expired"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {status}
//                 </span>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex flex-col gap-2">
//                 <Link
//                   href={`/admin/dashboard/events/edit/${event.id}`}
//                   className="px-4 py-2 bg-yellow-400 rounded-lg text-black font-medium text-center"
//                 >
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => toggleActive(event.id, event.isActive)}
//                   disabled={isExpired(event.endDate)}
//                   className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
//                 >
//                   {event.isActive ? "Deactivate" : "Activate"}
//                 </button>

//                 <button
//                   onClick={() => handleDelete(event.id)}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

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

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH EVENTS ================= */

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/events?admin=true");

      if (!res.ok) throw new Error("Failed to fetch events");

      const { data } = await res.json();
      setEvents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ================= TOGGLE ACTIVE ================= */

  const toggleActive = async (id: string, current: boolean) => {
    try {
      // ✅ Check Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Unauthorized");
        return;
      }

      const res = await fetch("/api/events/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isActive: !current,
        }),
      });

      if (!res.ok) throw new Error("Failed to update event");

      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* ================= DELETE EVENT ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      // ✅ Check Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Unauthorized");
        return;
      }

      const res = await fetch("/api/events/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete event");

      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= HELPERS ================= */

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-16">
      <h1 className="text-3xl font-bold mb-10">Manage Events</h1>

      {loading && <p className="text-gray-500">Loading events...</p>}

      {!loading && events.length === 0 && (
        <p className="text-gray-500">No events found</p>
      )}

      <div className="grid gap-6">
        {events.map((event) => {
          const expired = isExpired(event.endDate);

          const status = expired
            ? "Expired"
            : event.isActive
            ? "Active"
            : "Inactive";

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 shadow flex gap-6 items-center"
            >
              {/* IMAGE */}
              <div className="relative w-40 h-28 rounded-lg overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{event.title}</h2>

                <p className="text-gray-500 text-sm">{event.highlight}</p>

                <p className="text-sm text-gray-400 mt-2">
                  {formatDate(event.startDate)} →{" "}
                  {formatDate(event.endDate)}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                    status === "Active"
                      ? "bg-green-100 text-green-700"
                      : status === "Expired"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/admin/dashboard/events/edit/${event.id}`}
                  className="px-4 py-2 bg-yellow-400 rounded-lg text-black font-medium text-center"
                >
                  Edit
                </Link>

                <button
                  onClick={() => toggleActive(event.id, event.isActive)}
                  disabled={isExpired(event.endDate)}
                  className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
                >
                  {event.isActive ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}