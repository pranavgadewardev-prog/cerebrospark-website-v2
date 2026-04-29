"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

// Raw response from Supabase (users comes as ARRAY)
type RawOrder = {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  users: {
    name: string;
    email: string;
  }[]; // ⚠️ Supabase returns array
};

// Clean type used in UI
type Order = {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  user: {
    name: string;
    email: string;
  } | null;
};

/* ================= COMPONENT ================= */

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          status,
          payment_status,
          created_at,
          users:user_id (
            name,
            email
          )
        `)
        .eq("payment_status", "success")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // ✅ SAFELY TRANSFORM DATA (NO any, NO TS ERROR)
      const cleaned: Order[] =
        (data as RawOrder[] | null)?.map((item) => ({
          id: item.id,
          total_amount: item.total_amount,
          status: item.status,
          payment_status: item.payment_status,
          created_at: item.created_at,
          user: item.users?.[0] ?? null, // ✅ FIX
        })) ?? [];

      setOrders(cleaned);
    } catch (err) {
      console.error("Supabase error:", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= HELPERS ================= */

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <h1 className="text-3xl font-bold">
        Orders <span className="text-yellow-500">Management</span>
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No completed orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl shadow flex items-center gap-6"
            >
              {/* Order Info */}
              <div className="flex-1 space-y-1">
                <h2 className="font-semibold text-lg">
                  Order #{order.id.slice(0, 8)}
                </h2>

                <p className="text-sm text-gray-500">
                  {order.user?.name ?? "Unknown User"} •{" "}
                  {order.user?.email ?? ""}
                </p>

                <p className="text-xs text-gray-400">
                  {formatDate(order.created_at)}
                </p>
              </div>

              {/* Amount */}
              <div className="text-lg font-bold text-yellow-500">
                ₹{order.total_amount}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Action */}
              <div>
                <button
                  onClick={() =>
                    router.push(`/admin/dashboard/orders/${order.id}`)
                  }
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}