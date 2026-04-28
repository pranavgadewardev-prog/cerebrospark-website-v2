// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// type MediaItem = {
//   url: string;
//   type: "image" | "video";
// };

// export default function EventDetails() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [media, setMedia] = useState<MediaItem[]>([]);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const goNext = () => {
//     setActiveIndex((prev) => (prev + 1) % media.length);
//   };

//   const goPrev = () => {
//     setActiveIndex((prev) => (prev - 1 + media.length) % media.length);
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") {
//         goNext();
//       }

//       if (e.key === "ArrowLeft") {
//         goPrev();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [media.length]);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       const { data, error } = await supabase
//         .from("gallery")
//         .select("title, description, media")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error(error);
//         return;
//       }

//       setTitle(data.title);
//       setDescription(data.description);
//       setMedia(data.media);
//       setActiveIndex(0);
//     };

//     fetchEvent();
//   }, [id]);

//   if (!media.length) return null;

//   const activeItem = media[activeIndex];

//   return (
//     <section className="py-20 bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Navigation */}
//         <button
//           onClick={() => router.back()}
//           className="mb-8 text-gray-400 hover:text-yellow-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2 transition-colors"
//         >
//           ← Back to Events
//         </button>

//         {/* TITLE + DESCRIPTION */}
//         <div className="max-w-4xl mb-16">
//           <div className="w-20 h-2 bg-yellow-400 mb-8"></div>

//           <h1 className="text-5xl font-black text-gray-900 uppercase mb-6 leading-tight">
//             {title}
//           </h1>

//           <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-gray-200 pl-6">
//             {description}
//           </p>
//         </div>

//         {/* LARGE MEDIA DISPLAY */}
//         {/* <div className="bg-gray-50 rounded-[2rem] p-8 shadow-inner border border-gray-100 flex justify-center items-center h-[520px] mb-24"> */}
//         <div className="bg-gray-50 rounded-[2rem] overflow-hidden shadow-inner border border-gray-100 mb-24 flex justify-center items-center p-4">
//           {activeItem.type === "image" ? (
//             <img
//               src={activeItem.url}
//               alt={title}
//               className="w-full h-auto object-contain rounded-2xl shadow-2xl transition-all duration-500"
//             />
//           ) : (
//             <video
//               src={activeItem.url}
//               controls
//               className="max-w-full max-h-full rounded-2xl shadow-2xl"
//             />
//           )}
//         </div>

//         {/* THUMBNAILS */}
//         <div className="max-w-6xl mx-auto">
//           <div className="flex gap-6 overflow-x-auto py-10 px-4 snap-x">
//             {media.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveIndex(index)}
//                 className={`shrink-0 h-[140px] w-[180px] flex items-center justify-center transition-all rounded-xl overflow-hidden snap-center bg-gray-100 border-2 ${activeIndex === index
//                     ? "scale-110 border-yellow-400 shadow-xl z-10"
//                     : "opacity-40 hover:opacity-100 border-transparent"
//                   }`}
//               >
//                 {item.type === "image" ? (
//                   <img
//                     src={item.url}
//                     alt=""
//                     className="w-full h-full object-contain p-2"
//                   />
//                 ) : (
//                   <video
//                     src={item.url}
//                     className="w-full h-full object-contain p-2"
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           <p className="text-center text-gray-400 text-[10px] uppercase font-bold tracking-[0.5em] mt-4">
//             Horizontal Scroll for More
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

export default function EventDetails() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const closeModal = () => setActiveIndex(null);

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! + 1) % media.length);
  };

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! - 1 + media.length) % media.length);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, media.length]);

  // Fetch data
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("gallery")
        .select("title, description, media")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
      } else if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setMedia(data.media || []);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!media.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No media found for this event.
      </div>
    );
  }

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* ✅ GRID GALLERY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {media.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer group relative rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-full aspect-[4/3]">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`${title} - ${index}`}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={item.url}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Play Icon Overlay for Videos */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                        <div className="ml-1 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-900 border-b-[6px] border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ FULLSCREEN MODAL */}
      {activeIndex !== null && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center">

    {/* 🔥 BACKDROP */}
    <div
      className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      onClick={closeModal}
    />

    {/* 🔥 CONTENT */}
    <div className="relative z-10 w-full h-full flex items-center justify-center">

      {/* IMAGE / VIDEO */}
      <div className="w-full h-full flex items-center justify-center px-4">
        {media[activeIndex].type === "image" ? (
          <img
            src={media[activeIndex].url}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        ) : (
          <video
            src={media[activeIndex].url}
            controls
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />
        )}
      </div>

      {/* ❌ CLOSE */}
      <button
        onClick={closeModal}
        className="absolute top-6 right-6 z-20
        bg-white/30 hover:bg-white/50
        text-white w-10 h-10 flex items-center justify-center
        rounded-full text-xl backdrop-blur-md transition"
      >
        ✕
      </button>

      {/* ◀ LEFT */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20
        bg-white/30 hover:bg-white/50
        text-white w-12 h-12 flex items-center justify-center
        rounded-full text-2xl backdrop-blur-md transition"
      >
        ‹
      </button>

      {/* ▶ RIGHT */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20
        bg-white/30 hover:bg-white/50
        text-white w-12 h-12 flex items-center justify-center
        rounded-full text-2xl backdrop-blur-md transition"
      >
        ›
      </button>

      {/* COUNTER */}
      <div className="absolute bottom-6 text-white text-sm opacity-70 z-20">
        {activeIndex + 1} / {media.length}
      </div>

    </div>
  </div>
)}
    </section>
  );
}