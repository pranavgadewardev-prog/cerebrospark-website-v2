"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

/* ================= TYPES ================= */

type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
};

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  drone_id: string;
};

type Drone = {
  id: string;
  name: string;
  image_url: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

/* ================= COMPONENT ================= */

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [drones, setDrones] = useState<Record<string, Drone>>({});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */

  const fetchOrderDetails = async () => {
    try {
      /* ---------- 1. FETCH ORDER ---------- */
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;

      setOrder(orderData);

      /* ---------- 2. FETCH USER ---------- */
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, name, email")
        .eq("id", orderData.user_id)
        .single();

      if (userError) throw userError;

      setUser(userData);

      /* ---------- 3. FETCH ORDER ITEMS ---------- */
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      setItems(itemsData || []);

      /* ---------- 4. FETCH DRONES ---------- */
      const droneIds = (itemsData || []).map((i) => i.drone_id);

      if (droneIds.length > 0) {
        const { data: droneData, error: droneError } = await supabase
          .from("drones")
          .select("id, name, image_url")
          .in("id", droneIds);

        if (droneError) throw droneError;

        const droneMap: Record<string, Drone> = {};

        (droneData || []).forEach((d) => {
          droneMap[d.id] = d;
        });

        setDrones(droneMap);
      }
    } catch (err) {
      console.error("Order details error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (newStatus: string) => {
    if (!order) return;

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", order.id);

    if (!error) {
      setOrder({ ...order, status: newStatus });
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <h1 className="text-3xl font-bold">
        Order <span className="text-yellow-500">Details</span>
      </h1>

      {/* ================= ORDER INFO ================= */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>User:</strong> {user?.name} ({user?.email})</p>
        <p><strong>Total:</strong> ₹{order.total_amount}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.payment_status}</p>
      </div>

      {/* ================= STATUS UPDATE ================= */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-3">
        <h2 className="font-semibold">Update Status</h2>

        <div className="flex gap-2 flex-wrap">
          {["pending", "processing", "shipped", "delivered"].map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm ${
                order.status === s
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Ordered Items</h2>

        {items.map((item) => {
          const drone = drones[item.drone_id];

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow flex items-center gap-6"
            >
              {/* IMAGE */}
              {drone?.image_url && (
                <img
                  src={drone.image_url}
                  className="w-24 h-20 object-cover rounded-lg"
                />
              )}

              {/* INFO */}
              <div className="flex-1">
                <h3 className="font-semibold">
                  {drone?.name || "Drone"}
                </h3>
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              {/* TOTAL */}
              <div className="font-bold text-yellow-500">
                ₹{item.price * item.quantity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}