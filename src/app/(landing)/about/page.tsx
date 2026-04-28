"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ServicesCarousel"; // Ensure this path is correct
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import People from "@/components/people";

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TEAM DATA ---
const TEAM_MEMBERS = [
  {
    name: "Mr. Ganesh Thorat",
    role: "Founder & Chief Executive Officer",
    photo: "/people/Ganesh Thorat.png",
    link: "https://www.linkedin.com/in/ganesh-thorat-963884196/",
    bio: "Every meaningful journey begins with curiosity and the courage to build something new. My journey in the drone industry started during my college days while working on drone technology along with Mihir. What began as an academic exploration soon evolved into a deeper realization that India needed stronger indigenous capabilities in this rapidly growing sector. This realization led to the establishment of Cerebrospark Innovations, with the vision of building reliable, high-quality drone technologies designed and manufactured in India. Over the years, our efforts have been focused on creating practical drone solutions across sectors such as agriculture, surveillance, inspection, training, and industrial applications, while simultaneously contributing to the growth of India’s drone ecosystem. Alongside technology development, we also recognized the importance of building skilled professionals in this field, which led to the creation of Cerebrospark Academy, a DGCA authorized Remote Pilot Training Organization dedicated to developing the next generation of drone pilots and professionals. It has been an honour to see our work recognized by various national and international platforms, including being acknowledged among the Top Young Change Makers by United Nations India and UNICEF. However, for me the real motivation lies in continuously innovating, solving real-world problems, and making advanced drone technology more accessible and impactful for industries and communities across India. As we move forward, our focus remains clear: to build world-class drone technologies, nurture talent, and contribute towards strengthening India’s position in the global drone ecosystem.",
  },
  {
    name: "Mr. Mihir Kedar",
    role: "Founder, CMO & CTO",
    photo: "/people/Mihir Kedar.png",
    link: "https://www.linkedin.com/in/mihir-kedar-092286190/",
    bio: "Engineering has always been about solving real problems through innovation. My journey with drones began during my engineering days, where what started as curiosity gradually turned into a deep passion for unmanned systems, robotics, and emerging technologies. Over the years, I have had the opportunity to work on and mentor several projects related to drones, UAVs, and robotics, which strengthened my belief in the immense potential this technology holds. As a DGCA Certified Remote Pilot Instructor, I strongly believe that along with technology development, building skilled professionals is equally important for the growth of the drone ecosystem in India. This belief continues to guide my work in developing advanced drone platforms while also contributing to knowledge sharing and skill development in this field. At Cerebrospark Innovations, our focus is on building reliable, high-performance drone technologies that can serve critical sectors including surveillance, inspection, agriculture, and defence applications. Strengthening indigenous drone capabilities is essential for the country’s technological progress, and we remain committed to continuous innovation and research in this rapidly evolving industry. It has been encouraging to see our work being recognized by media platforms such as The Times of India and News18 Lokmat, but the true motivation lies in pushing technological boundaries and contributing to a stronger, self-reliant drone ecosystem in India.",
  },
  {
    name: "Mr. Rushikesh Sonawane",
    role: "Chief Operating Officer",
    photo: "/people/Rushikesh Sonawane.png",
    link: "https://www.linkedin.com/in/rushikesh-sonawane-0a0934294/",
    bio: "Technology becomes truly powerful when it is combined with purpose and teamwork. As a mechanical engineer working in the field of drones, UAVs, and mechatronics for several years, I have always been fascinated by how emerging technologies can transform traditional industries and create new opportunities. At Cerebrospark Innovations, my focus has been on strengthening the design, development, and research aspects of UAV technology while ensuring that our solutions address practical challenges across sectors. One area that particularly inspires me is agriculture, where drone technology can play a significant role in making farming smarter, more efficient, and sustainable. Beyond technology, I strongly believe that people are the true strength of any organization. Building a collaborative environment where innovation, learning, and mutual respect thrive is essential for any team to grow and succeed. By fostering strong connections and encouraging teamwork, we aim to create a workplace where ideas turn into impactful solutions. As we continue to grow, our goal remains to advance indigenous drone technologies and contribute to building a strong and dynamic drone ecosystem in India.",
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for Hero
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="w-full bg-[#fbfbfd] text-gray-900 selection:bg-yellow-400 selection:text-black">
      {/* ================= HERO SECTION ================= */}
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/logo/company2.png"
            alt="About Cerebrospark Innovations"
            fill
            priority
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Engineering the <br />
              <span className="text-yellow-400">Future of Flight</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Reliable drone platforms and intelligent aerial solutions for
              mission-critical applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= INTRO / MANIFESTO ================= */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-yellow-600 tracking-[0.2em] uppercase mb-6"
          >
            Who We Are
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900"
          >
            We are a drone manufacturer & solution provider.
          </motion.p>
        </div>
      </section>

      {/* ================= LEADERSHIP SECTION (Integrated People Component) ================= */}
      {/* <LeadershipCarousel /> */}
      <People />

      {/* ================= BENTO GRID INFO ================= */}
      <section className="bg-[#f5f5f7] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold tracking-tight">Capabilities</h2>
            <p className="text-gray-500 mt-2 text-lg">
              Designed for scale. Built for precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-fr gap-6">
            {/* 1. Company Overview (Video Card) */}
            <BentoCard className="md:col-span-4 row-span-2 min-h-[500px] group relative overflow-hidden rounded-3xl">
              {/* Background Image */}
              <Image
                src="/people/formal.jpeg" // 🔁 Replace with your image path
                alt="Company Overview"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Company Overview
                </h3>

                <div className="space-y-2 text-gray-200 text-lg max-w-2xl">
                  <p>
                    • Pune-based drone manufacturing rooted in India’s aerospace
                    ecosystem.
                  </p>
                  <p>
                    • Specialized in fully customized drone platforms (80g to
                    100kg).
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* 2. Expertise */}
            <BentoCard className="md:col-span-2 bg-white p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Expertise</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Agriculture, security, disaster response, and AI analytics.
                  Aerospace-grade QA integrated into every step.
                </p>
              </div>
            </BentoCard>

            {/* 3. Solutions */}
            <BentoCard className="md:col-span-2 bg-white p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Solutions</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  End-to-end lifecycle support, mission-specific configurations,
                  and advanced analytics pipelines.
                </p>
              </div>
            </BentoCard>

            {/* 4. Commitment */}
            <BentoCard className="md:col-span-3 bg-white p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Our Commitment
              </h3>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />{" "}
                  Highest safety standards
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />{" "}
                  Robust systems for harsh environments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />{" "}
                  Mission-critical reliability
                </li>
              </ul>
            </BentoCard>

            {/* 5. Innovation */}
            <BentoCard className="md:col-span-3 bg-white p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Innovation
              </h3>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{" "}
                  R&D-driven proprietary platforms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{" "}
                  Scalable autonomous architectures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Edge
                  AI & computer vision integration
                </li>
              </ul>
            </BentoCard>

            {/* 6. Client Centric (Featured) */}
            <BentoCard className="md:col-span-6 rounded-3xl overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between p-10 h-full">
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold mb-4">
                    Client-Centric Approach
                  </h3>
                  <p className="mb-6 font-medium opacity-90">
                    We don&apos;t just sell drones; we build long-term
                    partnerships. From regulatory consultation to deployment
                    support.
                  </p>
                  {/* <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                    Work With Us
                  </button> */}
                </div>
                <div className="md:w-1/3 mt-8 md:mt-0 relative h-48 w-full flex justify-center">
                  {/* Replace with a real drone image without background */}
                  <img
                    src="/drones/cs-krishi-images/cs-krishi.png"
                    className="h-full object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                    alt="Drone"
                  />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ================= CAROUSEL ================= */}
      <section className="bg-white py-20">
        <Carousel />
      </section>
    </main>
  );
}

