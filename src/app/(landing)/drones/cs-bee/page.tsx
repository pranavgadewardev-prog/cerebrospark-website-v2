"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  PlayCircle,
  Video,
  RotateCw,
  ArrowUp,
  Home,
  Compass,
  Timer,
  Gauge,
  Weight,
} from "lucide-react";
import { useState } from "react";
import { Settings, Image as ImageIcon } from "lucide-react";
import CsBeeImageStack from "@/components/imagestack/CSBeeImageStack";

export default function CSBeePage() {
  const [activeTab, setActiveTab] = useState("tech");

  return (
    <main className="bg-white overflow-hidden">
      
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-linear-to-br from-yellow-50 via-white to-gray-100" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-100 text-yellow-900 text-sm font-medium">
              Toy Drone • Live Streaming • Learning
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              CS-BEE
            </h1>
            <p className="text-lg text-gray-700 mt-1">
              Lightweight Smart Quadcopter
            </p>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              The CS-BEE quadcopter is a lightweight technological marvel
              designed for learning, entertainment, and agile aerial operations.
              From live streaming and reconnaissance to serving as an ideal
              beginner-friendly toy drone, CS-BEE blends innovation with
              accessibility—making drone flying intuitive, fun, and educational.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {/* <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
                Download Brochure
              </button> */}
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/brochures/CS_BEE.pdf";
                  link.download = "CS_BEE.pdf";
                  link.click();
                }}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Download Brochure
              </button>
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
              src="/products/cs-bee.png"
              alt="CS-BEE Toy Drone"
              width={650}
              height={450}
              className="mx-auto hover:scale-105 transition-transform duration-300"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= KEY PERFORMANCE ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Performance Highlights
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "10 min", label: "Flight Time" },
              { value: "2–3 m/s", label: "Flying Speed" },
              { value: "720p", label: "Video Quality" },
              { value: "80 g", label: "Total Weight" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl shadow-lg shadow-stone-300 hover:scale-105 hover:shadow-yellow-300 transition-all bg-white"
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-20"
          >
            Applications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Toy Drone & Learning",
                icon: PlayCircle,
                desc: "Perfect for beginners and enthusiasts to learn drone controls, maneuvers, and flight fundamentals safely.",
              },
              {
                title: "Live Streaming",
                icon: Video,
                desc: "Capture smooth and agile aerial footage for events, hobbies, and creative content using 720p video support.",
              },
              {
                title: "Reconnaissance Support",
                icon: Compass,
                desc: "A compact and discreet platform suitable for short-range observation and real-time visual intelligence.",
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition"
              >
                <a.icon className="text-gray-700 mb-4" size={36} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {a.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FULL BANNER ================= */}
      <section className="relative w-full h-screen bg-white flex items-center justify-center">
        <Image
          src="/banners/4.jpg"
          alt="CS-Mamba Banner"
          fill
          className="object-contain"
          priority
        />
      </section>

      {/* ================= FEATURES ================= */}
      {/* <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-20"
          >
            Features & Specifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Timer, label: "Flight Time", value: "Up to 10 minutes" },
              { icon: Gauge, label: "Flying Speed", value: "2–3 m/s" },
              { icon: RotateCw, label: "360° Flip", value: "Supported" },
              { icon: Video, label: "Video Recording", value: "720p" },
              { icon: ArrowUp, label: "Altitude Hold", value: "Enabled" },
              {
                icon: Home,
                label: "Auto Take-off & Landing",
                value: "Supported",
              },
              { icon: Home, label: "Auto Return Home", value: "Enabled" },
              { icon: Compass, label: "Headless Mode", value: "Supported" },
              { icon: Weight, label: "Total Weight", value: "80 g" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white border border-gray-100 shadow"
              >
                <f.icon className="text-gray-700 mb-3" />
                <p className="text-sm text-gray-500">{f.label}</p>
                <p className="text-lg font-semibold text-gray-900">{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6"
          >
            Explore CS-BEE
          </motion.h2>

          <p className="max-w-3xl mx-auto text-center text-gray-500 mb-14">
            Switch between technical specifications and product visuals to
            better understand the CS-BEE quadcopter.
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-20">
            <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
              <button
                onClick={() => setActiveTab("tech")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
          ${
            activeTab === "tech"
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
          ${
            activeTab === "images"
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
            {/* TECH SPECS */}
            {activeTab === "tech" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Timer,
                    label: "Flight Time",
                    value: "Up to 10 minutes",
                  },
                  { icon: Gauge, label: "Flying Speed", value: "2–3 m/s" },
                  { icon: RotateCw, label: "360° Flip", value: "Supported" },
                  { icon: Video, label: "Video Recording", value: "720p" },
                  { icon: ArrowUp, label: "Altitude Hold", value: "Enabled" },
                  {
                    icon: Home,
                    label: "Auto Take-off & Landing",
                    value: "Supported",
                  },
                  { icon: Home, label: "Auto Return Home", value: "Enabled" },
                  { icon: Compass, label: "Headless Mode", value: "Supported" },
                  { icon: Weight, label: "Total Weight", value: "80 g" },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="group relative p-7 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-xl transition-all hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-yellow-500/10 text-yellow-600 mb-4">
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

            {/* IMAGE STACK (UPDATED) */}
            {activeTab === "images" && (
              <div className="mt-10">
                <CsBeeImageStack />
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
          <h2 className="text-4xl font-bold">Learn. Fly. Explore.</h2>
          <p className="mt-4 text-gray-300">
            CS-BEE makes drone flying accessible, fun, and intelligent—perfect
            for beginners, creators, and compact aerial missions.
          </p>

          <button className="mt-10 px-8 py-4 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition">
            Contact Our Team
          </button>
        </motion.div>
      </section>
    </main>
  );
}
