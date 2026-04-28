// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { auth } from "@/lib/firebase";

// interface MediaItem {
//   url: string;
//   type: "image" | "video";
// }

// export default function EditGalleryPage() {
//   const { id } = useParams() as { id: string };
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [media, setMedia] = useState<MediaItem[]>([]);
//   const [newFiles, setNewFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   /* ================= FETCH ================= */

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await fetch(`/api/gallery/${id}`);
//         const { data } = await res.json();

//         if (data) {
//           setTitle(data.title);
//           setDescription(data.description || "");
//           setMedia(data.media || []);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setFetching(false);
//       }
//     };

//     if (id) fetchItem();
//   }, [id]);

//   /* ================= REMOVE MEDIA ================= */

//   const removeMedia = (index: number) => {
//     const updated = [...media];
//     updated.splice(index, 1);
//     setMedia(updated);
//   };

//   /* ================= ADD NEW FILES ================= */

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     setNewFiles((prev) => [...prev, ...Array.from(files)]);
//   };

//   /* ================= UPDATE ================= */

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const updatedMedia = [...media];

//       // 🔥 Upload new files
//       for (const file of newFiles) {
//         const filePath = `gallery/${Date.now()}-${file.name}`;

//         const { error } = await supabase.storage
//           .from("gallery")
//           .upload(filePath, file);

//         if (error) throw error;

//         const { data } = supabase.storage
//           .from("gallery")
//           .getPublicUrl(filePath);

//         updatedMedia.push({
//           url: data.publicUrl,
//           type: file.type.startsWith("video") ? "video" : "image",
//         });
//       }

//       // 🔐 Send to API
//       const token = await auth.currentUser?.getIdToken();

//       const res = await fetch("/api/gallery/edit", {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id,
//           title,
//           description,
//           media: updatedMedia,
//         }),
//       });

//       if (!res.ok) throw new Error("Update failed");

//       alert("Gallery updated successfully!");
//       router.push("/admin/dashboard/viewImages");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */

//   if (fetching) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading gallery...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-8 py-16">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
//         <h1 className="text-3xl font-bold mb-8">Edit Gallery</h1>

//         <form onSubmit={handleUpdate} className="space-y-6">
//           {/* TITLE */}
//           <div>
//             <label className="block font-semibold mb-2">Title</label>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//               required
//             />
//           </div>

//           {/* DESCRIPTION */}
//           <div>
//             <label className="block font-semibold mb-2">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//             />
//           </div>

//           {/* EXISTING MEDIA */}
//           <div>
//             <h2 className="font-semibold mb-3">Existing Media</h2>

//             <div className="grid grid-cols-3 gap-4">
//               {media.map((item, index) => (
//                 <div key={index} className="relative">
//                   {item.type === "image" ? (
//                     <img
//                       src={item.url}
//                       className="w-full h-32 object-cover rounded-lg"
//                     />
//                   ) : (
//                     <video
//                       src={item.url}
//                       className="w-full h-32 object-cover rounded-lg"
//                     />
//                   )}

//                   <button
//                     type="button"
//                     onClick={() => removeMedia(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ADD NEW MEDIA */}
//           <div>
//             <label className="block font-semibold mb-2">Add More Media</label>
//             <input
//               type="file"
//               multiple
//               accept="image/*,video/*"
//               onChange={handleFileChange}
//             />
//           </div>

//           {/* BUTTON */}
//           <button
//             disabled={loading}
//             className="w-full bg-black text-white py-3 rounded-lg font-semibold"
//           >
//             {loading ? "Updating..." : "Update Gallery"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

export default function EditGalleryPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/gallery/${id}`);
        const { data } = await res.json();

        if (data) {
          setTitle(data.title);
          setDescription(data.description || "");
          setMedia(data.media || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  /* ================= REMOVE MEDIA ================= */

  const removeMedia = (index: number) => {
    const updated = [...media];
    updated.splice(index, 1);
    setMedia(updated);
  };

  /* ================= ADD NEW FILES ================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setNewFiles((prev) => [...prev, ...Array.from(files)]);
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ Check Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Unauthorized");
        return;
      }

      const updatedMedia = [...media];

      // 🔥 Upload new files
      for (const file of newFiles) {
        const filePath = `gallery/${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from("gallery")
          .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage
          .from("gallery")
          .getPublicUrl(filePath);

        updatedMedia.push({
          url: data.publicUrl,
          type: file.type.startsWith("video") ? "video" : "image",
        });
      }

      // ✅ API call (NO token)
      const res = await fetch("/api/gallery/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          description,
          media: updatedMedia,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Gallery updated successfully!");
      router.push("/admin/dashboard/viewImages");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-8">Edit Gallery</h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* EXISTING MEDIA */}
          <div>
            <h2 className="font-semibold mb-3">Existing Media</h2>

            <div className="grid grid-cols-3 gap-4">
              {media.map((item, index) => (
                <div key={index} className="relative">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ADD NEW MEDIA */}
          <div>
            <label className="block font-semibold mb-2">Add More Media</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
}


