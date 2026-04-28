"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  location: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Vishnav Sonawane",
    location: "Baramati, Maharashtra",
    content:
      "Adopting drone technology completely changed my journey in agriculture. With the support from Cerebrospark Innovations, I was able to start my own spraying business, and today I cover 25-30 acres daily. Not only did I recover my investment quickly, but I also expanded into a plant nursery and seed production business. This has helped me create additional income and even provide employment in my village. Today, I am running multiple income streams confidently, something I never imagined before."
  },
  {
    name: "Dnyaneshwar Dalvi",
    location: "Rahuri, Maharashtra",
    content:
      "I was running a water supply business, but I was looking for something more scalable. When I discovered agricultural drones, I saw a huge opportunity. After starting my drone spraying services, I repaid my entire loan in just 4 months and recovered my investment within 7-8 months. Today, I manage two income sources and have even started building my own house. This technology has truly brought financial stability to my life."
  },
  {
    name: "Shivaji Kanade",
    location: "Ahilyanagar, Maharashtra",
    content:
      "Earlier, I used to spray manually, covering only 4-5 acres a day while being exposed to harmful chemicals. It was exhausting and risky. After switching to the CS_KRISHI_10L drone, everything changed. Now I can spray 25-30 acres daily without any direct exposure to pesticides. I repaid my loan within just a few months and today I earn ₹30,000-₹40,000 per day. This has transformed my business into a safe, profitable, and scalable venture."
  }
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 via-white to-yellow-50 flex justify-center px-4 overflow-x-hidden">
      <div className="w-full max-w-4xl text-center">

        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-900">
          Real Stories.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
            Real Impact.
          </span>
        </h2>

        <div className="relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white p-8 sm:p-10 rounded-2xl border border-yellow-100 shadow-[0_10px_30px_rgba(250,204,21,0.15)]"
            >
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" />

              <p className="text-gray-600 text-lg leading-relaxed mb-6 relative z-10">
                &quot;{testimonials[index].content}&quot;
              </p>

              <h3 className="text-xl font-bold text-gray-900 relative z-10">
                {testimonials[index].name}
              </h3>

              <p className="text-sm text-gray-500 relative z-10">
                {testimonials[index].location}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Prev
            </button>
            <button
              onClick={next}
              className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg hover:opacity-90 transition font-semibold shadow-md"
            >
              Next
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-5 gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 scale-110"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}