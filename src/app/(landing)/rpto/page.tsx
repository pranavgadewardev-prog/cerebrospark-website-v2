"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ======================================================
    DATA
====================================================== */

interface Recruiters {
  image: string;
  name: string;
}

const recruiterimage: Recruiters[] = [
  // {
  //   name: "Cerebrospark",
  //   image: "/partners/cerebrospark.png",
  // },
  {
    name: "techbot",
    image: "/partners/techbot.png",
  },
];

interface Partners {
  image: string;
  name: string;
}

const partnersimages: Partners[] = [
  { name: "JSCOE", image: "/partners/jscoe.png" },
  { name: "JSPM", image: "/partners/jspm.png" },
  { name: "MIT", image: "/partners/mit.png" },
  { name: "AISSMS", image: "/partners/aissms.png" },
  { name: "VNMKV", image: "/partners/krushi.png" },
  { name: "DPES", image: "/partners/dpes.png" },
];

const slides = [
  { image: "/rpto/img1.png" },
  { image: "/rpto/img2.png" },
  { image: "/rpto/img3.png" },
  { image: "/rpto/img4.png" },
  { image: "/rpto/img5.png" },
  { image: "/rpto/img6.png" },
  { image: "/rpto/img7.png" },
];

const timelineSteps = [
  {
    title: "Theory Classes",
    description: "Comprehensive theoretical knowledge of RPAS operations.",
    image: "/DGCA/img1.png",
  },
  {
    title: "Simulator Training",
    description: "Practice in a controlled virtual environment.",
    image: "/DGCA/img2.png",
  },
  {
    title: "Ground Training",
    description: "Hands-on training for pre-flight checks and procedures.",
    image: "/rpto/Ground Training.png",
  },
  {
    title: "UAS Flying",
    description: "Real-world flying experience under certified instructors.",
    image: "/rpto/UAS.png",
  },
  {
    title: "Practice Sessions",
    description: "Skill refinement through repeated supervised practice.",
    image: "/rpto/practice_2.png",
  },
];

const rptoofficials = [
  {
    name: "Rushikesh Sonawane",
    description: "Accountable Manager",
    description2: "Remote Pilot Instructor",
    title: "(Small + Medium)",
    mobile: "+91 7499884991",
    image: "/people/Rushikesh Sonawane.png",
  },
  {
    name: "Mihir Kedar",
    description: "Chief Remote Pilot Instructor",
    title: "(Small + Medium)",
    mobile: "+91 7387515448",
    image: "/people/Mihir Kedar.png",
  },
];

