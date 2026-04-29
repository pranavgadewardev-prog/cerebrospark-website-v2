"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AiInDrones from "@/components/AiInDrones";

import {
  Radar,
  ShieldCheck,
  Gauge,
  Wind,
  Timer,
  Package,
  Eye,
  MapPin,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

import ImageStack from "@/components/imagestack/CsMambaImageStack";
import PopupBrochureForm from "@/components/popupBrochureForm";

export default function CSMambaPage() {
  const [activeTab, setActiveTab] = useState("tech");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center pt-12">
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-yellow-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium">
              Surveillance • Disaster Response • Mapping
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              CS-MAMBA
            </h1>

            <p className="text-lg text-gray-700 mt-1">
              Advanced Surveillance Quadcopter
            </p>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              CS-MAMBA is engineered for aerial intelligence, disaster response,
              and precision surveillance. With long endurance, real-time data
              transmission, and multi-mission adaptability, it enables safer,
              faster, and more informed decision-making in critical operations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              {/* <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/brochures/CS_MAMBA.pdf";
                  link.download = "CS_MAMBA.pdf";
                  link.click();
                }}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Download Brochure
              </button> */}
              <button onClick={() => setOpen("CS-MAMBA")} className="bg-yellow-300 px-8 py-4 rounded-2xl text-black font-bold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
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
              src="/drones/cs-mamba-images/mamba.png"
              alt="CS-Mamba Drone"
              width={700}
              height={500}
              priority
              className="mx-auto hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= PERFORMANCE HIGHLIGHTS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Key Performance Highlights
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "60 min", label: "Flight Time" },
              { value: "2 kg", label: "Payload Capacity" },
              { value: "11 Kms", label: "Range" },
              { value: "Night Ops", label: "Night Vision" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl shadow-lg shadow-stone-400 hover:scale-105 hover:shadow-yellow-400 transition-all bg-white"
              >
                <p className="text-3xl font-bold text-gray-900">{m.value}</p>
                <p className="mt-2 text-gray-600">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section className="py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-20">
            Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Security & Surveillance",
                icon: Eye,
                desc: "Real-time monitoring for borders, industries, campuses, and critical infrastructure.",
              },
              {
                title: "Disaster Response",
                icon: ShieldCheck,
                desc: "Rapid aerial assessment during floods, fires, earthquakes, and rescue missions.",
              },
              {
                title: "Mapping & Delivery",
                icon: MapPin,
                desc: "High-precision mapping and delivery of medical kits or sensors to remote areas.",
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-yellow-500/20 to-transparent rounded-3xl" />

                <div className="relative z-10">
                  <a.icon size={36} className="mb-4 text-gray-700" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {a.title}
                  </h3>
                  <p className="text-gray-600">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <AiInDrones />
      </section>

      {/* ================= FULL BANNER ================= */}
      <section className="relative w-full h-screen bg-white flex items-center justify-center">
        <Image
          src="/banners/mamba-banner.png"
          alt="CS-Mamba Banner"
          fill
          className="object-contain"
          priority
        />
      </section>

      {/* ================= TOGGLE SPECS / IMAGES ================= */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Explore CS-MAMBA
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
              <button
                onClick={() => setActiveTab("tech")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${activeTab === "tech"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600"
                  }`}
              >
                <Settings size={18} />
                Technical Specifications
              </button>

              <button
                onClick={() => setActiveTab("images")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${activeTab === "images"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600"
                  }`}
              >
                <ImageIcon size={18} />
                Images
              </button>
            </div>
          </div>

          {/* Toggle Content */}
          {activeTab === "tech" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: Timer, label: "Flight Time", value: "60 min" },
                { icon: Package, label: "Payload", value: "2 kg" },
                { icon: Eye, label: "Night Vision", value: "Supported" },
                {
                  icon: ShieldCheck,
                  label: "Obstacle Avoidance",
                  value: "Yes",
                },
                { icon: Wind, label: "Range", value: "11 Kms" },
                { icon: Gauge, label: "Mission Type", value: "Multi-Role" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white border border-gray-100 shadow"
                >
                  <f.icon className="mb-3 text-gray-700" />
                  <p className="text-sm text-gray-500">{f.label}</p>
                  <p className="text-lg font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "images" && <ImageStack />}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold">
            Intelligence. Precision. Reliability.
          </h2>

          <p className="mt-4 text-gray-300">
            CS-MAMBA delivers advanced aerial surveillance, mapping, and
            disaster-response capabilities engineered for mission-critical
            operations.
          </p>

          <Link href="/contact">
            <button className="mt-10 px-8 py-4 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition">
              Contact Our Team
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
