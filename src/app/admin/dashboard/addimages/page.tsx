// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { auth } from "@/lib/firebase";
// import { Toaster, toast } from "react-hot-toast";
// import { Upload, X, FileVideo, ImageIcon, Loader2, Plus } from "lucide-react";

// type MediaPreview = {
//   file: File;
//   url: string;
//   type: "image" | "video";
// };

// export default function AddImagesPage() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [files, setFiles] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<MediaPreview[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Clean up object URLs to avoid memory leaks
//   useEffect(() => {
//     return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
//   }, [previews]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles) return;

//     const newFiles = Array.from(selectedFiles);
//     setFiles((prev) => [...prev, ...newFiles]);

//     const newPreviews: MediaPreview[] = newFiles.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       type: file.type.startsWith("video") ? "video" : "image",
//     }));

//     setPreviews((prev) => [...prev, ...newPreviews]);
//   };

//   const removeFile = (index: number) => {
//     const newFiles = [...files];
//     const newPreviews = [...previews];

//     URL.revokeObjectURL(newPreviews[index].url);
//     newFiles.splice(index, 1);
//     newPreviews.splice(index, 1);

//     setFiles(newFiles);
//     setPreviews(newPreviews);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (files.length === 0 || !title.trim()) {
//       toast.error("Please add a title and select files.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const media: { url: string; type: "image" | "video" }[] = [];

//       // 🔥 Upload files
//       for (const file of files) {
//         const filePath = `admin/${Date.now()}-${file.name}`;

//         const { error: uploadError } = await supabase.storage
//           .from("gallery")
//           .upload(filePath, file);

//         if (uploadError) throw uploadError;

//         const { data } = supabase.storage
//           .from("gallery")
//           .getPublicUrl(filePath);

//         media.push({
//           url: data.publicUrl,
//           type: file.type.startsWith("video") ? "video" : "image",
//         });
//       }

//       // 🔐 Send to API
//       const user = auth.currentUser;
//       const token = await user?.getIdToken();

//       if (!token) throw new Error("Unauthorized");

//       const res = await fetch("/api/gallery/add", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           media,
//         }),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.error || "Upload failed");
//       }

//       // ✅ Reset
//       setTitle("");
//       setDescription("");
//       setFiles([]);
//       setPreviews([]);

//       toast.success("Content uploaded successfully!");
//     } catch (err: unknown) {
//       console.error(err);
//       toast.error(err instanceof Error ? err.message : "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-[#FBFBFB] text-gray-900 selection:bg-yellow-100 font-sans pb-20">
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: { borderRadius: "12px", background: "#333", color: "#fff" },
//           success: { iconTheme: { primary: "#FACC15", secondary: "#333" } },
//         }}
//       />

//       <div className="max-w-5xl mx-auto px-6 pt-10">
//         {/* Header Section */}
//         <header className="mb-12">
//           <div className="flex items-center gap-2 mb-3">
//             <div className="h-1 w-12 bg-yellow-400 rounded-full" />
//             <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
//               Management
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
//             Media <span className="text-yellow-500">Assets</span>
//           </h1>
//           <p className="text-lg text-gray-500 mt-2 max-w-2xl">
//             Create high-impact gallery entries. Upload 4K images and cinematic
//             video content directly to your cloud storage.
//           </p>
//         </header>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         >
//           {/* Left Column: Form Fields */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8">
//               <div className="space-y-6">
//                 <div>
//                   <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block ml-1">
//                     Asset Title
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Project Name..."
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:bg-white outline-none transition-all placeholder:text-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block ml-1">
//                     Description
//                   </label>
//                   <textarea
//                     rows={4}
//                     placeholder="Details about these assets..."
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:bg-white outline-none transition-all placeholder:text-gray-300 resize-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="group w-full relative overflow-hidden rounded-2xl bg-gray-900 py-4 px-8 font-bold text-white transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-3">
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin h-5 w-5 text-yellow-400" />
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Upload size={18} className="text-yellow-400" />
//                     <span>Publish Assets</span>
//                   </>
//                 )}
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//             </button>
//           </div>

