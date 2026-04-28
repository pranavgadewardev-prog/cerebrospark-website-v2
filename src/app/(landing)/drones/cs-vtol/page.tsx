"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Radar,
  MapPin,
  Package,
  Gauge,
  Timer,
  Wind,
  Plane
} from "lucide-react";

export default function CSVtolPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[calc(100vh-64px)] lg:min-h-screen flex items-start lg:items-center pt-28 lg:pt-0">
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-sky-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-sky-100 text-sky-900 text-sm font-medium">
              Mapping • Surveillance • Delivery
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              CS-VTOL
            </h1>
            <p className="text-lg text-gray-700 mt-1">
              Mapping & Surveillance Drone
            </p>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              CS-VTOL is a next-generation vertical takeoff and landing drone that
              combines the hovering precision of multi-rotor platforms with the
              endurance and range of fixed-wing aircraft. Designed for long-range
              surveillance, high-resolution mapping, and payload delivery, it
              delivers exceptional performance across diverse mission profiles.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
                Enquire
              </button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/products/cs-vtol.png"
              alt="CS-VTOL Mapping and Surveillance Drone"
              width={700}
              height={500}
              className="mx-auto mt-12 lg:mt-0 hover:scale-105 transition-transform duration-300"
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
              { value: "3 Hours", label: "Flight Endurance" },
              { value: "100 km", label: "Operational Range" },
              { value: "70 km/h", label: "Cruise Speed" },
              { value: "2–5 kg", label: "Payload Capacity" }
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl shadow-lg shadow-stone-300 hover:scale-105 hover:shadow-sky-300 transition-all bg-white"
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
                title: "Surveillance",
                icon: Radar,
                desc:
                  "Wide-area aerial surveillance with real-time intelligence gathering for border security, infrastructure, and critical operations."
              },
              {
                title: "Mapping",
                icon: MapPin,
                desc:
                  "High-resolution aerial mapping for land surveys, urban planning, environmental monitoring, and infrastructure development."
              },
              {
                title: "Delivery",
                icon: Package,
                desc:
                  "Efficient transportation of essential supplies, sensors, or small packages across long distances and remote areas."
              }
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

      {/* ================= TECHNICAL SPECIFICATIONS ================= */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-20"
          >
            Technical Specifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Timer, label: "Flight Time", value: "Up to 3 Hours" },
              { icon: Wind, label: "Cruise Speed", value: "70 km/h" },
              { icon: Gauge, label: "Operational Range", value: "100 km" },
              { icon: Package, label: "Payload Capacity", value: "2–5 kg" },
              { icon: Plane, label: "VTOL Capability", value: "Vertical Takeoff & Landing" }
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
            Long-Range Intelligence, Redefined
          </h2>
          <p className="mt-4 text-gray-300">
            CS-VTOL delivers unmatched endurance, range, and operational
            flexibility—empowering surveillance, mapping, and logistics missions
            across industries.
          </p>

          <button className="mt-10 px-8 py-4 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition">
            Contact Our Team
          </button>
        </motion.div>
      </section>

    </main>
  );
}
