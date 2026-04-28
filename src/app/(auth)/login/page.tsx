// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase";

// export default function LoginPage() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const getUserRole = async (uid: string) => {
//     const ref = doc(db, "users", uid);
//     const snap = await getDoc(ref);
//     if (!snap.exists()) return null;
//     return snap.data()?.role as "admin" | "user" | undefined;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg("");

//     try {
//       setLoading(true);

//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const uid = userCred.user.uid;

//       // 🔥 NEW: store token
//       const token = await userCred.user.getIdToken();
//       localStorage.setItem("token", token);

//       const role = await getUserRole(uid);

//       if (role === "admin") {
//         router.push("/admin/dashboard");
//       } else {
//         router.push("/user/dashboard");
//       }
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setErrorMsg(err.message);
//       } else {
//         setErrorMsg("Login failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <main className="relative min-h-screen w-full overflow-hidden pt-8">
//         {/* BACKGROUND VIDEO */}
//         <video
//           className="absolute inset-0 h-full w-full object-cover"
//           src="/hero/contactus.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         />

//         {/* DARK OVERLAY */}
//         {/* <div className="absolute inset-0 bg-black/70" /> */}

//         {/* PAGE CONTENT */}
//         <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
//           <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
//             {/* HEADER */}
//             <div className="bg-gradient-to-r from-gray-700 to-yellow-400 px-6 py-5">
//               <h1 className="text-2xl font-bold text-white">Login</h1>
//               <p className="text-sm text-gray-100 mt-1">
//                 Welcome back! Please login to continue.
//               </p>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleLogin} className="px-6 py-6 space-y-5">
//               {/* Error Message */}
//               {errorMsg && (
//                 <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-xl text-sm">
//                   {errorMsg}
//                 </div>
//               )}

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                   required
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-200 mb-1">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-yellow-400"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <Link
//                   href="/forgot-password"
//                   className="text-sm text-yellow-400 hover:underline"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/* LOGIN BUTTON */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-gray-700 to-yellow-400 hover:from-gray-800 hover:to-yellow-500 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>

//               {/* FOOTER */}
//               {/* <p className="text-sm text-gray-200 text-center">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   href="/signin"
//                   className="text-yellow-400 font-semibold hover:underline"
//                 >
//                   Sign up
//                 </Link>
//               </p> */}
//             </form>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ OPTIONAL: If already logged in → redirect
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/user/dashboard"); // or detect role if needed
      }
    });

    return () => unsub();
  }, [router]);

  const getUserRole = async (uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data()?.role as "admin" | "user" | undefined;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // 🔥 CHANGED: sessionStorage instead of localStorage
      const token = await userCred.user.getIdToken();
      sessionStorage.setItem("token", token);

      const role = await getUserRole(uid);

      // 🔥 CHANGED: replace instead of push (important)
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="relative min-h-screen w-full overflow-hidden pt-8">
        {/* BACKGROUND VIDEO */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero/contactus.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* PAGE CONTENT */}
        <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-gray-700 to-yellow-400 px-6 py-5">
              <h1 className="text-2xl font-bold text-white">Login</h1>
              <p className="text-sm text-gray-100 mt-1">
                Welcome back! Please login to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="px-6 py-6 space-y-5">
              
              {errorMsg && (
                <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-yellow-400"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-yellow-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-gray-700 to-yellow-400 hover:from-gray-800 hover:to-yellow-500 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}