// ================= SUB-COMPONENTS =================

/**
 * LeadershipCarousel
 * Enhanced "People" component.
 * Features: Auto-rotation, Pause on Hover, Premium Framer Animations, Apple-style UI.
 */
function LeadershipCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const person = TEAM_MEMBERS[index];

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  }, []);

  // Auto-change logic (5 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Leadership
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            The minds driving innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* IMAGE SIDE (Floating & Transitioning) */}
          <div className="relative flex items-center justify-center h-[400px] md:h-[500px]">
            {/* Spotlight behind image */}
            <div className="absolute w-[300px] h-[300px] bg-yellow-500/20 rounded-full blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={person.name}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  y: [0, -15, 0], // Floating effect handled by Framer Motion now
                }}
                exit={{
                  opacity: 0,
                  scale: 1.05,
                  filter: "blur(10px)",
                  transition: { duration: 0.4 },
                }}
                transition={{
                  opacity: { duration: 0.6, ease: "easeOut" },
                  scale: { duration: 0.6, ease: "easeOut" },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }, // Continuous float
                }}
                className="relative h-full w-full flex items-center justify-center"
              >
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={600}
                  height={600}
                  priority
                  className="h-full w-auto rounded-b-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CONTENT SIDE */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-8 md:p-12">
              {/* Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                >
                  <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">
                    {person.role}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                    {person.name}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8 max-h-[320px] overflow-y-auto pr-2">
                    {person.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    {person.link && (
                      <Link
                        href={person.link}
                        target="_blank"
                        className="group flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span>Connect on LinkedIn</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="mt-10 flex items-center gap-3">
                {TEAM_MEMBERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index
                        ? "w-8 bg-yellow-500"
                        : "w-2 bg-gray-300 hover:bg-gray-400",
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Wrapper for scroll animations on bento items
function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
