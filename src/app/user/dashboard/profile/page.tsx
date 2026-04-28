"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  phone?: string | null;
  gender?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  address?: string | null;
  role: string;
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500">
        Profile not found
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow p-6 md:p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">
          My <span className="text-yellow-500">Profile</span>
        </h1>
        <p className="text-gray-500 mt-2">
          View and manage your personal information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Avatar */}
        <div className="bg-black rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-black mb-4">
            {profile.name?.charAt(0) || "U"}
          </div>

          <h2 className="text-white text-xl font-semibold">
            {profile.name || "User"}
          </h2>

          <span className="text-xs mt-2 px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold uppercase tracking-wider">
            {profile.role}
          </span>
        </div>

        {/* RIGHT: Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow border border-gray-100">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", value: profile.name },
              { label: "Email", value: profile.email },
              { label: "Phone", value: profile.phone },
              { label: "Gender", value: profile.gender },
              { label: "Country", value: profile.country },
              { label: "State", value: profile.state },
              { label: "City", value: profile.city },
              { label: "Address", value: profile.address },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  {item.label}
                </span>
                <span className="text-gray-900 font-semibold mt-1">
                  {item.value || "Not provided"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}