//           {/* Right Column: Upload & Previews */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Dropzone */}
//             <div className="relative group">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
//               />
//               <div className="bg-white border-2 border-dashed border-gray-200 rounded-[32px] p-12 flex flex-col items-center justify-center text-center transition-all group-hover:border-yellow-400 group-hover:bg-yellow-50/30">
//                 <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
//                   <Plus className="text-yellow-600" size={32} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800">Add Content</h3>
//                 <p className="text-gray-400 text-sm mt-1 max-w-xs">
//                   Drag and drop your media here or click to browse your local
//                   files.
//                 </p>
//               </div>
//             </div>

//             {/* Preview Grid */}
//             {previews.length > 0 && (
//               <div className="bg-white border border-gray-100 rounded-[32px] p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
//                     Selected Batch ({previews.length})
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setFiles([]);
//                       setPreviews([]);
//                     }}
//                     className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors"
//                   >
//                     CLEAR ALL
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   {previews.map((item, index) => (
//                     <div
//                       key={index}
//                       className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
//                     >
//                       {item.type === "image" ? (
//                         <img
//                           src={item.url}
//                           alt="preview"
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="relative h-full w-full">
//                           <video
//                             src={item.url}
//                             className="h-full w-full object-cover"
//                           />
//                           <div className="absolute inset-0 flex items-center justify-center bg-black/20">
//                             <FileVideo className="text-white" size={24} />
//                           </div>
//                         </div>
//                       )}

//                       {/* Hover Overlay */}
//                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <button
//                           type="button"
//                           onClick={() => removeFile(index)}
//                           className="bg-white text-red-500 p-2 rounded-full hover:scale-110 transition-transform"
//                         >
//                           <X size={18} />
//                         </button>
//                       </div>

//                       {/* Icon Indicator */}
//                       <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
//                         {item.type === "image" ? (
//                           <ImageIcon size={12} className="text-gray-600" />
//                         ) : (
//                           <FileVideo size={12} className="text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Toaster, toast } from "react-hot-toast";
import { Upload, X, FileVideo, ImageIcon, Loader2, Plus } from "lucide-react";

type MediaPreview = {
  file: File;
  url: string;
  type: "image" | "video";
};

export default function AddImagesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<MediaPreview[]>([]);
  const [loading, setLoading] = useState(false);

  // Cleanup preview URLs
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...newFiles]);

    const newPreviews: MediaPreview[] = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    URL.revokeObjectURL(newPreviews[index].url);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0 || !title.trim()) {
      toast.error("Please add a title and select files.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Check session (Supabase way)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) throw new Error("User not authenticated");

      const media: { url: string; type: "image" | "video" }[] = [];

      // 🔥 Upload files
      for (const file of files) {
        const filePath = `admin/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("gallery")
          .getPublicUrl(filePath);

        media.push({
          url: data.publicUrl,
          type: file.type.startsWith("video") ? "video" : "image",
        });
      }

      // 🔥 Call API (NO Firebase token)
      const res = await fetch("/api/gallery/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          media,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Upload failed");
      }

      // ✅ Reset
      setTitle("");
      setDescription("");
      setFiles([]);
      setPreviews([]);

      toast.success("Content uploaded successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FBFBFB] text-gray-900 pb-20">
      <Toaster position="top-center" />

      <div className="max-w-5xl mx-auto px-6 pt-10">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold">
            Media <span className="text-yellow-500">Assets</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Upload images & videos to your gallery.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4 p-3 border rounded-xl"
                required
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-black text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Publish
                </>
              )}
            </button>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Box */}
            <div className="relative border-2 border-dashed rounded-2xl p-10 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Plus size={32} className="mx-auto mb-3 text-yellow-500" />
              <p>Add media files</p>
            </div>

            {/* Preview */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previews.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}