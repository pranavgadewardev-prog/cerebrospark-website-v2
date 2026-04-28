
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ===================== DATA ===================== */

type Service = {
  title: string;
  description: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    title: "Agriculture",
    description:
      "Precision drone solutions for crop spraying, health monitoring, and yield optimization—designed to maximize productivity while reducing costs.",
    image: "/services/a.jpg",
  },
  {
    title: "Disaster Management",
    description:
      "Rapid damage assessment, survivor detection and aerial support.",
    image: "/services/b.jpg",
  },
  {
    title: "Surveillance",
    description:
      "Advanced aerial surveillance systems delivering real-time intelligence for infrastructure security, perimeter monitoring, and threat detection.",
    image: "/services/c.jpg",
  },
  {
    title: "Mapping & Survey",
    description:
      "High-resolution aerial mapping and surveying solutions for land assessment, construction planning, and geospatial analysis.",
    image: "/services/d.jpg",
  },
  {
    title: "Delivery Drone",
    description:
      "Heavy payload drones for logistics and emergency delivery.",
    image: "/services/g.jpg",
  },
  {
    title: "Powerline Inspection",
    description:
      "AI-enabled drones for safe and efficient powerline inspection.",
    image: "/services/f.jpg",
  },
  {
    title: "Solar Panel Inspection",
    description:
      "Thermal & AI-based drone inspection for solar installations.",
    image: "/services/e.jpg",
  },
];

/* ===================== COMPONENT ===================== */

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 👈 NEW

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // always forward (auto)
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activeService = SERVICES[activeIndex];

  /* ===================== ANIMATION VARIANTS ===================== */

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 1.08,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    }),
  };

  return (
    <main className="w-full min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">

      {/* ===================== LEFT SECTION ===================== */}

      <section className="relative w-full lg:w-1/2 flex flex-col">

        {/* Heading */}
        <div className="p-6 sm:p-8 lg:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            EMPOWERING INDUSTRIES FROM <span className="italic text-yellow-400">SKY</span>
          </h1>
        </div>

        {/* Image Container */}
        <div className="relative w-full flex items-center justify-center bg-black">
          <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] lg:h-[70vh] overflow-hidden">

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeService.image}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1], // smooth cubic-bezier
                }}
                className="absolute inset-0"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  priority={activeIndex === 0} // ✅ fixed
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* ===================== RIGHT SECTION ===================== */}

      <section className="w-full lg:w-1/2 flex flex-col">

        {/* Branding Section */}
        <div className="flex flex-col items-center justify-center bg-yellow-400 text-black px-6 py-14 lg:h-1/2">

          <Image
            src="/logo/csi-logo.png"
            alt="CSI Logo"
            width={200}
            height={200}
            priority
            className="w-36 sm:w-44 lg:w-56 drop-shadow-lg"
          />

          <p className="mt-6 italic text-xl sm:text-2xl lg:text-4xl font-semibold tracking-tight text-center">
            WE <span className="text-white">PROVIDE</span> SERVICES{" "}
            <span className="text-white">FOR</span>
          </p>

        </div>

        {/* Rotating Services */}
        <div className="flex flex-col items-center justify-center bg-neutral-900 px-6 sm:px-10 lg:px-16 py-16 lg:h-1/2">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-xl"
            >

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                {activeService.title}
              </h2>

              <p className="text-neutral-300 text-base sm:text-lg lg:text-xl leading-relaxed">
                {activeService.description}
              </p>

            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {SERVICES.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-6 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-yellow-400" : "bg-neutral-600"
                }`}
              />
            ))}
          </div>

        </div>

      </section>

    </main>
  );
}