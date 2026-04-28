"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Drone {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
}

export default function AdminDronesPage() {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrones = async () => {
    try {
      const { data, error } = await supabase
        .from("drones")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setDrones(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrones();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this drone?");
    if (!confirmDelete) return;

    await supabase.from("drones").delete().eq("id", id);
    fetchDrones();
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Manage <span className="text-yellow-500">Drones</span>
      </h1>

      <div className="grid gap-6">
        {drones.map((drone) => (
          <div
            key={drone.id}
            className="bg-white p-6 rounded-2xl shadow flex gap-6 items-center"
          >
            <img
              src={drone.image_url}
              className="w-32 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-bold text-lg">{drone.name}</h2>
              <p className="text-gray-500 text-sm">
                ₹{drone.price} • Stock: {drone.stock}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-yellow-400 rounded-lg">
                Edit
              </button>

              <button
                onClick={() => handleDelete(drone.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}