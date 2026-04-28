"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // ❌ Not logged in
        if (!session?.user) {
          router.replace("/login");
          return;
        }

        // ✅ Logged in
        setAllowed(true);
      } catch (err) {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  // 🔥 Prevent flicker
  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}