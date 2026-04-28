// // "use client";

// // import React from "react";
// // import Image from "next/image";

// // interface EventData {
// //   title: string;
// //   description: string;
// //   image: string;
// //   startDate: string;
// //   endDate: string;
// // }

// // const event: EventData = {
// //   title: "Best Aerial Innovation Award 2026",
// //   description:
// //     "Cerebrospark Innovations has been honored with the Best Aerial Innovation Award for developing advanced drone-based agricultural intelligence solutions that help farmers improve productivity and crop monitoring.",
// //   image: "/rpto/Ground Training.png",
// //   startDate: "2026-03-01",
// //   endDate: "2026-04-01",
// // };

// // export default function EventHighlight() {
// //   const now = new Date();
// //   const start = new Date(event.startDate);
// //   const end = new Date(event.endDate);

// //   if (now < start || now > end) return null;

// //   return (
// //     <section className="w-full py-20 bg-gray-100 px-6 md:px-12">
// //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

// //         {/* Text Content */}
// //         <div className="space-y-6">

// //           <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
// //             Latest Achievement
// //           </span>

// //           <h2 className="text-3xl md:text-4xl font-bold text-black">
// //             {event.title}
// //           </h2>

// //           <p className="text-gray-700 leading-relaxed">
// //             {event.description}
// //           </p>

// //           <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
// //             Learn More
// //           </button>

// //         </div>

// //         {/* Image */}
// //         <div className="relative w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
// //           <Image
// //             src={event.image}
// //             alt={event.title}
// //             fill
// //             className="object-cover"
// //           />
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { supabase } from "@/lib/supabaseClient";

// // interface EventData {
// //   id: string;
// //   title: string;
// //   highlight: string;
// //   description: string;
// //   image: string;
// //   link?: string;
// //   startDate: string;
// //   endDate: string;
// // }

// // export default function EventHighlight() {
// //   const [event, setEvent] = useState<EventData | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchEvent = async () => {
// //       const { data, error } = await supabase
// //         .from("events")
// //         .select("*")
// //         .order("created_at", { ascending: false });

// //       if (error) {
// //         console.error(error);
// //         setLoading(false);
// //         return;
// //       }

// //       const now = new Date();

// //       const activeEvent = data?.find((event) => {
// //         const start = new Date(event.startDate);
// //         const end = new Date(event.endDate);
// //         return now >= start && now <= end;
// //       });

// //       if (activeEvent) setEvent(activeEvent);

// //       setLoading(false);
// //     };

// //     fetchEvent();
// //   }, []);

// //   if (loading || !event) return null;

// //   return (
// //     <section className="w-full py-20 bg-gray-100 px-6 md:px-12">
// //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

// //         {/* Text Content */}
// //         <div className="space-y-6">

// //           <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
// //             {event.highlight}
// //           </span>

// //           <h2 className="text-3xl md:text-4xl font-bold text-black">
// //             {event.title}
// //           </h2>

// //           <p className="text-gray-700 leading-relaxed">
// //             {event.description}
// //           </p>

// //           {event.link && (
// //             <a
// //               href={event.link}
// //               target="_blank"
// //               className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
// //             >
// //               Learn More
// //             </a>
// //           )}

// //         </div>

// //         {/* Image */}
// //         <div className="relative w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">

// //           <Image
// //             src={event.image}
// //             alt={event.title}
// //             fill
// //             className="object-cover"
// //           />

// //         </div>

// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import React from "react";
// import Image from "next/image";

// interface EventData {
//   id: string;
//   title: string;
//   highlight: string;
//   description: string;
//   image: string;
//   link?: string;
//   startDate: string;
//   endDate: string;
// }

// export default function EventHighlight({ event }: { event: EventData }) {
//   if (!event) return null;

//   return (
//     <section className="w-full py-20 bg-gray-100 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//         {/* Text Content */}
//         <div className="space-y-6">
//           <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
//             {event.highlight}
//           </span>

//           <h2 className="text-3xl md:text-4xl font-bold text-black">
//             {event.title}
//           </h2>

//           <p className="text-gray-700 leading-relaxed">{event.description}</p>

//           {event.link && (
//             <a
//               href={event.link}
//               target="_blank"
//               className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
//             >
//               Learn More
//             </a>
//           )}
//         </div>

//         {/* Image */}
//         <div className="relative w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
//           <Image
//             src={event.image}
//             alt={event.title}
//             fill
//             className="object-cover"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React from "react";
import Image from "next/image";

interface EventData {
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

export default function EventHighlight({ event }: { event: EventData }) {

  if (!event) return null;

  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  const shouldShow =
    event.isActive === true &&
    now >= start &&
    now <= end;

  if (!shouldShow) return null;

  return (
    <section className="w-full py-20 bg-gray-100 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Text Content */}
        <div className="space-y-6">

          <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
            {event.highlight}
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {event.title}
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {event.description}
          </p>

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Learn More
            </a>
          )}

        </div>

        {/* Image */}
        <div className="relative w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}