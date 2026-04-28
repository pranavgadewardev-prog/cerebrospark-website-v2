"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PopupBrochureForm from "@/components/popupBrochureForm";

gsap.registerPlugin(ScrollTrigger);

const DRONE_IMAGES = [
  "/drones/cs-krishi-images/cs-krishi-10l.png",
  "/drones/cs-krishi-images/cs-krishi-1.png",
  "/drones/cs-krishi-images/cs-krishi-2.png",
  "/drones/cs-krishi-images/cs-krishi-3.png",
  "/drones/cs-krishi-images/cs-krishi-4.png",
  "/drones/cs-krishi-images/cs-krishi-5.png",
  "/drones/cs-krishi-images/cs-krishi-6.png",
  "/drones/cs-krishi-images/cs-krishi-7.png",
  "/drones/cs-krishi-images/cs-krishi-8.png",
];

const METRICS = [
  { value: 50000, suffix: "+", label: "Acres Served" },
  { value: 20000, suffix: "+", label: "Farmer Benefitted" },
  { value: 20, suffix: "+", label: "Crops Covered" },
  { value: 10000, suffix: "+", label: "Villages Served" },
];

export default function CSKrishiPage() {
  const [activeImage, setActiveImage] = useState(DRONE_IMAGES[0]);

  const metricsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= PARALLAX VIDEO ================= */
      if (videoRef.current && heroRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ================= COUNTER ANIMATION ================= */
      counterRefs.current.forEach((counter, i) => {
        if (!counter) return;
        const target = METRICS[i].value;
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 85%",
            },
            onUpdate: function () {
              const value = Math.floor(Number((this.targets()[0] as HTMLElement).innerText));
              counter.innerText = value + METRICS[i].suffix;
            },
          }
        );
      });

      /* ================= METRIC CARD ANIMATION ================= */
      if (metricsRef.current) {
        gsap.fromTo(
          metricsRef.current.children,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative z-0 overflow-hidden bg-neutral-950 text-white selection:bg-yellow-500/30">

      {/* ================= BACKGROUND VIDEO ================= */}
      <div ref={heroRef} className="absolute inset-0 z-0 h-full w-full">
        <div ref={videoRef} className="relative h-full w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-50"
          >
            <source src="/featured/hero_2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-[1] min-h-[85vh] flex flex-col justify-center pt-6 lg:pt-0 pb-10">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs md:text-sm font-medium tracking-wide backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Agriculture Drone
            </motion.span>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9]"
            >
              CS_
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                KRISHI_10L
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 mt-4 md:mt-6 font-medium leading-relaxed"
            >
              The future of farming is here. <br className="hidden md:block" />
              <span className="text-yellow-400">
                Next-gen spraying precision.
              </span>
            </motion.p>

            <motion.div
              className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <div className="z-2 text-black">
                <button onClick={() => setOpen("cs-krishi")} className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Download Brochure
                </button>
                {open && (
                  <PopupBrochureForm
                    brochureType={open}
                    onClose={() => setOpen(null)}
                  />
                )}
              </div>

              <Link href="/drones/cs_krishi_10L" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all font-semibold">
                  Technical Specifications
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT GALLERY */}
          <div className="order-1 lg:order-2 relative flex flex-col items-center gap-4 md:gap-8">
            <div className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeImage}
                    alt="CS-Krishi Drone"
                    fill
                    className="object-contain p-4 md:p-10"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Scroll - Refined for Touch devices */}
            <div className="w-full flex gap-3 overflow-x-auto pb-4 px-2 snap-x touch-pan-x scrollbar-hide p-2">
              {DRONE_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden backdrop-blur-md bg-white/15 border border-white/5 transition-all duration-300 snap-center ${activeImage === img
                    ? "ring-2 ring-yellow-400 scale-105 shadow-lg"
                    : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= METRICS SECTION ================= */}
      <section className="relative z-0 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero/hero_services3.jpg"
            alt="Efficiency Background"
            className="w-full h-full object-cover"
          />
          {/* Added overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Impact by CS_KRISHI_10L
            </h2>
            <div className="h-1.5 w-20 bg-yellow-500 rounded-full" />
          </div>

          <div
            ref={metricsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {METRICS.map((metric, i) => (
              <div
                key={i}
                className="group relative text-center bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:border-yellow-500/50 transition-all duration-500"
              >
                <p className="text-4xl md:text-6xl font-black text-white group-hover:text-yellow-400 transition-colors">
                  <span
                    ref={(el) => {
                      counterRefs.current[i] = el;
                    }}
                  >
                    0{metric.suffix}
                  </span>
                </p>
                <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-400 font-medium group-hover:text-gray-200 transition-colors uppercase tracking-wider">
                  {metric.label}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-500 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}