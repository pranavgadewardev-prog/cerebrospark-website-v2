// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseClient";

// interface EventData {
//   id: string;
//   title: string;
//   description: string;
//   link?: string;
//   startDate: string;
//   endDate: string;
//   isActive: boolean;
// }

// export default function EventAnnouncementBar() {
//   const [event, setEvent] = useState<EventData | null>(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       const { data, error } = await supabase
//         .from("events")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error(error);
//         return;
//       }

//       const now = new Date();

//       const activeEvent = data?.find((event) => {
//         const start = new Date(event.startDate);
//         const end = new Date(event.endDate);

//         return (
//           event.isActive === true &&
//           now >= start &&
//           now <= end
//         );
//       });

//       if (activeEvent) setEvent(activeEvent);
//     };

//     fetchEvent();
//   }, []);

//   if (!event) return null;

//   return (
//     <div className="w-full bg-gradient-to-r from-slate-500 to-yellow-500 text-white text-sm py-2 px-4 text-center relative z-[60]">
//       <span className="font-medium">{event.title}:</span>{" "}
//       {event.description}

//       {event.link && (
//         <Link
//           href={event.link}
//           className="ml-3 underline font-semibold hover:text-yellow-300 transition"
//         >
//           Learn More →
//         </Link>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import confetti from "canvas-confetti";

interface EventData {
  id: string;
  title: string;
  description: string;
  link?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function EventAnnouncementBar() {
  const [event, setEvent] = useState<EventData | null>(null);

  // 🎉 Confetti trigger function
  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const colors = ["#facc15", "#38bdf8", "#a855f7", "#22c55e"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      const now = new Date();

      const activeEvent = data?.find((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        return event.isActive && now >= start && now <= end;
      });

      if (activeEvent) {
        setEvent(activeEvent);
        triggerConfetti(); // 🎉 trigger here
      }
    };

    fetchEvent();
  }, []);

  if (!event) return null;

  return (
    <div className="w-full bg-gradient-to-r from-slate-500 to-yellow-500 text-white text-sm py-2 px-4 text-center relative z-[60]">
      <span className="font-medium">{event.title}:</span>{" "}
      {event.description}

      {event.link && (
        <Link
          href={event.link}
          className="ml-3 underline font-semibold hover:text-yellow-300 transition"
        >
          Learn More →
        </Link>
      )}
    </div>
  );
}