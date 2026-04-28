"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Services from "@/components/ServicePageServices";
import DroneShowcase from "@/components/DroneShowcase";
import { Variants } from "framer-motion";

/* ===================== DATA ===================== */

const services = [
  {
    title: "Agriculture",
    image: "/services/cs_krishi_agriculture.jpeg",
    short:
      "AI-powered drones for spraying, crop monitoring and multispectral analysis.",
  },
  {
    title: "Disaster Management",
    image: "/services/disaster managment.jpeg",
    short: "Rapid damage assessment, survivor detection and aerial support.",
  },
  {
    title: "Drone Surveillance",
    image: "/services/surveillance.jpeg",
    short:
      "High-resolution surveillance for security and monitoring operations.",
  },
  {
    title: "Aerial Mapping",
    image: "/services/aerial mapping.jpeg",
    short: "RTK & PPK enabled drones for precision mapping and 3D modeling.",
  },
  {
    title: "Delivery Drone",
    image: "/services/delivery.jpeg",
    short: "Heavy payload drones for logistics and emergency delivery.",
  },
  {
    title: "Powerline Inspection",
    image: "/services/power line inspection.jpeg",
    short: "AI-enabled drones for safe and efficient powerline inspection.",
  },
  {
    title: "Solar Panel Inspection",
    image: "/services/Solar.jpeg",
    short: "Thermal & AI-based drone inspection for solar installations.",
  },
];

/* ===================== ANIMATION VARIANTS ===================== */

const fadeInLazy: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

/* ===================== PAGE ===================== */

export default function ServicesPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const isMobile = window.innerWidth < 768;
    const speed = isMobile ? 0.3 : 0.8;

    const scroll = () => {
      if (!isPaused.current) {
        container.scrollLeft += speed;

        // seamless infinite loop (IMPORTANT FIX)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  /* ===== INTERACTIONS ===== */

  const handleMouseEnter = () => (isPaused.current = true);
  const handleMouseLeave = () => (isPaused.current = false);

  const handleTouchStart = () => (isPaused.current = true);
  const handleTouchEnd = () => (isPaused.current = false);

  return (
    <main className="bg-white selection:bg-yellow-400/30">
      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] overflow-hidden bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="/services/services_2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerStagger}
            className="text-center"
          >
            <motion.div
              variants={fadeInLazy}
              className="inline-block mb-4 px-4 py-1 border border-white/30 rounded-full backdrop-blur-md bg-white/5 text-white text-xs uppercase tracking-[0.2em] font-medium"
            >
              Industry Solutions
            </motion.div>

            <motion.h1
              variants={fadeInLazy}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Our{" "}
              <span className="text-yellow-400 font-extrabold italic">
                Services
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInLazy}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Pioneering precision drone technology to redefine
              <span className="text-white font-normal">
                {" "}
                industrial efficiency
              </span>{" "}
              and safety.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= HORIZONTAL SCROLL ================= */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="px-6 mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter"
            >
              Core Expertise
            </motion.h2>
            <div className="h-1 w-20 bg-yellow-400 mt-4" />
          </div>

          <motion.div
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-6 overflow-x-hidden md:snap-x md:snap-mandatory px-6 py-6 pb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerStagger}
          >
            {/* DUPLICATED FOR INFINITE LOOP */}
            {[...services, ...services].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInLazy}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="relative shrink-0 w-[75vw] sm:w-[60vw] md:w-[450px] h-[500px] rounded-2xl overflow-hidden group bg-zinc-200"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 75vw, 450px"
                  priority={index === 0}
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-2">
                    {service.title}
                  </h3>

                  <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gray-300 text-sm leading-relaxed border-t border-white/20 pt-4 mt-2">
                      {service.short}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= DRONE SHOWCASE ================= */}
      <section className="bg-white border-y border-zinc-100">
        <DroneShowcase />
      </section>

      {/* ================= VIDEO GRID ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-1 rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl shadow-zinc-200/50">
            {["/services/survey.mp4", "/services/4.mp4", "/services/delivery video.mp4"].map(
              (src, i) => (
                <div key={i} className="relative aspect-[4/5] overflow-hidden">
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <div className="bg-zinc-50">
        <Services />
      </div>
    </main>
  );
}