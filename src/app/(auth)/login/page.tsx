"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [checked, setChecked] = useState(false);

// ✅ Check session ONLY ONCE (fixed flicker + lock issue)
useEffect(() => {
  let isMounted = true;

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!isMounted) return;

    if (session?.user) {
      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle(); // ✅ prevents crash if no row

      if (!isMounted) return;

      if (userData?.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    }

    if (isMounted) setChecked(true);
  };

  checkSession();

  return () => {
    isMounted = false; // ✅ prevents double execution issues
  };
}, [router]);


// ✅ LOGIN HANDLER (clean + stable)
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("User not found");

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .maybeSingle(); // ✅ avoids hard crash

    if (userData?.role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/user/dashboard");
    }

  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Login failed";
    setErrorMsg(message);
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

              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href="/signin"
                    className="px-5 py-2 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition"
                  >
                    Sign In
                  </Link>
                </div>

                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-yellow-400 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
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