// "use client";

// import { useEffect, useState } from "react";
// import { auth } from "@/lib/firebase";

// interface MediaItem {
//   url: string;
//   type: "image" | "video";
// }

// interface GalleryItem {
//   id: string;
//   title: string;
//   description?: string;
//   media: MediaItem[];
// }

// export default function ViewImagesPage() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH ================= */

//   const fetchGallery = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/gallery");
//       const { data } = await res.json();

//       setGallery(data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   /* ================= DELETE ================= */

//   const handleDelete = async (id: string) => {
//     const confirmDelete = confirm("Delete this gallery?");

//     if (!confirmDelete) return;

//     try {
//       const token = await auth.currentUser?.getIdToken();

//       const res = await fetch("/api/gallery/delete", {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) throw new Error("Delete failed");

//       fetchGallery();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-gray-100 px-8 py-16">
//       <h1 className="text-3xl font-bold mb-10">Gallery Management</h1>

//       {loading && <p>Loading...</p>}

//       {!loading && gallery.length === 0 && (
//         <p className="text-gray-500">No gallery items found</p>
//       )}

//       <div className="space-y-6">
//         {gallery.map((item) => {
//           const preview = item.media?.[0]; // first image

//           return (
//             <div
//               key={item.id}
//               className="bg-white rounded-2xl p-6 shadow flex gap-6 items-center"
//             >
//               {/* IMAGE PREVIEW */}
//               <div className="w-40 h-28 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
//                 {preview ? (
//                   preview.type === "image" ? (
//                     <img
//                       src={preview.url}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <video
//                       src={preview.url}
//                       className="w-full h-full object-cover"
//                     />
//                   )
//                 ) : (
//                   <span className="text-gray-400 text-sm">No Media</span>
//                 )}
//               </div>

//               {/* DETAILS */}
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{item.title}</h2>

//                 <p className="text-gray-500 text-sm mt-1">
//                   {item.description || "No description"}
//                 </p>

//                 <p className="text-xs text-gray-400 mt-2">
//                   {item.media?.length || 0} media items
//                 </p>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex flex-col gap-2">
//                 {/* VIEW */}
//                 {/* <button
//                   onClick={() =>
//                     alert("Next: open modal / page to view all images")
//                   }
//                   className="px-4 py-2 bg-yellow-400 rounded-lg text-black font-medium"
//                 >
//                   View Images
//                 </button> */}

//                 {/* EDIT */}
//                 <button
//                   onClick={() =>
//                     (window.location.href = `/admin/dashboard/viewImages/edit/${item.id}`)
//                   }
//                   className="px-4 py-2 bg-black text-white rounded-lg"
//                 >
//                   Edit
//                 </button>

//                 {/* DELETE */}
//                 <button
//                   onClick={() => handleDelete(item.id)}
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
import { supabase } from "@/lib/supabaseClient";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  media: MediaItem[];
}

export default function ViewImagesPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/gallery");
      const { data } = await res.json();

      setGallery(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this gallery?");
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

      const res = await fetch("/api/gallery/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-16">
      <h1 className="text-3xl font-bold mb-10">Gallery Management</h1>

      {loading && <p>Loading...</p>}

      {!loading && gallery.length === 0 && (
        <p className="text-gray-500">No gallery items found</p>
      )}

      <div className="space-y-6">
        {gallery.map((item) => {
          const preview = item.media?.[0];

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow flex gap-6 items-center"
            >
              {/* IMAGE PREVIEW */}
              <div className="w-40 h-28 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                {preview ? (
                  preview.type === "image" ? (
                    <img
                      src={preview.url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={preview.url}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <span className="text-gray-400 text-sm">No Media</span>
                )}
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  {item.description || "No description"}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {item.media?.length || 0} media items
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2">
                {/* EDIT */}
                <button
                  onClick={() =>
                    (window.location.href = `/admin/dashboard/viewImages/edit/${item.id}`)
                  }
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item.id)}
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