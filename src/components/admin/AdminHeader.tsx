"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    router.push("/login"); // Recommended redirect
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      {/* Left: Branding */}
      <div className="flex items-center gap-4">
        <div className="bg-yellow-400 w-1 h-8 rounded-full" /> {/* Aesthetic accent */}
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Admin<span className="text-yellow-500">Panel</span>
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-8">
        {/* Main Logo */}
        <div className="hidden md:block border-r border-gray-200 pr-8">
          <Image
            src="/logo/CBS_logo.png"
            alt="CerebroSpark Innovations"
            width={110}
            height={32}
            className="object-contain  transition-all duration-300"
            priority
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-3 p-1.5 pr-3 rounded-full transition-all duration-200 
              ${open ? 'bg-yellow-50 ring-2 ring-yellow-400' : 'hover:bg-gray-50 border border-transparent'}`}
          >
            {/* Avatar Container */}
            <div className="relative">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={34}
                  height={34}
                  className="rounded-full ring-2 ring-white object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <User size={16} className="text-gray-500" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <span className="hidden sm:block text-sm font-semibold text-gray-700">
              {user?.displayName?.split(" ")[0] || "Admin"}
            </span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden animate-in fade-in zoom-in duration-150">
              {/* Header */}
              <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.displayName || "Administrator"}
                </p>
                <p className="text-[11px] font-medium text-gray-500  tracking-wider mt-0.5">
                  {user?.email || "System Access"}
                </p>
              </div>

              {/* Links */}
              <div className="p-2">
                <button
                  onClick={() => { router.push("/admin/dashboard/profile"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors group"
                >
                  <User size={18} className="text-gray-400 group-hover:text-yellow-600" />
                  My Profile
                </button>

                <button
                  onClick={() => { router.push("/admin/settings"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors group"
                >
                  <Settings size={18} className="text-gray-400 group-hover:text-yellow-600" />
                  Account Settings
                </button>

                <hr className="my-2 border-gray-100" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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