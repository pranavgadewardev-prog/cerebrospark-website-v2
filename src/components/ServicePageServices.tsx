"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Globe,
  ShieldCheck,
  Headphones,
  Rocket,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Variants } from "framer-motion";

const container : Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item : Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const glow : Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const SERVICES = [
  {
    title: "On-Site Support",
    desc: "Hands-on assistance at your location for seamless execution and quick resolutions.",
    icon: Headphones,
    points: ["Instant issue handling", "Hardware & setup support", "Zero downtime focus"],
  },
  {
    title: "Fast Service Delivery",
    desc: "Speed-first workflows designed to ship updates and solutions without compromising quality.",
    icon: Zap,
    points: ["Quick turnaround", "Agile delivery cycles", "Performance optimized"],
  },
  {
    title: "Secure & Reliable",
    desc: "We follow best practices to keep your systems stable, protected, and future-ready.",
    icon: ShieldCheck,
    points: ["Safe deployments", "Backups & monitoring", "Stable architecture"],
  },
  {
    title: "Global Standards",
    desc: "Modern tools and clean processes aligned with industry-grade engineering standards.",
    icon: Globe,
    points: ["Scalable solutions", "Clean documentation", "Maintainable codebase"],
  },
];

export default function OnSiteFastServices() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-yellow-50 py-20">
      {/* Background accents */}
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
            <Rocket className="h-8 w-8" />
            On-Site & Fast Services
          </p>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Fast execution. On-site support.{" "}
            <span className="text-yellow-600">Zero friction.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-600">
            We deliver quick solutions with real-time coordination — whether it’s on your
            premises or deployed at speed with precision.
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
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur"
              >
                {/* top highlight */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500/70 via-yellow-400/40 to-transparent" />

                {/* glow on hover */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-500/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/15 ring-1 ring-yellow-500/25">
                    <Icon className="h-6 w-6 text-yellow-600" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                    <p className="mt-2 text-gray-600">{s.desc}</p>

                    <ul className="mt-5 space-y-2">
                      {s.points.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-yellow-700">
                      <Clock className="h-4 w-4" />
                      Quick response • Smooth delivery
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Built for speed & reliability
                  </span>

                  {/* <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-yellow-400 shadow-md transition hover:bg-gray-800"
                  >
                    Learn More <ArrowUpRight className="h-4 w-4" />
                  </motion.button> */}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center justify-center gap-4 text-center"
        >
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white/80 px-5 py-3 text-gray-700 shadow-sm backdrop-blur">
              <span className="font-bold text-gray-900">Need immediate support?</span>{" "}
              We’re ready to assist on-site or deliver fast remotely.
            </div>

            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-6 py-3 font-bold text-gray-900 shadow-[0_18px_40px_rgba(234,179,8,0.25)] transition hover:bg-yellow-400"
            >
              Request Service <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          </div>

          <p className="text-sm text-gray-500">
            Trusted workflows • Faster delivery • On-site availability
          </p>
        </motion.div>
      </div>
    </section>
  );
}
