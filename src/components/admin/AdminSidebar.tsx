"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  LogOut,
  ShieldCheck,
  ListOrdered,
  Image,
  TvIcon,
  Menu,
  X,
  FileArchiveIcon,
  DroneIcon
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  {
    label: "Home",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Profile",
    href: "/admin/dashboard/profile",
    icon: <User size={18} />,
  },
  {
    label: "Add Drones",
    href: "/admin/dashboard/addDrones",
    icon: <DroneIcon size={18} />,
  },
  {
    label: "View Drones",
    href: "/admin/dashboard/drones",
    icon: <DroneIcon size={18} />,
  },
  {
    label: "View Customers",
    href: "/admin/dashboard/viewcustomers",
    icon: <DroneIcon size={18} />,
  },
  {
    label: "View Drone Orders",
    href: "/admin/dashboard/orders",
    icon: <DroneIcon size={18} />,
  },
  {
    label: "Add Images",
    href: "/admin/dashboard/addimages",
    icon: <Image size={18} />,
  },
  {
    label: "View Images",
    href: "/admin/dashboard/viewImages",
    icon: <Image size={18} />,
  },
  {
    label: "Add Events",
    href: "/admin/dashboard/events",
    icon: <ListOrdered size={18} />,
  },
  {
    label: "View Events",
    href: "/admin/dashboard/events/list",
    icon: <TvIcon size={18} />,
  },
  {
    label: "View Brochure Downloads",
    href: "/admin/dashboard/brochure-downloads",
    icon: <FileArchiveIcon size={18} />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="text-yellow-500" size={20} />
          Admin Panel
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
              ${
                isActive
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 space-y-3">
        <div className="text-sm text-gray-500">
          Logged in as <span className="font-semibold">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-60"
        >
          <LogOut size={18} />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b bg-white">
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>

        <h2 className="font-bold flex items-center gap-2">
          <ShieldCheck size={18} className="text-yellow-500" />
          Admin
        </h2>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex`}
      >
        {/* Close button (mobile) */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <SidebarContent />
      </aside>
    </>
  );
}