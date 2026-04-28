"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/* ======================================================
    ANIMATION VARIANTS (Type-Safe)
====================================================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface AdminProfile {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            name: data.name || "N/A",
            role: data.role || "User",
            email: user.email || "N/A",
            phone: data.phone || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 w-full">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-slate-400 font-medium tracking-wide">Syncing Security Credentials...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-6" // Removed max-w-4xl to fill the right side
    >
      {/* ================= HEADER SECTION ================= */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Admin <span className="text-yellow-500 italic">Profile</span>
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Verified identity and access management controls.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100 self-start">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              Database Sync Active
            </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-40" />
      </motion.div>

      <AnimatePresence>
        {!profile ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-red-100 rounded-[2rem] p-10 text-center shadow-sm"
          >
            <p className="text-red-500 font-semibold">No profile data found in secure storage.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ================= LEFT: AVATAR CARD ================= */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-10 text-center flex flex-col items-center justify-center shadow-xl min-h-[400px]"
            >
              <div className="w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center text-4xl font-black text-slate-900 mb-6 shadow-2xl shadow-yellow-400/20">
                {profile.name.charAt(0)}
              </div>
              <h3 className="text-white text-2xl font-bold tracking-tight">{profile.name}</h3>
              <p className="text-yellow-400 font-bold text-xs mt-2 uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full">
                {profile.role}
              </p>
            </motion.div>

            {/* ================= RIGHT: INFO DETAILS CARD ================= */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100"
            >
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 pb-4 border-b border-slate-50">
                Credential Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                {[
                  { label: "Full Name", value: profile.name },
                  { label: "Email Address", value: profile.email },
                  { label: "Primary Phone", value: profile.phone || "Not Provided" },
                  { label: "Security Role", value: profile.role },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                      {item.label}
                    </span>
                    <span className="text-slate-800 font-bold text-lg truncate">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}