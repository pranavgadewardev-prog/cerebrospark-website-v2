// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { LayoutDashboard, User, LogOut } from "lucide-react";
// import { signOut } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { useState } from "react";

// const navItems = [
//   {
//     label: "Home",
//     href: "/dashboard",
//     icon: <LayoutDashboard size={18} />,
//   },
//   {
//     label: "Profile",
//     href: "/dashboard/profile",
//     icon: <User size={18} />,
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       setLoading(true);

//       // Firebase logout
//       await signOut(auth);

//       // Replace so browser back won't keep dashboard history
//       router.replace("/login");
//     } catch (error) {
//       console.log("Logout Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex-col">
//       {/* Brand */}
//       <div className="h-16 flex items-center px-6 border-b border-gray-200">
//         <h2 className="text-lg font-bold text-gray-900">
//           CerebroSpark <span className="text-yellow-500">Dashboard</span>
//         </h2>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-4 py-6 space-y-2">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
//                 ${
//                   isActive
//                     ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//             >
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer + Logout */}
//       <div className="px-6 py-4 border-t border-gray-200 space-y-3">
//         <div className="text-sm text-gray-500">
//           Logged in as <span className="font-semibold">User</span>
//         </div>

//         <button
//           onClick={handleLogout}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           <LogOut size={18} />
//           {loading ? "Logging out..." : "Logout"}
//         </button>
//       </div>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, User, LogOut, DroneIcon, BoxIcon } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  {
    label: "Home",
    href: "/user/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Profile",
    href: "/user/dashboard/profile",
    icon: <User size={18} />,
  },
  {
    label: "View Drones",
    href: "/user/dashboard/viewDrones",
    icon: <DroneIcon size={18} />,
  },
  {
    label: "View Cart",
    href: "/user/dashboard/cart",
    icon: <BoxIcon size={18} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex-col">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">
          CerebroSpark <span className="text-yellow-500">Dashboard</span>
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
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
          Logged in as <span className="font-semibold">User</span>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <LogOut size={18} />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}