"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

interface Drone {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface CartItem {
  id: string;
  quantity: number;
  drone: Drone;
}

type RawCartItem = {
  id: string;
  quantity: number;
  drones: Drone | null;
};

/* ================= COMPONENT ================= */

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCart([]);
        return;
      }

      const { data, error } = await supabase
        .from("cart")
        .select(`
          id,
          quantity,
          drones!cart_drone_id_fkey (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error("Supabase error:", error.message);
        throw error;
      }

      const cleaned: CartItem[] =
        (data as unknown as RawCartItem[])
          ?.filter((item) => item.drones !== null)
          .map((item) => ({
            id: item.id,
            quantity: item.quantity,
            drone: item.drones as Drone,
          })) || [];

      setCart(cleaned);
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id: string) => {
    await supabase.from("cart").delete().eq("id", id);
    fetchCart();
  };

  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;

    await supabase.from("cart").update({ quantity: qty }).eq("id", id);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.drone.price,
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <h1 className="text-3xl font-bold">
        Your <span className="text-yellow-500">Cart</span>
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow"
              >
                <img
                  src={item.drone.image_url}
                  className="w-24 h-20 object-cover rounded-lg"
                  alt={item.drone.name}
                />

                <div className="flex-1">
                  <h2 className="font-bold">{item.drone.name}</h2>
                  <p className="text-sm text-gray-500">
                    ₹{item.drone.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQty(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
            <h2 className="text-xl font-bold">Total</h2>
            <span className="text-2xl font-bold text-yellow-500">
              ₹{total}
            </span>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}