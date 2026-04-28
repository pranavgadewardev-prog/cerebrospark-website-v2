"use client";

import {
  Leaf,
  AlertTriangle,
  Radar,
  Map,
  Package,
  Zap,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

// const services = [
//   { title: "Agriculture", icon: Leaf },
//   { title: "Disaster Management", icon: AlertTriangle },
//   { title: "Drone Surveillance", icon: Radar },
//   { title: "Aerial Mapping", icon: Map },
//   { title: "Delivery Drone", icon: Package },
//   { title: "Powerline Inspection", icon: Zap },
//   { title: "Solar Panel Inspection", icon: Sun },
// ];

const services = [
  {
    title: "Agriculture",
    icon: Leaf,
    image: "/services/cs_krishi_agriculture.jpeg",
  },
  {
    title: "Disaster Management",
    icon: AlertTriangle,
    image: "/services/disaster managment.jpeg",
  },
  {
    title: "Drone Surveillance",
    icon: Radar,
    image: "/services/surveillance.jpeg",
  },
  {
    title: "Aerial Mapping",
    icon: Map,
    image: "/services/aerial mapping.jpeg",
  },
  {
    title: "Delivery Drone",
    icon: Package,
    image: "/services/delivery.jpeg",
  },
  {
    title: "Powerline Inspection",
    icon: Zap,
    image: "/services/powerline inspection.jpeg",
  },
  {
    title: "Solar Panel Inspection",
    icon: Sun,
    image: "/services/solar inspection.jpeg",
  },
];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // We duplicate the list to create the infinite loop effect
  const carouselItems = [...services, ...services];

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col font-sans">
      {/* ================= TITLE SECTION ================= */}
      <section className="bg-slate-900 py-20 px-4 flex flex-col justify-center items-center gap-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <h1 className="relative z-10 text-center text-4xl md:text-6xl font-extrabold text-slate-50 tracking-tight">
          Our Services
        </h1>

        <div className="relative z-10 h-16 flex items-center justify-center">
          <span
            key={services[index].title}
            className="text-amber-400 text-3xl md:text-5xl font-bold animate-pulse text-center drop-shadow-lg"
          >
            {services[index].title}
          </span>
        </div>
      </section>

      {/* ================= CAROUSEL SECTION ================= */}
      <section className="relative py-16 bg-neutral-100 overflow-hidden flex flex-col justify-center">
        {/* Gradient Fade Masks (Left & Right) */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-neutral-100 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-neutral-100 to-transparent pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex w-full overflow-hidden">
          <div className="flex gap-6 animate-carousel hover:[animation-play-state:paused] py-6 px-4">
            {carouselItems.map((service, i) => {
              const Icon = service.icon;
              const isAccent = i % 2 === 1; // Alternating pattern

              return (
                // <div
                //   key={i}
                //   className={` relative  w-[280px] sm:w-[340px] md:w-[380px]  h-[320px]  rounded-3xl p-8  flex flex-col justify-between  transition-all duration-300 ease-out  hover:-translate-y-2 hover:shadow-2xl border
                //     ${
                //       isAccent
                //         ? "bg-amber-400 border-amber-500 shadow-amber-900/10 text-slate-900"
                //         : "bg-white border-neutral-200 shadow-xl text-slate-800"
                //     }
                //   `}
                // >

                //   <div>
                //     <div
                //       className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                //         isAccent
                //           ? "bg-slate-900 text-amber-400"
                //           : "bg-slate-100 text-slate-900"
                //       }`}
                //     >
                //       <Icon className="w-7 h-7" />
                //     </div>

                //     <h3 className="text-2xl font-bold tracking-tight">
                //       {service.title}
                //     </h3>
                //   </div>

                //   <div>
                //     <div
                //       className={`w-12 h-1 rounded-full mb-4 ${isAccent ? "bg-slate-900/20" : "bg-slate-200"}`}
                //     />
                //     <p
                //       className={`text-sm font-medium leading-relaxed ${isAccent ? "text-slate-800" : "text-slate-500"}`}
                //     >
                //       Intelligent drone solutions tailored for{" "}
                //       <span
                //         className={
                //           isAccent
                //             ? "text-slate-950 font-bold"
                //             : "text-slate-900 font-semibold"
                //         }
                //       >
                //         {service.title.toLowerCase()}
                //       </span>
                //       .
                //     </p>
                //   </div>
                // </div>
                <div
                  key={i}
                  className="relative  w-[280px] sm:w-[340px] md:w-[380px]  h-[320px]  rounded-3xl  overflow-hidden transition-all duration-300 ease-out  hover:-translate-y-2 hover:shadow-2xl border border-neutral-200 shadow-xl "
                >
                  {/* Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/55" />

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                    {/* Icon + Title */}
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/20 backdrop-blur-sm">
                        <Icon className="w-7 h-7 text-amber-400" />
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="w-12 h-1 rounded-full mb-4 bg-amber-400/70" />
                      <p className="text-sm font  leading-relaxed text-white/90">
                        Intelligent drone solutions tailored for{" "}
                        <span className="font-bold text-amber-400">
                          {service.title.toLowerCase()}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
