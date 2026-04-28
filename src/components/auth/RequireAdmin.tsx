"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // ✅ Get session (single source of truth)
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // ❌ Not logged in
        if (!session?.user) {
          router.replace("/login");
          return;
        }

        // ✅ Get role from DB
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();

        // ❌ No user record / error
        if (error || !data) {
          router.replace("/login");
          return;
        }

        // ❌ Not admin
        if (data.role !== "admin") {
          router.replace("/user/dashboard");
          return;
        }

        // ✅ Access granted
        setAllowed(true);
      } catch (err) {
        router.replace("/login");
      }
    };

    checkAdmin();
  }, [router]);

  // 🔥 Prevent flicker (IMPORTANT)
  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking admin access...
      </div>
    );
  }

  return <>{children}</>;
}