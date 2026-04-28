"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  tagline: string;
  description: string;
  image: string;
  background: string; // NEW
  metrics?: { value: string; label: string }[];
  applications: string[];
  features: string[];
  link?: string;
}

const products: Product[] = [
  {
    name: "CS_KRISHI_10L",
    tagline: "Smart Agriculture Spraying Drone",
    image: "/products/cs-krishi-10l.png",
    background: "/drones_bg/bg_1.jpg",
    description:
      "Maximize farm productivity with precise, uniform spraying across diverse and challenging terrains. Engineered to reduce input costs while improving crop health and yield efficiency.",
    metrics: [
      { value: "10x", label: "Faster than Manual" },
      { value: "30%", label: "Chemical Savings" },
      { value: "100%", label: "Hard-to-Reach Coverage" },
      { value: "5x", label: "More Precise" },
    ],
    applications: ["Seed Dropping", "Fish Feeding", "Pesticide Spraying"],
    features: [
      "Flight Time: 25 min",
      "Obstacle Avoidance",
      "Ground Radar",
      "Auto Flight Mode",
      "Spray Tank: 12L",
      "Flying Radius: 1 KM",
      "Total Weight: 29.98 kg",
    ],
    link: "/drones/cs_krishi_10L",
  },
  {
    name: "CS-MAMBA",
    tagline: "Surveillance & Disaster Management Drone",
    image: "/drones/cs-mamba-images/mamba.png",
    background: "/drones_bg/bg_6.jpg",
    description:
      "CS-MAMBA is a powerful quadcopter built for surveillance, disaster response, and mapping. With long endurance, night vision, and payload capabilities, it supports intelligence gathering, emergency assessment, and rescue coordination.",
    applications: [
      "Security & Surveillance",
      "Disaster Management",
      "Payload Delivery",
    ],
    metrics: [
      { value: "60 min", label: "Flight Time" },
      { value: "11 Kms", label: "Range" },
      { value: "2 kg", label: "Payload Capacity" },
    ],
    features: [
      "Flight Time: 60 min",
      "Obstacle Avoidance",
      "Night Vision",
      "Range: 11 Kms",
      "Payload Capacity: 2 kg",
    ],
    link: "/drones/cs-mamba",
  },
  // {
  //   name: "CS-BEE",
  //   tagline: "Lightweight & Educational Drone",
  //   image: "/products/cs-bee.png",
  //   description:
  //     "CS-BEE is a compact and lightweight quadcopter suitable for live streaming, training, and recreational flying. It is ideal for beginners and educational use while also supporting reconnaissance and real-time video transmission.",
  //   metrics: [
  //     { value: "10 min", label: "Flight Time" },
  //     { value: "2–3 m/s", label: "Flying Speed" },
  //     { value: "720p", label: "Video Quality" },
  //   ],
  //   applications: ["Toy Drone", "Live Streaming", "Training"],
  //   features: [
  //     "Flight Time: 10 min",
  //     "Flying Speed: 2–3 m/s",
  //     "360° Flip",
  //     "720p Video",
  //     "Auto Take-off & Landing",
  //     "Total Weight: 80 g",
  //   ],
  //   link: "/drones/cs-bee",
  // },
  {
    name: "CS-PRIDE",
    tagline: "Personal Surveillance Drone",
    image: "/drones/cs-pride-images/cs-pride-2.png",
    background: "/drones_bg/bg_4.jpg",
    description:
      "CS-PRIDE is a compact surveillance drone engineered for security and monitoring operations. With a high-resolution camera and agile maneuverability, it ensures rapid situational awareness in urban and remote environments.",
    metrics: [
      { value: "4K", label: "Camera Resolution" },
      { value: "20 min", label: "Flight Time" },
      { value: "249 g", label: "Total Weight" },
    ],
    applications: ["Photography", "Security & Surveillance"],
    features: [
      "4K Camera",
      "Obstacle Avoidance",
      "Nano Drone Design",
      "Total Weight: 249 g",
    ],
    link: "/drones/cs-pride",
  },
  // {
  //   name: "CS-BHEEM",
  //   tagline: "High Payload Defence Drone",
  //   image: "/products/cs-bheem.png",
  //   description:
  //     "Bheem is an indigenous heavy-lift hexacopter developed for defence logistics. With a payload capacity of 30 kg, it is designed for aerial delivery of equipment, supplies, and emergency aid in challenging environments.",
  //   metrics: [
  //     { value: "25 min", label: "Flight Time" },
  //     { value: "102 kg", label: "AUW" },
  //     { value: "30 kg", label: "Payload Capacity" },
  //   ],
  //   applications: ["High-Altitude Payload Delivery"],
  //   features: ["Flight Time: 25 min", "AUW: 102 kg", "Payload Capacity: 30 kg"],
  //   link: "/drones/cs-bheem",
  // },
  {
    name: "CS-BHEEM",
    tagline: "Tactical Payload UAV",
    image: "/drones/cs-bheem-images/bheem.png",
    background: "/drones_bg/bg_7.jpg",
    description:
      "CS-BHEEM is a high-precision autonomous UAV engineered for tactical payload deployment, surveillance, and mission-critical operations. Designed for defense logistics, disaster response, and industrial aerial transport, it delivers reliable endurance, operational flexibility, and accurate payload delivery in challenging environments.",
    metrics: [
      { value: ">30 min", label: "Flight Time" },
      { value: "20 kg", label: "Payload Capacity" },
      { value: "10 km*", label: "Operational Range" },
    ],
    applications: [
      "Defense Logistics",
      "Disaster Relief Payload Delivery",
      "Industrial & Remote Logistics",
      "Surveillance Support",
    ],
    features: [
      "Payload Capacity: 20 kg",
      "Endurance: >30 minutes",
      "Wind Resistance: 36 km/h",
      "Max Launch Altitude: 3000 m AMSL",
      "Operating Altitude: 500 m AGL",
      "Camera Payload: HD + Thermal Options",
    ],
    link: "/drones/cs-bheem",
  },
];