export default function RPTOPage() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative bg-[#fcfcfd] text-slate-900 overflow-x-hidden font-sans w-full"
    >
      <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:h-[calc(100vh-80px)] overflow-hidden bg-black">

        {/* SLIDER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* <Image
              src={slides[index].image}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center sm:object-[center_top]"
            /> */}
            <Image
              src={slides[index].image}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-contain sm:object-cover object-center sm:object-[center_top]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          </motion.div>
        </AnimatePresence>

        {/* DOTS (Premium UI + Progress Animation) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20 shadow-lg">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-2 rounded-full overflow-hidden bg-white/30 transition-all duration-500"
              style={{
                width: i === index ? "40px" : "10px",
              }}
            >
              {i === index && (
                <motion.div
                  key={index}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute left-0 top-0 h-full bg-yellow-400"
                />
              )}
            </button>
          ))}
        </div>

      </section>

      {/* About Section - Fluid Text */}
      <section className="py-12 md:py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-xs sm:text-sm font-bold text-yellow-600 uppercase tracking-[0.2em] mb-4">
              Cerebrospark Academy
            </h2>
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 text-slate-900 leading-tight">
              DGCA Authorised Remote Pilot Training
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
              Maharashtra&apos;s leading RPTO committed to safety, excellence, and
              regulatory compliance. We don&apos;t just teach you to fly; we
              prepare you for a career in the skies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - Improved Grid responsiveness */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#eab308 0.5px, transparent 0.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
              Training Methodology
            </h2>
            <div className="h-1 w-16 md:w-20 bg-yellow-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-slate-800/50 p-5 rounded-3xl border border-white/5 hover:border-yellow-500/50 transition-all"
              >
                <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-yellow-500 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full">
                    Step {i + 1}
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Duration - Flex/Grid Sync */}
      <section className="py-16 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-xl flex flex-col justify-center"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              Course Duration
            </h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-7xl sm:text-8xl font-black text-yellow-500">
                05
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-slate-400 uppercase tracking-widest">
                Days
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              An intensive, DGCA-approved curriculum covering theory,
              high-fidelity simulation, and live flight operations.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-900 text-white shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8">
              Eligibility Criteria
            </h3>
            <ul className="space-y-4 sm:space-y-6">
              {[
                { label: "Minimum Qualification", val: "10th / SSC Pass" },
                { label: "Age Requirement", val: "18 – 65 Years" },
                { label: "Medical Standing", val: "DGCA Medically Fit" },
                { label: "Documentation", val: "Passport / Driving License / Voter ID / Ration Card + Masked Aadhaar + Pan Card" },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between border-b border-white/10 pb-3 gap-5"
                >
                  <span className="text-slate-400 text-[12px] uppercase font-bold tracking-widest">
                    {item.label}
                  </span>
                  <span className="font-semibold text-right text-sm sm:text-base">
                    {item.val}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Facilities - Robust Responsive Grid */}
      <section className="relative py-16 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Facilities & Infrastructure
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              World-class infrastructure designed to deliver DGCA-compliant,
              industry-ready drone pilot training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              {
                title: "100% Placement Assistance",
                desc: "Career guidance, interview preparation, and recruiter connections.",
                icon: "🎓",
              },
              {
                title: "DGCA Approved Training Drones",
                desc: "Certified small-class RPAS for real-world flying experience.",
                icon: "🚁",
              },
              {
                title: "On-Campus Lodging & Boarding",
                desc: "Comfortable stay facilities for outstation trainees.",
                icon: "🏫",
              },
              {
                title: "Expert Instructors",
                desc: "Highly skilled and experienced DGCA-certified trainers.",
                icon: "👨‍🏫",
              },
              {
                title: "Advanced Drone Laboratory",
                desc: "Hands-on assembly, dismantling, and maintenance kits.",
                icon: "🧰",
              },
              {
                title: "Smart Classrooms & Simulator",
                desc: "Latest flight simulators, smart classrooms, and lecture halls.",
                icon: "🖥️",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-2xl mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Recruiters - Optimized for Mobile Tapping/Viewing */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="mb-20 w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-10 text-gray-800">
              Our Partners
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {partnersimages.map((partner, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center border border-gray-100 rounded-xl p-4 transition-all bg-white hover:shadow-lg hover:shadow-yellow-400/20"
                >
                  <div className="relative w-full h-20 sm:h-24">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 mt-2">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-10 text-gray-800">
              Our Recruiters
            </h2>
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
                {recruiterimage.map((recruiter, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center border border-gray-100 rounded-xl p-6 transition-all bg-white hover:shadow-lg hover:shadow-yellow-400/20"
                  >
                    <div className="relative w-full h-20">
                      <img
                        src={recruiter.image}
                        alt={recruiter.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700 mt-2">
                      {recruiter.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Leadership - Adjusted Mobile Flex */}
      <section className="py-12 md:py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900">
              Training Leadership
            </h2>
            <p className="text-slate-500 mt-4 text-sm sm:text-base">
              Authorized personnel ensuring the highest training standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {rptoofficials.map((official, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-6 md:gap-8 items-center"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0">
                  <Image
                    src={official.image}
                    alt={official.name}
                    fill
                    sizes="(max-width: 768px) 112px, 160px"
                    className="object-cover rounded-2xl md:rounded-3xl"
                  />
                </div>
                <div className="flex flex-col text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {official.name}
                  </h4>
                  <p className="text-yellow-600 font-semibold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider">
                    {official.description} <br />
                    {official.description2}
                  </p>
                  <p className="text-yellow-600 font-semibold text-[10px] sm:text-xs md:text-sm mb-2 uppercase tracking-wider">
                    {official.title}
                  </p>
                  <div className="bg-slate-50 px-4 py-2 rounded-lg inline-block w-fit mx-auto sm:mx-0">
                    <span className="text-slate-900 font-mono font-bold text-sm sm:text-base">
                      {official.mobile}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full width padding fix */}
      <section className="py-12 md:py-24 px-6">
        <motion.div
          className="max-w-5xl mx-auto rounded-[2rem] sm:rounded-[3rem] bg-yellow-500 p-8 sm:p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          whileInView={{ scale: [0.98, 1] }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              LAUNCH YOUR CAREER
            </h2>
            <p className="text-slate-900/70 mb-8 sm:mb-10 max-w-lg mx-auto font-medium text-sm sm:text-base">
              Enroll in the upcoming batch at our DGCA Authorised RPTO in Pune.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-full text-base sm:text-lg font-bold shadow-xl"
              onClick={() => {
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeeFSPBkRZUhQqiJ1QYoUf8ID6lRUbc06QWixNa11RFqiSPnw/viewform"
                );
              }}
            >
              Get Started Today
            </motion.button>
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 bg-white/20 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </main>
  );
}