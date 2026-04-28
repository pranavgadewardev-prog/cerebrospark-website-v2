// "use client";

// import Link from "next/link";
// import React from "react";
// import { motion } from "framer-motion";

// interface StatItem {
//   title: string;
//   subtitle: string;
// }

// const stats: StatItem[] = [
//   { title: "80g – 100kg", subtitle: "Payload Capability" },
//   { title: "End-to-End", subtitle: "Drone Solutions" },
//   { title: "Multi-Industry", subtitle: "Defense • Agri • AI" },
//   { title: "In-House R&D", subtitle: "Design to Deployment" }
// ];

// const QuickView: React.FC = () => {
//   return (
//     <section className="py-5 sm:py-16 md:py-5 lg:py-5 px-4 sm:px-6 flex justify-center bg-[#fdfdfd]">

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//         className="w-full max-w-7xl bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group"
//       >

//         {/* Background Decoration */}
//         <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-colors duration-500" />

//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 relative z-10">

//           {/* LEFT CONTENT */}
//           <div className="w-full lg:flex-1 max-w-xl">

//             <div className="inline-block px-4 py-1.5 mb-5 text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-yellow-400/10 text-yellow-600 rounded-full">
//               Innovative UAV Systems
//             </div>

//             <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-5 leading-tight">
//               Drone Manufacturing & Intelligent
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
//                 Aerial Solutions
//               </span>
//             </h2>

//             <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-7">
//               Cerebrospark Innovations is a Pune-based drone manufacturer and
//               solution provider delivering reliable, high-performance UAV
//               systems across agriculture, defense, disaster management,
//               inspection, and AI-driven applications.
//             </p>

//             <div className="flex justify-start">
//               <Link
//                 href="/about"
//                 className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-xl bg-gray-900 font-bold text-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(250,204,21,0.3)]"
//               >
//                 <span className="relative z-10 text-sm sm:text-base">
//                   Know More About Us
//                 </span>

//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//               </Link>
//             </div>

//           </div>

//           {/* RIGHT STATS */}
//           <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

//             {stats.map((item, idx) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, x: 25 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="p-5 sm:p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-yellow-400/50 hover:shadow-xl hover:-translate-y-1 relative group"
//               >

//                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-12 transition-all duration-300 rounded-r-full" />

//                 <div className="font-black text-lg sm:text-xl text-gray-800 tracking-tight">
//                   {item.title}
//                 </div>

//                 <div className="mt-2 text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
//                   {item.subtitle}
//                 </div>

//               </motion.div>
//             ))}

//           </div>

//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="mt-12"
//         >
//           <div className="relative w-full rounded-2xl border border-yellow-100 bg-gradient-to-r from-yellow-50 via-white to-yellow-50shadow-[0_10px_30px_rgba(250,204,21,0.12)]hover:shadow-[0_15px_40px_rgba(250,204,21,0.25)]transition-all duration-300 overflow-hidden group">

//             {/* Glow Effect */}
//             <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all" />

//             <div className="flex flex-col sm:flex-row items-center text-center sm:text-left relative z-10">

//               {/* LEFT */}
//               <div className="flex-1 px-6 py-6 text-center">
//                 <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
//                   1,49,000+
//                 </div>
//                 <div className="text-sm font-medium text-gray-500 mt-1">
//                   Flights Completed
//                 </div>
//               </div>

//               {/* DIVIDER */}
//               <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-yellow-300 to-transparent" />
//               <div className="block sm:hidden w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

//               {/* RIGHT */}
//               <div className="flex-1 px-6 py-6 text-center">
//                 <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
//                   12+
//                 </div>
//                 <div className="text-sm font-medium text-gray-500 mt-1">
//                   States Covered
//                 </div>
//               </div>

//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default QuickView;


"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  title: string;
  subtitle: string;
}

const stats: StatItem[] = [
  { title: "80g – 100kg", subtitle: "Payload Capability" },
  { title: "End-to-End", subtitle: "Drone Solutions" },
  { title: "Multi-Industry", subtitle: "Defense • Agri • AI" },
  { title: "In-House R&D", subtitle: "Design to Deployment" }
];

const QuickView: React.FC = () => {
  return (
    <section className="py-5 sm:py-16 md:py-5 lg:py-5 px-4 sm:px-6 flex justify-center bg-[#fdfdfd]">

      <motion.div
        initial={false} // ✅ FIXED hydration
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group"
      >

        {/* Background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-colors duration-500" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 relative z-10">

          {/* LEFT */}
          <div className="w-full lg:flex-1 max-w-xl">

            <div className="inline-block px-4 py-1.5 mb-5 text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-yellow-400/10 text-yellow-600 rounded-full">
              Innovative UAV Systems
            </div>

            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-5 leading-tight">
              Drone Manufacturing & Intelligent
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                Aerial Solutions
              </span>
            </h2>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-7">
              Cerebrospark Innovations is a Pune-based drone manufacturer and
              solution provider delivering reliable, high-performance UAV
              systems across agriculture, defense, disaster management,
              inspection, and AI-driven applications.
            </p>

            <Link
              href="/about"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-xl bg-gray-900 font-bold text-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(250,204,21,0.3)]"
            >
              <span className="relative z-10 text-sm sm:text-base">
                Know More About Us
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

          </div>

          {/* RIGHT STATS */}
          <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            {stats.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={false} // ✅ FIXED
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-yellow-400/50 hover:shadow-xl hover:-translate-y-1 relative group"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-12 transition-all duration-300 rounded-r-full" />

                <div className="font-black text-lg sm:text-xl text-gray-800 tracking-tight">
                  {item.title}
                </div>

                <div className="mt-2 text-xs sm:text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">
                  {item.subtitle}
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* BOTTOM STATS */}
        <motion.div
          initial={false} // ✅ FIXED
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="relative w-full rounded-2xl border border-yellow-100 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 shadow-[0_10px_30px_rgba(250,204,21,0.12)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.25)] transition-all duration-300 overflow-hidden group">

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all" />

            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left relative z-10">

              <div className="flex-1 px-6 py-6 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  1,49,000+
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  Flights Completed
                </div>
              </div>

              <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-yellow-300 to-transparent" />
              <div className="block sm:hidden w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

              <div className="flex-1 px-6 py-6 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  12+
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  States Covered
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default QuickView;