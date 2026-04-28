"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe,
  Rocket,
  Users,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const glow: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FEATURES = [
  {
    title: "Advanced Drone Technology",
    desc: "Cutting-edge drone solutions designed for precision, efficiency, and performance.",
    icon: Rocket,
    points: ["High performance drones", "AI-powered analytics", "Precision control"],
  },
  {
    title: "Trusted & Reliable",
    desc: "Our systems are built with reliability and security as the foundation.",
    icon: ShieldCheck,
    points: ["Safe deployments", "Stable architecture", "Long-term reliability"],
  },
  {
    title: "Innovation Driven",
    desc: "We continuously push innovation to bring smarter aerial solutions.",
    icon: Zap,
    points: ["Modern engineering", "Smart automation", "Future-ready systems"],
  },
  {
    title: "Global Quality Standards",
    desc: "Our processes align with international engineering and quality standards.",
    icon: Globe,
    points: ["Scalable solutions", "Clean documentation", "Industry practices"],
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-yellow-50 py-20">
      {/* Background Glow */}
      <motion.div
        variants={glow}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-500/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-gray-900/10 blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-white/70 px-4 py-2 text-3xl font-semibold text-yellow-700 shadow-sm backdrop-blur">
            <Award className="h-8 w-8" />
            Why Choose Us
          </p>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Innovation. Reliability.{" "}
            <span className="text-yellow-600">Excellence.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-600">
            We combine advanced drone technology with reliable service and
            innovation-driven engineering to deliver exceptional aerial
            solutions.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {FEATURES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500/70 via-yellow-400/40 to-transparent" />

                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-500/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/15 ring-1 ring-yellow-500/25">
                    <Icon className="h-6 w-6 text-yellow-600" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-gray-600">{s.desc}</p>

                    <ul className="mt-5 space-y-2">
                      {s.points.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 text-sm font-semibold text-yellow-700">
                      Trusted technology • Proven reliability
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Built for innovation & trust
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 text-center"
        >
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/about"
            className="inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-6 py-3 font-bold text-gray-900 shadow-[0_18px_40px_rgba(234,179,8,0.25)] transition hover:bg-yellow-400"
          >
            Learn More About Us <ArrowUpRight className="h-5 w-5" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}