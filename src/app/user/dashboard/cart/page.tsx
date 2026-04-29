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

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay: new (options: unknown) => {
      open: () => void;
    };
  }
}

/* ================= COMPONENT ================= */

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  /* ================= FETCH CART ================= */

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
      return;
    }

    if (!data) {
      setCart([]);
      return;
    }

    const cleaned: CartItem[] = data
      .map((item) => {
        const drone = Array.isArray(item.drones)
          ? item.drones[0]
          : item.drones;

        if (!drone) return null;

        return {
          id: item.id,
          quantity: item.quantity,
          drone: {
            id: drone.id,
            name: drone.name,
            price: drone.price,
            image_url: drone.image_url,
          },
        };
      })
      .filter((item): item is CartItem => item !== null);

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

  /* ================= CART ACTIONS ================= */

  const removeItem = async (id: string) => {
    await supabase.from("cart").delete().eq("id", id);
    fetchCart();
  };

  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;
    await supabase.from("cart").update({ quantity: qty }).eq("id", id);
    fetchCart();
  };

  /* ================= TOTAL ================= */

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.drone.price,
    0
  );

  /* ================= RAZORPAY ================= */

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve(false);
        return;
      }

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setCheckoutLoading(true);

    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }

      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData?.id) {
        throw new Error("Order creation failed");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Cerebrospark",
        description: "Drone Purchase",
        order_id: orderData.id,

        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch(
              "/api/razorpay/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...response,
                  cart,
                  total,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error);
            }

            alert("Payment successful!");
            fetchCart();
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#facc15",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  /* ================= UI ================= */

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
                  alt={item.drone.name}
                  className="w-24 h-20 object-cover rounded-lg"
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

          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </>
      )}
    </div>
  );
}