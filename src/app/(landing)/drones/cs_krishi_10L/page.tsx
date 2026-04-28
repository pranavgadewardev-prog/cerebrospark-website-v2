"use client";

import { motion } from "framer-motion";
import { Settings, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import PopupBrochureForm from "@/components/popupBrochureForm";

import Image from "next/image";
import {
  Leaf,
  Droplet,
  Radar,
  ShieldCheck,
  Gauge,
  MapPin,
  Wind,
  Timer,
  Video,
} from "lucide-react";
import Link from "next/link";
import ImageStack from "@/components/imagestack/CsKrishiImageStack";
import { Sprout, Fish, Droplets, ArrowRight } from "lucide-react";

const applications = [
  {
    title: "Seed Dropping",
    desc: "Precision aerial seeding for uniform crop distribution and optimal growth.",
    icon: <Sprout className="text-emerald-500" size={32} />,
    color: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/50",
  },
  {
    title: "Fish Feeding",
    desc: "Automated feeding with precise distribution for optimal aquaculture management.",
    icon: <Fish className="text-blue-500" size={32} />,
    color: "from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Pesticide Spraying",
    desc: "Targeted spraying reduces chemical usage by up to 30% while improving coverage.",
    icon: <Droplets className="text-cyan-500" size={32} />,
    color: "from-cyan-500/20 to-transparent",
    border: "group-hover:border-cyan-500/50",
  },
];

export default function CSKrishiPage() {
  const [activeTab, setActiveTab] = useState("tech");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="bg-white overflow-hidden">
      {/* ================= HERO VIDEO ================= */}
      <section className="relative w-full overflow-hidden h-[60vh] md:h-[70vh] lg:h-screen bg-[#071825]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        >
          <source
            src="/drones/cs-krishi-videos/cs-krishi-banner-video.mp4"
            type="video/mp4"
          />
        </video>
      </section>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center pt-12 md:pt-0">
        <div className="absolute inset-0 bg-linear-to-br from-green-50 via-white to-yellow-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Agriculture Drone
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 pb-4">
              CS_KRISHI_10L
            </h1>
            <p className="text-lg text-gray-700">Featured Drone</p>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              CS_KRISHI_10L is an innovative agriculture spraying drone designed
              to revolutionize crop management practices. Its intelligent
              navigation, customizable spraying, and precision targeting enable
              farmers to improve yields while minimizing environmental impact.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {/* <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/brochures/CS_KRISHI_10L.pdf";
                  link.download = "CS_KRISHI_10L.pdf";
                  link.click();
                }}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Download Brochure
              </button> */}
              <button onClick={() => setOpen("CS_KRISHI_10L")} className="bg-yellow-300 px-8 py-4 rounded-2xl text-black font-bold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Download Brochure
              </button>
              {open && (
                <PopupBrochureForm
                  brochureType={open}
                  onClose={() => setOpen(null)}
                />
              )}


              <Link href={'/contact'}>
                <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition">
                  Enquire
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/drones/cs-krishi-images/cs-krishi-10l.png"
              alt="CS-Krishi Agriculture Drone"
              width={700}
              height={500}
              className="mx-auto height:auto width:auto hover:scale-105 transition-transform duration-300"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= EFFICIENCY METRICS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Key Efficiency Metrics
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "10×", label: "Faster than manual" },
              { value: "30%", label: "Chemical savings" },
              { value: "100%", label: "Hard-to-reach areas" },
              { value: "5×", label: "More precise than tractor" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-3 rounded-2xl shadow-lg shadow-stone-400 hover:scale-105 hover:shadow-yellow-400 transition-all"
              >
                <p className="text-4xl font-bold text-gray-900">{m.value}</p>
                <p className="mt-2 text-gray-600">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SHOWCASE TEXT ================= */}
      <section className="py-20 px-10 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 text-center"
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-400 text-gray-900 text-sm font-semibold">
            Precision Agriculture
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            See CS_KRISHI_10L Transform <br className="hidden md:block" />
            Modern Farming
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
            From targeted pesticide spraying to intelligent seed distribution,
            CS_KRISHI_10L delivers unmatched efficiency across every acre.
          </p>
        </motion.div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="relative h-[90vh] w-full bg-black">
        <video
          src="/drones/cs-krishi-videos/cs-krishi-video.mp4"
          controls
          loop
          playsInline
          className="w-full h-full object-contain"
        />
      </section>

      <section className="py-32 bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm font-bold tracking-widest text-emerald-600 uppercase"
            >
              Versatility in Action
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
            >
              Multi-Purpose Solutions
            </motion.h2>
            <p className="text-gray-500 text-lg">
              Our drone technology adapts to your specific needs, providing
              efficiency across various agricultural and aquatic sectors.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`group relative p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 ${app.border}`}
              >
                {/* Animated Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${app.color}`}
                />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {app.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {app.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    {app.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FULL BANNER IMAGE ================= */}
      <section className="relative w-full h-screen bg-white flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/banners/2.jpg"
            alt="CS-Krishi Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* ================= TOGGLE SECTION ================= */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6"
          >
            Explore CS_KRISHI_10L
          </motion.h2>

          <p className="max-w-3xl mx-auto text-center text-gray-500 mb-14">
            Switch between detailed technical specifications and real-world
            visuals to better understand CS_KRISHI_10L’s capabilities.
          </p>

          {/* ================= TOGGLE BUTTONS ================= */}
          <div className="flex justify-center mb-20">
            <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
              {/* Technical */}
              <button
                onClick={() => setActiveTab("tech")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
            ${activeTab === "tech"
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <Settings size={18} />
                Technical Specifications
              </button>

              {/* Images */}
              <button
                onClick={() => setActiveTab("images")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
            ${activeTab === "images"
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <ImageIcon size={18} />
                Images
              </button>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* ========== TECHNICAL SPECS ========== */}
            {activeTab === "tech" && (
              <>
                <p className="max-w-3xl mx-auto text-center text-gray-500 mb-20">
                  Engineered for precision agriculture, CS-Krishi integrates
                  advanced flight control, intelligent sensing, and
                  high-capacity spraying systems to deliver reliable field
                  performance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { icon: Timer, label: "Flight Time", value: "25 min" },
                    {
                      icon: ShieldCheck,
                      label: "Obstacle Avoidance",
                      value: "Enabled",
                    },
                    { icon: Radar, label: "Ground Radar", value: "Integrated" },
                    {
                      icon: MapPin,
                      label: "Auto Flight Mode",
                      value: "Available",
                    },
                    { icon: Wind, label: "Flying Speed", value: "0–8 m/s" },
                    {
                      icon: Gauge,
                      label: "Operating Altitude",
                      value: "196.85 ft",
                    },
                    { icon: MapPin, label: "Flying Radius", value: "1 KM" },
                    {
                      icon: Droplet,
                      label: "Spray Tank Capacity",
                      value: "11.5 L",
                    },
                    {
                      icon: Droplet,
                      label: "Spraying Speed",
                      value: "0.2 – 6 L/min",
                    },
                    { icon: Gauge, label: "Total Weight", value: "31 kg" },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                      className="group relative p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_80px_-25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 text-yellow-600 mb-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                        <f.icon size={22} />
                      </div>

                      <p className="text-sm text-gray-500 mb-1">{f.label}</p>
                      <p className="text-xl font-semibold text-gray-900">
                        {f.value}
                      </p>

                      <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-green-400/40 transition" />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* ========== IMAGE STACK ========== */}
            {activeTab === "images" && (
              <div className="mt-10">
                <ImageStack />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-4xl font-bold">
            Modernizing Agriculture with Precision
          </h2>
          <p className="mt-4 text-gray-300">
            CS-Krishi empowers farmers to improve efficiency, sustainability,
            and crop yield through intelligent aerial technology.
          </p>
          <Link href={"/contact"}>
            <button className="mt-10 px-8 py-4 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition">
              Contact Our Team
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
