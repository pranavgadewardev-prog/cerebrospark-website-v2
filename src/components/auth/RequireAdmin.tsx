// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";

// export default function RequireAdmin({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         router.replace("/login");
//         return;
//       }

//       try {
//         const ref = doc(db, "users", user.uid);
//         const snap = await getDoc(ref);

//         if (!snap.exists()) {
//           router.replace("/login");
//           return;
//         }

//         const role = snap.data()?.role;

//         if (role !== "admin") {
//           router.replace("/dashboard"); // if normal user tries admin
//           return;
//         }

//         setChecking(false);
//       } catch (err) {
//         router.replace("/login");
//       }
//     });

//     return () => unsub();
//   }, [router]);

//   if (checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Checking admin access...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // ✅ 1. Check session token first (prevents forward access)
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  // ✅ 2. Firebase auth + role check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          router.replace("/login");
          return;
        }

        const role = snap.data()?.role;

        if (role !== "admin") {
          router.replace("/user/dashboard"); // ✅ fixed route
          return;
        }

        setChecking(false);
      } catch (err) {
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

  // ⏳ Loading state
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking admin access...
      </div>
    );
  }

  return <>{children}</>;
}