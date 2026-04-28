"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ===================== TYPES & DATA ===================== */

type DroneItem = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  video: string;
  image: string;
};

const DRONES: DroneItem[] = [
  {
    id: 1,
    title: "CS_KRISHI_10L",
    subtitle: "Agriculture Drone",
    description:
      "Maximize farm productivity with precise, uniform spraying across diverse and challenging terrains. Engineered to reduce input costs while improving crop health and yield efficiency.",
    video: "/drones_bg/drones-bg-video/cs-krishi-video.mp4",
    image: "/drones/cs-krishi-images/cs-krishi-10l.png",
  },
  {
    id: 2,
    title: "CS - MAMBA",
    subtitle: "Multi-Purpose Drone",
    description:
      "A high-endurance drone built for surveillance, mapping, and rapid disaster response operations. Delivers reliable performance with advanced imaging and mission-ready adaptability.",
    video: "/drones_bg/drones-bg-video/cs-mamba-video-3.mp4",
    image: "/drones/cs-mamba-images/mamba.png",
  },
  // {
  //   id: 3,
  //   title: "CS - BEE",
  //   subtitle: "Agile Training & Streaming",
  //   description:
  //     "A lightweight quadcopter ideal for pilot training, live streaming, and rapid deployment scenarios.",
  //   video: "/drones_bg/drones-bg-video/cs-bee-video2.mp4",
  //   image: "/drones/cs-bee-images/cs-bee.png",
  // },
  {
    id: 4,
    title: "CS - PRIDE",
    subtitle: "FPV Drone",
    description:
      "Personal reconnaissance nano drone for real time situation awareness in tactical and indoor interventions.",
    video: "/drones_bg/drones-bg-video/cs-pride-video.mp4",
    image: "/drones/cs-pride-images/cs-pride-2.png",
  },
  {
    id: 5,
    title: "CS - BHEEM",
    subtitle: "Heavy-Duty Logistics",
    description:
      "A powerful heavy-lift drone capable of carrying up to 30 kg for logistics and tactical missions. Built for strength, stability, and reliable performance in demanding operational conditions.",
    video: "/drones_bg/drones-bg-video/cs-bheem-video2.mp4",
    image: "/drones/cs-bheem-images/bheem.png",
  },
];

/* ===================== COMPONENT ===================== */

export default function IntegratedHero() {
  const [index, setIndex] = useState(0);
  // const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const drone = DRONES[index];

  // useEffect(() => setIsMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacityExit = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleExit = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const videoBlur = useTransform(scrollYProgress, [0, 0.4], [0, 8]);

  /* AUTO CHANGE EVERY 10 SECONDS */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DRONES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  /* TYPEWRITER EFFECT — 10 SECONDS */
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    drone.description.slice(0, latest),
  );

  useEffect(() => {
    count.set(0);
    const controls = animate(count, drone.description.length, {
      duration: 10, // ✅ Only this stays 10 seconds
      ease: "easeOut",
    });
    return controls.stop;
  }, [index, drone.description.length, count]);

  // if (!isMounted) {
  //   return <section className="w-full min-h-[100vh] bg-black" />;
  // }

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100vh] flex items-center overflow-hidden bg-black text-white"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={drone.video}
            src={drone.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ filter: videoBlur }}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ opacity: opacityExit, scale: scaleExit }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <div className="flex flex-col space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={drone.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.span className="inline-block px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 text-sm font-medium mb-4 uppercase tracking-widest">
                  {drone.subtitle}
                </motion.span>

                <h1 className="text-5xl md:text-7xl font-black mb-4">
                  <span className="text-yellow-400">{drone.title}</span>
                </h1>

                <div className="min-h-[80px] md:min-h-[100px]">
                  <motion.p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed max-w-lg">
                    <motion.span>{displayText}</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-[3px] h-6 bg-yellow-400 ml-1 translate-y-1"
                    />
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all"
              >
                EXPLORE PRODUCT
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                CONTACT SALES
              </Link>
            </div>

            {/* PAGINATION */}
            <div className="flex gap-2 mt-8">
              {DRONES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 cursor-pointer rounded-full transition-all ${i === index
                    ? "w-12 bg-yellow-400"
                    : "w-4 bg-white/30 hover:bg-white/50"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={drone.image}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[500px] aspect-square"
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Image
                    src={drone.image}
                    alt={drone.title}
                    width={600}
                    height={600}
                    priority
                    className="w-full  h-auto object-contain"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
