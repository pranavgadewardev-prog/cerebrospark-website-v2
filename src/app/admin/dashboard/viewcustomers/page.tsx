"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

/* ================= COMPONENT ================= */

export default function AdminCustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .neq("role", "admin") // ✅ EXCLUDE ADMINS
        .order("created_at", { ascending: false });

      if (error) throw error;

      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= DELETE USER ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (error) throw error;

      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user");
    }
  };

  /* ================= FORMAT DATE ================= */

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <h1 className="text-3xl font-bold">
        Customers <span className="text-yellow-500">Management</span>
      </h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded-2xl shadow flex items-center gap-6"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {user.name || "No Name"}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Joined: {formatDate(user.created_at)}
                </p>
              </div>

              {/* Role */}
              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold
                  ${user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-yellow-400 rounded-lg text-sm font-medium"
                  onClick={() =>
                    alert("Next: View user orders page")
                  }
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}