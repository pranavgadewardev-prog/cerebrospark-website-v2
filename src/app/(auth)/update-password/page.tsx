"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ IMPORTANT: Capture session from reset link
  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data.session) {
        setMessage("Invalid or expired reset link.");
      }
    };

    handleSession();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      // ✅ logout after update
      await supabase.auth.signOut();

      setMessage("Password updated! Please login again.");

      setTimeout(() => router.push("/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleUpdate} className="space-y-4">
        <h2 className="text-xl font-bold">Update Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />

        <button type="submit" className="bg-yellow-400 px-4 py-2">
          Update Password
        </button>

        <p>{message}</p>
      </form>
    </div>
  );
}