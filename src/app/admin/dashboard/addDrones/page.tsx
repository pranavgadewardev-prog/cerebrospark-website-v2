"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddDronePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!imageFile) return null;

    const filePath = `drones/${Date.now()}-${imageFile.name}`;

    const { error } = await supabase.storage
      .from("drone-images")
      .upload(filePath, imageFile);

    if (error) throw error;

    const { data } = supabase.storage
      .from("drone-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      if (!imageUrl) throw new Error("Image upload failed");

      const { error } = await supabase.from("drones").insert([
        {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          image_url: imageUrl, // ✅ FIXED
        },
      ]);

      if (error) throw error;

      alert("Drone added successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageFile(null);
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to add drone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">
        Add <span className="text-yellow-500">Drone</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          placeholder="Drone Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-3 rounded-xl"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="w-full border px-4 py-3 rounded-xl"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold"
        >
          {loading ? "Adding..." : "Add Drone"}
        </button>
      </form>
    </div>
  );
}