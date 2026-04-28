// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface Drone {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image_url: string;
//   stock: number;
// }

// export default function ViewDronesPage() {
//   const [drones, setDrones] = useState<Drone[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDrones = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("drones")
//           .select("*"); // ✅ removed is_active filter

//         if (error) {
//           console.error("Supabase Error:", error.message);
//           throw error;
//         }

//         setDrones(data || []);
//       } catch (err) {
//         console.error("Error fetching drones:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDrones();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh] text-gray-500">
//         Loading drones...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 md:p-10 space-y-8">
//       {/* Header */}
//       <div className="bg-white rounded-3xl shadow p-6 md:p-8 border border-gray-100">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Explore <span className="text-yellow-500">Drones</span>
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Browse our latest drone technology and innovations.
//         </p>
//       </div>

//       {/* Grid */}
//       {drones.length === 0 ? (
//         <div className="text-center text-gray-500 mt-10">
//           No drones available
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {drones.map((drone) => (
//             <div
//               key={drone.id}
//               className="bg-white rounded-3xl shadow hover:shadow-xl transition border border-gray-100 overflow-hidden group"
//             >
//               {/* Image */}
//               <div className="h-52 overflow-hidden">
//                 <img
//                   src={drone.image_url} // ✅ FIXED
//                   alt={drone.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-5 space-y-3">
//                 <h2 className="text-lg font-bold text-gray-900">
//                   {drone.name}
//                 </h2>

//                 <p className="text-sm text-gray-500 line-clamp-2">
//                   {drone.description}
//                 </p>

//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-yellow-500 font-bold text-lg">
//                     ₹{drone.price}
//                   </span>

//                   <span className="text-xs text-gray-400">
//                     Stock: {drone.stock}
//                   </span>
//                 </div>

//                 <button className="w-full mt-2 px-4 py-2 text-sm bg-black text-white rounded-xl hover:bg-gray-800 transition">
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

interface Drone {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
}

export default function ViewDronesPage() {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [adding, setAdding] = useState<string | null>(null);

  /* ================= FETCH DRONES ================= */

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const { data, error } = await supabase.from("drones").select("*");

        if (error) throw error;

        setDrones(data || []);

        // initialize quantities
        const initialQty: Record<string, number> = {};
        (data || []).forEach((d: Drone) => {
          initialQty[d.id] = 1;
        });
        setQuantities(initialQty);
      } catch (err) {
        console.error("Error fetching drones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrones();
  }, []);

  /* ================= QUANTITY HANDLERS ================= */

  const increaseQty = (id: string, stock: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 1) + 1, stock),
    }));
  };

  const decreaseQty = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  /* ================= ADD TO CART ================= */

  const addToCart = async (droneId: string) => {
    try {
      setAdding(droneId);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const qty = quantities[droneId] || 1;

      // 🔍 Check if already in cart
      const { data: existing } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id)
        .eq("drone_id", droneId)
        .single();

      if (existing) {
        // 🔁 Update quantity
        await supabase
          .from("cart")
          .update({ quantity: existing.quantity + qty })
          .eq("id", existing.id);
      } else {
        // ➕ Insert new
        await supabase.from("cart").insert([
          {
            user_id: user.id,
            drone_id: droneId,
            quantity: qty,
          },
        ]);
      }

      alert("Added to cart ✅");
    } catch (err) {
      console.error("Cart error:", err);
      alert("Failed to add to cart");
    } finally {
      setAdding(null);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading drones...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow p-6 md:p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">
          Explore <span className="text-yellow-500">Drones</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Browse our latest drone technology and innovations.
        </p>
      </div>

      {/* Grid */}
      {drones.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No drones available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drones.map((drone) => (
            <div
              key={drone.id}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition border border-gray-100 overflow-hidden group"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={drone.image_url}
                  alt={drone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {drone.name}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {drone.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-yellow-500 font-bold text-lg">
                    ₹{drone.price}
                  </span>

                  <span className="text-xs text-gray-400">
                    Stock: {drone.stock}
                  </span>
                </div>

                {/* 🔢 Quantity Selector */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(drone.id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{quantities[drone.id] || 1}</span>

                    <button
                      onClick={() =>
                        increaseQty(drone.id, drone.stock)
                      }
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(drone.id)}
                    disabled={adding === drone.id}
                    className="px-4 py-2 text-sm bg-black text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {adding === drone.id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}