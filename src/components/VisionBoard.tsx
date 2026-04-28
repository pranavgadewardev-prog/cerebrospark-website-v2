"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionBoard() {
  return (
    <section className="relative py-10 bg-linear-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative text-center mb-20 px-4"
        >
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-72 h-72 bg-yellow-400/10 blur-3xl rounded-full" />
          </div>

          <p className="relative z-10 font-extrabold text-xl sm:text-3xl md:text-3xl leading-snug tracking-tight text-gray-900 max-w-4xl mx-auto">

            <span className="text-gray-800">
              Driving Innovation with
            </span>{" "}

            <span className="text-transparent bg-clip-text text-yellow-500">
              Clarity, Precision,
            </span>{" "}

            <span className="text-gray-800">
              and <span className="text-transparent bg-clip-text text-yellow-500">Purpose</span>
            </span>
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-linear-to-b from-transparent via-yellow-400 to-transparent" />

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-yellow-400 transition-shadow duration-300 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Eye className="text-yellow-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {/* To emerge as one of India’s most dynamic and multidimensional
                drone companies, delivering advanced aerial solutions that
                redefine performance, reliability, and innovation. */}
                To emerge as the most dynamic & multidimensional drone company
                in India.
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-yellow-400 transition-shadow duration-300 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                  <Target className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Mission
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {/* To focus on quality-driven drone manufacturing in India by
                continuously advancing technology, fostering engineering
                excellence, and maintaining a healthy, innovation-first work
                environment. */}
                Focus on quality-based manufacturing of drones in India with
                continuous technological advancement. <br /> Enhancement of existing
                drone technology for various innovative applications in all
                leading sectors.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
