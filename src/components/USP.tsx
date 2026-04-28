// 

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ===================== DATA ===================== */

const USP_ITEMS = [
  { title: "Research & Development", image: "/usp/rd.jpeg" },
  { title: "Manufacturing", image: "/usp/manufacturing_2.jpg" },
  // { title: "Delivery", image: "/usp/delivery_2.jpeg" },
  { title: "Services", image: "/usp/services.jpeg" },
  // { title: "After Sales Support", image: "/usp/support.jpeg" },
  { title: "Training", image: "/usp/rpto - training.jpeg" },
];

/* ===================== COMPONENT ===================== */

export default function USPSection() {
  const [open, setOpen] = useState(false);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!open) return;

    gsap.fromTo(
      rowsRef.current,
      { y: 30, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      }
    );
  }, [open]);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-400 via-yellow-400 to-gray-700 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div
          className="relative rounded-[2rem] sm:rounded-[3rem] px-6 py-12 sm:py-20 flex items-center justify-center overflow-visible bg-gradient-to-br from-[#1c1c38] to-[#0d0d1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,80,0.1),transparent_70%)] opacity-50" />

          {/* GLIDING DRONE BUTTON */}
          <motion.button
            onClick={() => setOpen((p) => !p)}
            initial={false}
            animate={{
              x: open ? "clamp(80px, 32vw, 420px)" : "clamp(-420px, -32vw, -80px)",
              // Lean into the movement: Tilt right when moving right, left when moving left
              rotateZ: open ? 12 : -12,
              // Constant hovering "bob" effect
              y: [0, -10, 0]
            }}
            transition={{
              x: { type: "spring", stiffness: 40, damping: 15 }, // Slower, "heavier" glide
              rotateZ: { type: "spring", stiffness: 50, damping: 20 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" } // Infinite hover
            }}
            className="absolute z-20 w-24 h-24 sm:w-40 sm:h-40 lg:w-52 lg:h-52 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <motion.div
              // Adding a secondary subtle "wobble" to the drone body
              animate={{ rotateX: [0, 5, 0, -5, 0], rotateY: [0, 8, 0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full h-full drop-shadow-[0_15px_35px_rgba(250,204,21,0.4)]"
            >
              {/* <h1 className="absolute inset-0  text-white font-bold text-xl sm:text-2xl">CLICK ME</h1> */}
              <h1 className="absolute inset-0 text-white font-bold text-sm sm:text-base md:text-lg lg:text-2xl">
                CLICK ME
              </h1>
              <Image
                src="/drones/cs-krishi-images/cs-krishi.png"
                alt="Toggle USP"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.button>

          {/* CENTERED TEXT CONTENT */}
          <div className="relative z-10 text-center pointer-events-none select-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? "open" : "closed"}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -10 }}
                transition={{ duration: 0.6, ease: "circOut" }}
              >
                <p className="text-white font-bold uppercase tracking-wide mb-2 text-sm sm:text-base lg:text-lg">
                  {open ? "Click Again To Close The USP" : "Click The Drone To View Our USP"}
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter italic">
                  {!open ? "Everything. Under One Roof." : "Unified Sales Proposition"}
                </h2>
              </motion.div>
            </AnimatePresence>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-400 font-medium max-w-lg mx-auto leading-relaxed">
              From innovation to execution, we deliver a complete drone
              ecosystem built for scale, precision, and trust.
            </p>
          </div>
        </div>

        {/* ================= DROPDOWN CONTENT ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 sm:mt-20"
            >
              <div className="grid grid-cols-1 gap-8 sm:gap-12">
                {USP_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    ref={(el) => { if (el) rowsRef.current[i] = el; }}
                    whileHover={{ scale: 1.01 }}
                    className="group relative flex flex-col md:flex-row w-full min-h-[200px] md:h-[280px] rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-white"
                  >
                    <div className="relative z-10 w-full md:w-1/2 flex items-center px-8 sm:px-14 py-10 md:py-0 bg-white md:bg-transparent">
                      <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400 group-hover:w-4 transition-all duration-300" />
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-neutral-900">
                        {item.title}
                      </h3>
                    </div>

                    <div className="relative w-full md:w-1/2 h-[220px] md:h-full overflow-hidden">
                      <div className="absolute inset-0 z-10 hidden md:block bg-gradient-to-r from-white via-white/70 to-transparent w-1" />
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}