export default function Products() {
  return (
    <section className="bg-gray-50">
      <section className="relative w-full overflow-hidden mb-16 h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-screen bg-white">
        {/* Background Video */}
        <video
          className="w-full h-full object-contain lg:object-cover"
          src="/products/products2.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </section>

      <div className="relative z-10 flex items-center justify-center text-center px-6 py-16 mb-16">
        {/* subtle background accent */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[520px] h-[520px] bg-yellow-400/20 blur-3xl rounded-full" />
        </div>

        <div className=" px-14 py-12 rounded-3xl bg-white/70 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] border border-black/5 animate-products-slide-down">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Our <span className="text-yellow-400">Products</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Engineering reliable drone platforms and intelligent aerial
            solutions for mission-critical applications.
          </p>
        </div>
      </div>

      {/* ================= PRODUCT SECTIONS ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {products.map((product, index) => {
          const reverse = index % 2 !== 0;

          return (
            <section
              key={product.name}
              className="border border-gray-200 rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className={`flex flex-col ${
                  reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-14 p-10`}
              >
                {/* IMAGE */}
                <div className="w-full lg:w-1/2">
                  {/* <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                    />
                  </div> */}
                  <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                    {/* Background Image */}
                    <Image
                      src={product.background}
                      alt={`${product.name} background`}
                      fill
                      className="object-cover"
                    />

                    {/* Dark overlay for contrast */}
                    {/* <div className="absolute inset-0 bg-black/40"></div> */}

                    {/* Drone Image */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-xl drop-shadow-gray-700 p-6 relative z-10"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-green-700 font-semibold mt-1">
                    {product.tagline}
                  </p>

                  <p className="mt-5 text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  {product.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                      {product.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="bg-gray-50 border hover:scale-105 hover:shadow-lg hover:shadow-amber-400 rounded-xl p-4 text-center transition"
                        >
                          <div className="text-2xl font-bold text-yellow-500">
                            {m.value}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Applications
                    </h4>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {product.applications.map((app) => (
                        <span
                          key={app}
                          className="px-4 py-1.5 text-sm rounded-full hover:shadow-lg hover:scale-105 hover:shadow-green-300 transition bg-green-100 text-green-800"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm">
                      {product.features.map((f) => (
                        <li key={f}>• {f}</li>
                      ))}
                    </ul>
                    <Link
                      href={product.link || "#"}
                      className="mt-4 inline-block text-green-700 font-semibold hover:underline"
                    >
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
