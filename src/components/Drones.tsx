// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import React, { useMemo, useRef, useState } from "react";
// import { ArrowUpRight } from "lucide-react";

// interface Drone {
//   name: string;
//   description: string;
//   image: string;
//   bgImage: string;
//   link: string;
//   tag: string;
// }

// const drones: Drone[] = [
//   {
//     name: "CS_KRISHI_10L",
//     tag: "AGRI • SPRAYING • PRECISION",
//     description: "CS-Krishi is an innovative agriculture spraying drone designed to revolutionize crop management practices. Its ability to access difficult-to-reach areas ensures uniform coverage and optimal crop health.",
//     image: "/drones/cs-krishi-images/cs-krishi.png",
//     bgImage: "/drones_bg/bg_1.jpg",
//     link: "/drones/cs_krishi_10L",
//   },
//   {
//     name: "CS-MAMBA",
//     tag: "SURVEILLANCE • MAPPING • RESPONSE",
//     description: "The CS-MAMBA quadcopter represents a pioneering advancement in drone technology with multifaceted capabilities including surveillance, disaster management, and mapping.",
//     image: "/drones/cs-mamba-images/cs-mamba.png",
//     bgImage: "/drones_bg/bg_3.jpg",
//     link: "/drones/cs-mamba",
//   },
//   {
//     name: "CS-BEE",
//     tag: "LIGHTWEIGHT • STREAMING • TRAINING",
//     description: "The CS-BEE quadcopter is lightweight and versatile — ideal for live streaming, learning flight fundamentals, and rapid indoor/outdoor operations.",
//     image: "/drones/cs-bee-images/cs-bee.png",
//     bgImage: "/drones_bg/bg_2.jpg",
//     link: "/drones/cs-bee",
//   },
//   {
//     name: "CS-PRIDE",
//     tag: "SECURITY • SURVEILLANCE • PROTECTION",
//     description: "The CS-PRIDE quadcopter is engineered for advanced security and surveillance with robust monitoring performance and dependable stability.",
//     image: "/drones/cs-pride-images/cs-pride.png",
//     bgImage: "/drones_bg/bg_4.jpg",
//     link: "/drones/cs-pride",
//   },
//   {
//     name: "CS-BHEEM",
//     tag: "HEAVY LIFT • DEFENSE • 30KG PAYLOAD",
//     description: 'The "BHEEM" hexacopter is an indigenous heavy-duty drone designed for defense applications, carrying payloads up to 30 kg with exceptional strength and stability.',
//     image: "/drones/cs-bheem-images/cs-bheem.png",
//     bgImage: "/drones_bg/bg_5.jpg",
//     link: "/drones/cs-bheem",
//   },
// ];

// /* ===========================
//    Premium Tilt + Spotlight Hook
// =========================== */
// function useTilt() {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [style, setStyle] = useState<React.CSSProperties>({});
//   const [spot, setSpot] = useState({ x: 50, y: 50 });

//   const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const el = ref.current;
//     if (!el) return;

//     const rect = el.getBoundingClientRect();

//     const px = ((e.clientX - rect.left) / rect.width) * 100;
//     const py = ((e.clientY - rect.top) / rect.height) * 100;

//     const dx = e.clientX - (rect.left + rect.width / 2);
//     const dy = e.clientY - (rect.top + rect.height / 2);

//     const rx = (-dy / rect.height) * 8;
//     const ry = (dx / rect.width) * 10;

//     setSpot({ x: px, y: py });

//     setStyle({
//       transform: `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`,
//     });
//   };

//   const onLeave = () => {
//     setStyle({
//       transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
//     });
//     setSpot({ x: 50, y: 50 });
//   };

//   return { ref, style, spot, onMove, onLeave };
// }

// export default function Drones() {
//   const bg = useMemo(() => {
//     return (
//       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         {/* clean premium base */}
//         <div className="absolute inset-0 bg-linear-to-b from-white via-gray-50 to-white" />

//         {/* soft glow blobs */}
//         <div className="absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-yellow-300/25 blur-[140px]" />
//         <div className="absolute top-40 left-10 h-[520px] w-[520px] rounded-full bg-gray-300/35 blur-[160px]" />
//         <div className="absolute bottom-0 right-0 h-[560px] w-[560px] rounded-full bg-yellow-200/20 blur-[160px]" />

//         {/* subtle grid overlay */}
//         <div
//           className="absolute inset-0 opacity-[0.06]"
//           style={{
//             backgroundImage:
//               "linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)",
//             backgroundSize: "64px 64px",
//           }}
//         />

//         {/* soft vignette */}
//         <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/5" />
//       </div>
//     );
//   }, []);

//   return (
//     <section className="relative min-h-screen overflow-hidden">
//       {bg}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
//         {/* ================= HEADER ================= */}
//         <div className="text-center mb-16 sm:mb-20">
//           <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 backdrop-blur-xl shadow-sm">
//             PREMIUM AERIAL SYSTEMS • 2026 EDITION
//           </div>

