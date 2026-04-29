"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ShieldCheck,
  Gauge,
  Timer,
  Weight,
  Map,
  Camera,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { Settings, Image as ImageIcon } from "lucide-react";
import CsBheemImageStack from "@/components/imagestack/CsBheemImageStack";
import PopupBrochureForm from "@/components/popupBrochureForm";

export default function CSBheemPage() {
  const [activeTab, setActiveTab] = useState("tech");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[calc(100vh-64px)] lg:min-h-screen flex items-start lg:items-center pt-28 lg:pt-0">
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-orange-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-orange-100 text-orange-900 text-sm font-medium">
              Autonomous UAV • Tactical Payload • Defense Ready
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              CS-BHEEM
            </h1>

            <p className="text-lg text-gray-700 mt-1">
              Aerial Payload Striker UAV
            </p>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              High-precision autonomous UAV engineered for loitering, tactical
              payload deployment, and mission-critical operations. Designed for
              exceptional reliability and rapid response, CS-BHEEM enables
              defense logistics, surveillance, and emergency payload delivery in
              challenging environments.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {/* <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
                Download Brochure
              </button> */}
              {/* <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/brochures/CS_BHEEM_2.0.pdf";
                  link.download = "CS_BHEEM_2.0.pdf";
                  link.click();
                }}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Download Brochure
              </button> */}
              <button onClick={() => setOpen("CS-BHEEM")} className="bg-yellow-300 px-8 py-4 rounded-2xl text-black font-bold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Download Brochure
              </button>
              {open && (
                <PopupBrochureForm
                  brochureType={open}
                  onClose={() => setOpen(null)}
                />
              )}

              <Link href={'/login'}>
                <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition">
                  Purchase Now
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/drones/cs-bheem-images/cs-bheem.png"
              alt="CS-BHEEM UAV"
              width={700}
              height={500}
              className="mx-auto mt-12 lg:mt-0 hover:scale-105 transition-transform duration-300"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= PERFORMANCE ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Performance Highlights
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "20 kg", label: "Payload Capacity" },
              { value: ">30 min", label: "Flight Time" },
              { value: "10 km*", label: "Operational Range" },
              { value: "IP54", label: "Ingress Protection" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl shadow-lg hover:scale-105 transition bg-white"
              >
                <p className="text-3xl font-bold text-gray-900">{m.value}</p>
                <p className="mt-2 text-gray-600">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-20">
            Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Defense Logistics",
                icon: ShieldCheck,
                desc: "Ammunition and equipment delivery to remote defense units.",
              },
              {
                title: "Loitering Ammunition",
                icon: Package,
                desc: "Tactical loitering payload deployment and target engagement.",
              },
              {
                title: "Disaster Relief",
                icon: Map,
                desc: "Rapid delivery of medical supplies, vaccines, and emergency aid.",
              },
              {
                title: "Commercial & Industrial",
                icon: Gauge,
                desc: "Logistics support in remote or congested industrial environments.",
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border shadow-lg hover:shadow-xl transition"
              >
                <a.icon className="mb-4 text-gray-700" size={36} />
                <h3 className="text-xl font-semibold mb-3">{a.title}</h3>
                <p className="text-gray-600">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FULL BANNER ================= */}
      <section className="relative w-full h-screen bg-white flex items-center justify-center">
        <Image
          src="/banners/cs-bheem.png"
          alt="CS-Mamba Banner"
          fill
          className="object-contain"
          priority
        />
      </section>

      {/* ================= TECH SPECS ================= */}
      {/* <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Timer, label: "Endurance", value: ">30 minutes" },
              { icon: Package, label: "Payload Capacity", value: "20 kg" },
              { icon: Wind, label: "Wind Resistance", value: "36 km/h" },
              { icon: Map, label: "Max Launch Altitude", value: "3000 m AMSL" },
              { icon: Weight, label: "Operating Altitude", value: "500 m AGL" },
              {
                icon: Camera,
                label: "Camera Payload",
                value: "HD + Thermal Options",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white border shadow"
              >
                <f.icon className="mb-3 text-gray-700" />
                <p className="text-sm text-gray-500">{f.label}</p>
                <p className="text-lg font-semibold text-gray-900">{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      {/* ================= TOGGLE SECTION ================= */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6">
            Explore CS-BHEEM
          </h2>

          <p className="max-w-3xl mx-auto text-center text-gray-500 mb-14">
            Explore detailed technical specifications and operational visuals of
            the CS-BHEEM tactical UAV platform.
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-20">
            <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
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

          {/* Toggle Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* TECHNICAL SPECS */}
            {activeTab === "tech" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: Timer, label: "Endurance", value: ">30 minutes" },
                  { icon: Package, label: "Payload Capacity", value: "20 kg" },
                  { icon: Wind, label: "Wind Resistance", value: "36 km/h" },
                  {
                    icon: Map,
                    label: "Max Launch Altitude",
                    value: "3000 m AMSL",
                  },
                  {
                    icon: Weight,
                    label: "Operating Altitude",
                    value: "500 m AGL",
                  },
                  {
                    icon: Camera,
                    label: "Camera Payload",
                    value: "HD + Thermal Options",
                  },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="group relative p-7 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-xl transition-all hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-600 mb-4">
                      <f.icon size={22} />
                    </div>

                    <p className="text-sm text-gray-500 mb-1">{f.label}</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {f.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* IMAGE STACK */}
            {activeTab === "images" && (
              <div className="mt-10">
                <CsBheemImageStack />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold">Accuracy Beyond the Horizon</h2>
          <p className="mt-4 text-gray-300">
            Built for precision, endurance, and reliability — CS-BHEEM
            supports modern defense, disaster response, and industrial
            logistics.
          </p>

          <button className="mt-10 px-8 py-4 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition">
            Contact Our Team
          </button>
        </div>
      </section>
    </main>
  );
}
