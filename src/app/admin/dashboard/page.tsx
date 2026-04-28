// "use client";

// import React from "react";
// import { motion, Variants } from "framer-motion";

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// export default function AdminDashboardPage() {
//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="space-y-8 p-2 md:p-4"
//     >
//       {/* ================= WELCOME HEADER ================= */}
//       <motion.div 
//         variants={itemVariants}
//         className="relative overflow-hidden bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
//       >
//         <div className="relative z-10">
//           <h2 className="text-3xl font-black text-slate-900 tracking-tight">
//             System Overview <span className="text-yellow-500 italic">Admin 👋</span>
//           </h2>
//           <p className="text-slate-500 mt-2 max-w-xl font-medium">
//             Welcome back to the Cerebrospark control center. Monitor your drone fleet, 
//             manage global orders, and oversee user activity from this unified command.
//           </p>
//         </div>
//         {/* Decorative background element */}
//         <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
//       </motion.div>

//       {/* ================= QUICK STATS GRID ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[
//           { label: "Total Users", value: "12", trend: "+2 this week", color: "text-blue-600" },
//           { label: "Total Orders", value: "05", trend: "Stable", color: "text-emerald-600" },
//           { label: "Pending Requests", value: "03", trend: "High Priority", color: "text-amber-600" },
//         ].map((stat, i) => (
//           <motion.div
//             key={i}
//             variants={itemVariants}
//             whileHover={{ y: -5, transition: { duration: 0.2 } }}
//             className="group bg-white rounded-[1.5rem] shadow-lg shadow-slate-200/40 border border-slate-100 p-6 transition-all"
//           >
//             <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 mb-3">
//               {stat.label}
//             </h3>
//             <div className="flex items-baseline gap-2">
//               <p className="text-4xl font-black text-slate-900 leading-none">
//                 {stat.value}
//               </p>
//               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 ${stat.color}`}>
//                 {stat.trend}
//               </span>
//             </div>
//             {/* Subtle progress line */}
//             <div className="mt-6 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
//               <motion.div 
//                 initial={{ width: 0 }}
//                 animate={{ width: "70%" }}
//                 transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
//                 className="h-full bg-slate-900" 
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ================= MODULES PREVIEW ================= */}
//       <motion.div 
//         variants={itemVariants}
//         className="bg-slate-900 rounded-[2rem] shadow-2xl p-8 md:p-10 relative overflow-hidden"
//       >
//         <div className="relative z-10">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
//             <h3 className="text-lg font-bold text-white tracking-wide">
//               Management Modules <span className="text-slate-500 font-medium ml-2">— System Ready</span>
//             </h3>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {[
//               "Product Inventory Management",
//               "Real-time Order Tracking",
//               "User Access Control",
//               "Payment Gateway Integration",
//             ].map((action, idx) => (
//               <motion.div 
//                 key={idx}
//                 whileHover={{ x: 10 }}
//                 className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
//               >
//                 <div className="h-8 w-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400 font-bold">
//                   {idx + 1}
//                 </div>
//                 <span className="text-slate-300 font-medium">{action}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
        
//         {/* Glow effect */}
//         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
//       </motion.div>

//       {/* Footer Meta */}
//       <motion.p 
//         variants={itemVariants}
//         className="text-center text-slate-400 text-xs font-medium uppercase tracking-widest pb-10"
//       >
//         Cerebrospark Innovations v1.0.4 — Enterprise Admin
//       </motion.p>
//     </motion.div>
//   );
// }

"use client";

import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();

  // ✅ 1. BLOCK FORWARD / DIRECT ACCESS
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  // ✅ 2. FIREBASE AUTH CHECK
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });

    return () => unsub();
  }, [router]);

  // 🔥 3. BACK BUTTON → LOGOUT
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBack = async () => {
      await signOut(auth);
      sessionStorage.removeItem("token");

      router.replace("/login");
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [router]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 p-2 md:p-4"
    >
      {/* ================= WELCOME HEADER ================= */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            System Overview{" "}
            <span className="text-yellow-500 italic">Admin 👋</span>
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl font-medium">
            Welcome back to the Cerebrospark control center. Monitor your drone
            fleet, manage global orders, and oversee user activity from this
            unified command.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
      </motion.div>

      {/* ================= QUICK STATS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Users",
            value: "12",
            trend: "+2 this week",
            color: "text-blue-600",
          },
          {
            label: "Total Orders",
            value: "05",
            trend: "Stable",
            color: "text-emerald-600",
          },
          {
            label: "Pending Requests",
            value: "03",
            trend: "High Priority",
            color: "text-amber-600",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group bg-white rounded-[1.5rem] shadow-lg shadow-slate-200/40 border border-slate-100 p-6 transition-all"
          >
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 mb-3">
              {stat.label}
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-slate-900 leading-none">
                {stat.value}
              </p>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 ${stat.color}`}
              >
                {stat.trend}
              </span>
            </div>

            <div className="mt-6 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className="h-full bg-slate-900"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODULES ================= */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-900 rounded-[2rem] shadow-2xl p-8 md:p-10 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Management Modules{" "}
              <span className="text-slate-500 font-medium ml-2">
                — System Ready
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Product Inventory Management",
              "Real-time Order Tracking",
              "User Access Control",
              "Payment Gateway Integration",
            ].map((action, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
              >
                <div className="h-8 w-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400 font-bold">
                  {idx + 1}
                </div>
                <span className="text-slate-300 font-medium">{action}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
      </motion.div>

      {/* <motion.p
        variants={itemVariants}
        className="text-center text-slate-400 text-xs font-medium uppercase tracking-widest pb-10"
      >
        Cerebrospark Innovations v1.0.4 — Enterprise Admin
      </motion.p> */}
    </motion.div>
  );
}