//           <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
//             Our{" "}
//             <span className="bg-linear-to-r from-gray-900 via-gray-600 to-yellow-500 bg-clip-text text-transparent">
//               Drones
//             </span>
//           </h1>

//           <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
//             A premium fleet engineered for performance, precision, and mission
//             reliability — crafted with modern aerospace design principles.
//           </p>

//           <div className="mt-8 flex justify-center">
//             <div className="h-[2px] w-36 bg-linear-to-r from-transparent via-yellow-500/70 to-transparent rounded-full" />
//           </div>
//         </div>

//         {/* ================= LIST ================= */}
//         <div className="space-y-14 sm:space-y-18">
//           {drones.map((drone, index) => {
//             const reverse = index % 2 !== 0;
//             const tilt = useTilt();

//             return (
//               <div
//                 key={drone.name}
//                 className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
//               >
//                 {/* ================= VISUAL ================= */}
//                 <div
//                   className={`lg:col-span-7 ${
//                     reverse ? "lg:order-2" : "lg:order-1"
//                   }`}
//                 >
//                   <div
//                     ref={tilt.ref}
//                     onMouseMove={tilt.onMove}
//                     onMouseLeave={tilt.onLeave}
//                     style={tilt.style}
//                     className="relative rounded-[28px] transition-transform duration-300 will-change-transform"
//                   >
//                     {/* glow ring */}
//                     <div className="absolute -inset-[1px] rounded-[30px] bg-linear-to-r from-yellow-500/25 via-black/5 to-yellow-500/25 blur-md opacity-80" />

//                     {/* main card */}
//                     <div className="group relative overflow-hidden rounded-[28px] border border-gray-200 bg-white/70 backdrop-blur-2xl shadow-[0_30px_90px_-55px_rgba(0,0,0,0.35)]">
//                       {/* spotlight */}
//                       <div
//                         className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                         style={{
//                           background: `radial-gradient(circle at ${tilt.spot.x}% ${tilt.spot.y}%, rgba(255,193,7,0.22), transparent 55%)`,
//                         }}
//                       />

//                       {/* background */}
//                       <div className="absolute inset-0">
//                         <Image
//                           src={drone.bgImage}
//                           alt={`${drone.name} background`}
//                           fill
//                           className="object-cover scale-110 opacity-60 blur-[2px]"
//                           priority={index === 0}
//                         />
//                         <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/25 to-white/70" />
//                       </div>

//                       {/* drone image */}
//                       {/* <div className="relative h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[500px] flex items-center justify-center px-10 py-12">
//                         <Image
//                           src={drone.image}
//                           alt={drone.name}
//                           fill
//                           className="object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out group-hover:scale-[1.08]"
//                         />
//                       </div> */}

//                       {/* bottom fade */}
//                       <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-white/85 to-transparent" />

//                       {/* tag */}
//                       <div className="absolute top-5 left-5 rounded-full border border-gray-200 bg-white/75 px-4 py-2 text-[11px] font-semibold tracking-widest text-gray-700 backdrop-blur-xl shadow-sm">
//                         {drone.tag}
//                       </div>

//                       {/* highlight */}
//                       <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-400/15 blur-[90px]" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* ================= CONTENT ================= */}
//                 <div
//                   className={`lg:col-span-5 ${
//                     reverse ? "lg:order-1" : "lg:order-2"
//                   }`}
//                 >
//                   <div className="relative rounded-[28px] border border-gray-200 bg-white/70 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.25)]">
//                     {/* subtle shine */}
//                     <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
//                       <div className="absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rotate-12 bg-white/70 blur-3xl opacity-60" />
//                     </div>

//                     <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
//                       Next-Gen Drone Platform
//                     </p>

//                     <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                       {drone.name}
//                     </h2>

//                     <div className="mt-5 h-[2px] w-20 bg-linear-to-r from-yellow-500/90 via-yellow-300/60 to-transparent rounded-full" />

//                     <p className="mt-6 text-gray-600 leading-relaxed text-base sm:text-lg">
//                       {drone.description}
//                     </p>

//                     {/* CTA */}
//                     <div className="mt-8">
//                       <Link
//                         href={drone.link}
//                         className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-[0_18px_55px_-25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1"
//                       >
//                         <span className="relative z-10">
//                           Explore {drone.name}
//                         </span>

//                         <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

//                         {/* Shine animation (NO tailwind config needed) */}
//                         <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                           <span className="absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl [animation:shine_1.2s_ease-in-out]" />
//                         </span>
//                       </Link>
//                     </div>

//                     <div className="mt-8 flex items-center gap-3 text-xs text-gray-500">
//                       <span className="h-[1px] w-10 bg-gray-300" />
//                       Aerospace-grade build • Mission-ready design
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ✅ FIXED: stable global keyframes (NO styled-jsx / NO hydration error) */}
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//             @keyframes shine {
//               0% { transform: translateX(0) rotate(12deg); opacity: 0; }
//               20% { opacity: 1; }
//               100% { transform: translateX(520px) rotate(12deg); opacity: 0; }
//             }
//           `,
//         }}
//       />
//     </section>
//   );
// }
