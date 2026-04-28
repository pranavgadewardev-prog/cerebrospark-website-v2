// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "@/lib/firebase";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleReset = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

//     if (!email.includes("@")) {
//       setErrorMsg("Please enter a valid email.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await sendPasswordResetEmail(auth, email);

//       setSuccessMsg(
//         "Password reset link has been sent to your email. Please check your inbox."
//       );
//       setEmail("");
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Something went wrong. Try again.";
//       setErrorMsg(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="relative min-h-screen w-full overflow-hidden pt-8">
//       {/* BACKGROUND VIDEO */}
//       <video
//         className="absolute inset-0 h-full w-full object-cover"
//         src="/hero/contactus.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* DARK OVERLAY */}
//       {/* <div className="absolute inset-0 bg-black/70" /> */}

//       {/* PAGE CONTENT */}
//       <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
//         <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
//           {/* HEADER */}
//           <div className="bg-linear-to-r from-gray-700 to-yellow-400 px-6 py-5">
//             <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
//             <p className="text-sm text-gray-100 mt-1">
//               Enter your email to reset your password.
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleReset} className="px-6 py-6 space-y-5">
//             {/* Error */}
//             {errorMsg && (
//               <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-xl text-sm">
//                 {errorMsg}
//               </div>
//             )}

//             {/* Success */}
//             {successMsg && (
//               <div className="bg-green-500/20 border border-green-400/40 text-green-200 px-4 py-3 rounded-xl text-sm">
//                 {successMsg}
//               </div>
//             )}

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-linear-to-r from-gray-700 to-yellow-400 hover:from-gray-800 hover:to-yellow-500 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "Sending..." : "Send Reset Link"}
//             </button>

//             {/* Back */}
//             <p className="text-sm text-gray-200 text-center">
//               Back to{" "}
//               <Link
//                 href="/login"
//                 className="text-yellow-400 font-semibold hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/update-password", // 🔥 change in production
      });

      if (error) throw error;

      setSuccessMsg(
        "Password reset link has been sent to your email. Please check your inbox."
      );
      setEmail("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
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

          {/* HEADER */}
          <div className="bg-gradient-to-r from-gray-700 to-yellow-400 px-6 py-5">
            <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
            <p className="text-sm text-gray-100 mt-1">
              Enter your email to reset your password.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleReset} className="px-6 py-6 space-y-5">

            {errorMsg && (
              <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="bg-green-500/20 border border-green-400/40 text-green-200 px-4 py-3 rounded-xl text-sm">
                {successMsg}
              </div>
            )}

            {/* Email */}
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

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-gray-700 to-yellow-400 hover:from-gray-800 hover:to-yellow-500 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Back */}
            <p className="text-sm text-gray-200 text-center">
              Back to{" "}
              <Link
                href="/login"
                className="text-yellow-400 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}