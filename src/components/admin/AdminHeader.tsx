"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ================= GET USER ================= */

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  /* ================= CLOSE DROPDOWN ================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.replace("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="bg-yellow-400 w-1 h-8 rounded-full" />
        <h1 className="text-xl font-bold text-gray-900">
          Admin<span className="text-yellow-500">Panel</span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-8">
        {/* LOGO */}
        <div className="hidden md:block border-r border-gray-200 pr-8">
          <Image
            src="/logo/CBS_logo.png"
            alt="CerebroSpark Innovations"
            width={110}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-3 p-1.5 pr-3 rounded-full transition
              ${
                open
                  ? "bg-yellow-50 ring-2 ring-yellow-400"
                  : "hover:bg-gray-50"
              }`}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
                <User size={16} className="text-gray-500" />
              </div>

              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <span className="hidden sm:block text-sm font-semibold text-gray-700">
              {user?.email?.split("@")[0] || "Admin"}
            </span>

            <ChevronDown
              size={14}
              className={`text-gray-400 transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-60 bg-white border rounded-2xl shadow-xl overflow-hidden">
              {/* HEADER */}
              <div className="px-5 py-4 bg-gray-50 border-b">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.email || "Administrator"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supabase Auth User
                </p>
              </div>

              {/* LINKS */}
              <div className="p-2">
                <button
                  onClick={() => {
                    router.push("/admin/dashboard/profile");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-yellow-50 rounded-lg"
                >
                  <User size={18} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    router.push("/admin/settings");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-yellow-50 rounded-lg"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}