"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ShieldCheck,
  Camera,
  Eye,
  Compass,
  Gauge,
  Weight,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

import ImageStack from "@/components/imagestack/CsPrideImageStack";
import PopupBrochureForm from "@/components/popupBrochureForm";

export default function CSPridePage() {
  const [activeTab, setActiveTab] = useState("tech");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="bg-white overflow-hidden">
      {/* ================= HERO VIDEO ================= */}
      {/* <section className="relative w-full overflow-hidden h-[60vh] md:h-[70vh] lg:h-screen bg-[#071825]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        >
          <source
            src="/drones/cs-pride-videos/cs-pride-video.mp4"
            type="video/mp4"
          />
        </video>
      </section> */}
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-blue-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
              Personal Surveillance • Security • Intelligence
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              CS-PRIDE
            </h1>

            <p className="text-lg text-gray-700 mt-1">
              Personal Surveillance Drone
            </p>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Compact yet powerful, CS-PRIDE delivers advanced surveillance,
              real-time intelligence, and high-resolution aerial imaging in a
              nano-class drone platform designed for security, monitoring, and
              situational awareness.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {/* <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/brochures/CS_PRIDE.pdf";
                  link.download = "CS_PRIDE.pdf";
                  link.click();
                }}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Download Brochure
              </button> */}
              <button onClick={() => setOpen("CS-PRIDE")} className="bg-yellow-300 px-8 py-4 rounded-2xl text-black font-bold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Download Brochure
              </button>
              {open && (
                <PopupBrochureForm
                  brochureType={open}
                  onClose={() => setOpen(null)}
                />
              )}

              <Link href={"/login"}>
                <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition">
                  Purchase Now
                </button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/drones/cs-pride-images/cs-pride-2.png"
              alt="CS-PRIDE Drone"
              width={650}
              height={450}
              priority
              className="mx-auto hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= KEY HIGHLIGHTS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Key Highlights
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "4K", label: "Camera Resolution" },
              { value: "249 g", label: "Total Weight" },
              { value: "Nano", label: "Drone Class" },
              { value: "Smart", label: "Obstacle Avoidance" },
            ].map((m, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl shadow-lg shadow-stone-400 hover:scale-105 hover:shadow-blue-300 transition-all bg-white"
              >
                <p className="text-3xl font-bold">{m.value}</p>
                <p className="mt-2 text-gray-600">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section className="py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20">Applications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Security Surveillance",
                icon: ShieldCheck,
                desc: "Real-time monitoring for personal safety, infrastructure, and asset protection.",
              },
              {
                title: "Aerial Imaging",
                icon: Camera,
                desc: "Capture 4K visuals for inspections, monitoring, and documentation.",
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border shadow-sm hover:shadow-xl transition"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/20 to-transparent rounded-3xl" />
                <div className="relative z-10">
                  <a.icon size={36} className="mb-4 text-gray-700" />
                  <h3 className="text-xl font-semibold mb-3">{a.title}</h3>
                  <p className="text-gray-600">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BANNER ================= */}
      <section className="relative w-full h-screen">
        <Image
          src="/banners/CS-PRIDE-BANNER.png"
          alt="CS-Pride Banner"
          fill
          className="object-contain"
        />
      </section>

      {/* ================= TOGGLE SECTION ================= */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Explore CS-PRIDE
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-6 py-3 rounded-xl font-semibold ${activeTab === "tech"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600"
                  }`}
              >
                <Settings size={18} className="inline mr-2" />
                Technical Specifications
              </button>

              <button
                onClick={() => setActiveTab("images")}
                className={`px-6 py-3 rounded-xl font-semibold ${activeTab === "images"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600"
                  }`}
              >
                <ImageIcon size={18} className="inline mr-2" />
                Images
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "tech" ? (
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: Camera, label: "Camera", value: "4K Ultra-HD" },
                { icon: Eye, label: "Obstacle Avoidance", value: "Enabled" },
                { icon: Compass, label: "Category", value: "Nano Drone" },
                { icon: Weight, label: "Weight", value: "249 g" },
                { icon: Gauge, label: "Role", value: "Personal Surveillance" },
              ].map((f, i) => (
                <div key={i} className="p-6 rounded-xl bg-white border shadow">
                  <f.icon className="mb-3 text-gray-700" />
                  <p className="text-sm text-gray-500">{f.label}</p>
                  <p className="text-lg font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <ImageStack />
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Compact. Intelligent. Secure.</h2>

          <p className="mt-4 text-gray-300">
            Powerful surveillance in a lightweight nano platform.
          </p>

          <Link href="/contact">
            <button className="mt-10 px-8 py-4 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300">
              Contact Our Team
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
