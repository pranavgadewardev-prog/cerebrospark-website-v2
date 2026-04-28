"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Drone,
  Wheat,
  Bot,
  Lightbulb,
  Trophy,
  Medal,
  Award,
  Users,
  Presentation,
  Gift,
  UserPlus,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SparkathonPage() {
  return (
    <main className="bg-white text-black selection:bg-yellow-200 font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          src="/sparkathon/sparkathon.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.2em] text-yellow-400 uppercase border border-yellow-400/30 rounded-full bg-yellow-400/10 backdrop-blur-sm">
              National Level 24-Hour Hackathon
            </span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8">
              Spark<span className="text-yellow-500">athon</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl font-bold md:text-2xl text-gray-300 leading-relaxed mb-10">
              Where engineering meets entrepreneurship. Join 4,000+ innovators building the future of India.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ================= STATS / ABOUT ================= */}
      <section id="about" className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
          >
            <div>
              <h2 className="text-5xl font-semibold mb-8 tracking-tight leading-[1.1]">
                Empowering the next wave of startups.
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                Sparkathon is more than a contest; it&apos;s a catalyst. In association with JSPM&apos;s JSCOE, we provide the industrial guidance and incubation support to take your idea from a 24-hour prototype to a market-ready startup.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-2">
                <div className="text-6xl font-bold tracking-tighter">4k+</div>
                <div className="text-gray-400 uppercase tracking-widest text-xs font-bold">Participants</div>
              </div>
              <div className="space-y-2">
                <div className="text-6xl font-bold tracking-tighter">1k+</div>
                <div className="text-gray-400 uppercase tracking-widest text-xs font-bold">Teams</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROBLEM STATEMENTS (BENTO GRID) ================= */}
      {/* <section id="tracks" className="py-32 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">Focus Tracks</h2>
            <p className="text-gray-500 text-xl mt-6 max-w-xl font-light">Choose a domain that sparks your curiosity and solve high-impact problems.</p>
          </header>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-6 gap-6"
          >
            <ProblemCard
              className="md:col-span-3"
              icon={<Drone size={36} />}
              title="Drones"
              description="Revolutionize logistics, defense, and emergency response using autonomous aerial systems."
              points={["Medical Delivery", "Search & Rescue", "Drone Swarms"]}
            />
            <ProblemCard
              className="md:col-span-3"
              icon={<Bot size={36} />}
              title="Robotics"
              description="Design intelligent machines that interact with the physical world in groundbreaking ways."
              points={["Autonomous Bots", "Robotic Arms", "AI/ML Systems"]}
            />
            <ProblemCard
              className="md:col-span-2"
              icon={<Wheat size={36} />}
              title="Agri-Tech"
              description="Modernizing the backbone of our nation through technology."
              points={["Smart Irrigation", "IoT Crop Yield", "UAV Mapping"]}
            />
            <ProblemCard
              className="md:col-span-4 bg-black text-white"
              icon={<Lightbulb size={36} className="text-yellow-400" />}
              title="Open Category"
              description="Have a disruptive idea that doesn't fit a box? This track is for the true rebels and visionaries."
              points={["Creative Solutions", "Social Impact", "Sustainability"]}
              dark
            />
          </motion.div>
        </div>
      </section> */}
      <section id="tracks" className="py-32 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
              Focus Tracks
            </h2>
            <p className="text-gray-500 text-xl mt-6 max-w-xl font-light">
              Choose a domain that sparks your curiosity and solve high-impact problems.
            </p>
          </header>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <ProblemCard
              icon={<Drone size={36} className="text-yellow-400" />}
              title="Drones"
              description="Revolutionize logistics, defense, and emergency response using autonomous aerial systems."
              points={["Medical Delivery", "Search & Rescue", "Drone Swarms"]}
            />

            <ProblemCard
              icon={<Bot size={36} className="text-yellow-400" />}
              title="Robotics"
              description="Design intelligent machines that interact with the physical world in groundbreaking ways."
              points={["Autonomous Bots", "Robotic Arms", "AI/ML Systems"]}
            />

            <ProblemCard
              icon={<Wheat size={36} className="text-yellow-400" />}
              title="Agri-Tech"
              description="Modernizing the backbone of our nation through technology."
              points={["Smart Irrigation", "IoT Crop Yield", "UAV Mapping"]}
            />

            <ProblemCard
              icon={<Lightbulb size={36} className="text-yellow-400" />}
              title="Open Category"
              description="Have a disruptive idea that doesn't fit a box? This track is for the true rebels and visionaries."
              points={["Creative Solutions", "Social Impact", "Sustainability"]}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= REGISTRATION INFO ================= */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[50px] p-12 md:p-24 border border-gray-100"
          >
            <UserPlus className="mx-auto text-yellow-500 mb-8" size={56} />
            <h2 className="text-4xl font-semibold mb-6 tracking-tight">Ready to build?</h2>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
              Don&apos;t wait for the perfect idea to strike. Register now to secure your spot. You can submit and refine your project details later via our participant dashboard.
            </p>
            {/* <button className="text-blue-600 font-semibold text-lg flex items-center gap-1 mx-auto group">
              Register your team <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button> */}
          </motion.div>
        </div>
      </section>

      {/* ================= PRIZES ================= */}
      <section id="prizes" className="py-32 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-semibold mb-24 text-center tracking-tight">Recognition & Rewards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-end">
            <PrizeCard icon={<Medal size={48} />} rank="Runner Up" title="Silver Medalist" />
            <PrizeCard icon={<Trophy size={72} className="text-yellow-400" />} rank="Winner" title="The Grand Prize" featured />
            <PrizeCard icon={<Award size={48} />} rank="Second Runner Up" title="Bronze Medalist" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: <Users size={20} />, label: "Best Performer" },
              { icon: <Presentation size={20} />, label: "Best Pitch" },
              { icon: <Gift size={20} />, label: "Swag Bags" },
              { icon: <Users size={20} />, label: "Women in Tech" },
              { icon: <Users size={20} />, label: "Team Spirit" },
              { icon: <Users size={20} />, label: "Top College" },
            ].map((award, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center gap-4 text-center transition-colors"
              >
                <div className="text-yellow-400">{award.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{award.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= REFINED COMPONENTS ================= */

function ProblemCard({
  icon,
  title,
  description,
  points,
  className = "",
  dark = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
  className?: string;
  dark?: boolean
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      className={`p-12 rounded-[40px] transition-all duration-500 flex flex-col justify-between group ${className} ${dark ? 'bg-black shadow-2xl' : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'}`}
    >
      <div>
        <div className={`mb-8 transition-transform group-hover:scale-110 duration-500 ${dark ? 'text-white' : 'text-black'}`}>{icon}</div>
        <h3 className="text-3xl font-semibold mb-6 tracking-tight">{title}</h3>
        <p className={`text-lg mb-10 leading-relaxed font-light ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
      </div>
      <ul className="space-y-4">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-sm font-medium">
            <div className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-yellow-400' : 'bg-black'}`} />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PrizeCard({
  icon,
  rank,
  title,
  featured = false
}: {
  icon: React.ReactNode;
  rank: string;
  title: string;
  featured?: boolean
}) {
  return (
    <motion.div
      whileHover={{ scale: featured ? 1.05 : 1.02 }}
      className={`relative p-12 rounded-[48px] border transition-all text-center ${featured
        ? "bg-gradient-to-b from-white/15 to-white/5 border-white/20 pb-20 pt-16 z-10 shadow-[0_0_80px_-15px_rgba(250,204,21,0.2)]"
        : "bg-white/5 border-white/10 pb-16"
        }`}
    >
      <div className="flex justify-center mb-8">{icon}</div>
      <div className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em] mb-3">{rank}</div>
      <h4 className="text-2xl font-bold tracking-tight">{title}</h4>
      {featured && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-tighter">
          Top Honors
        </div>
      )}
    </motion.div>
  );
}