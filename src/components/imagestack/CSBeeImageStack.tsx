"use client";

import Image from "next/image";

const IMAGES: string[] = [
  "/drones/cs-bee-images/cs-bee.png",
  "/drones/cs-bee-images/cs-bee-1.png",
  "/drones/cs-bee-images/cs-bee-2.png",
  "/drones/cs-bee-images/cs-bee-3.png",
  "/drones/cs-bee-images/cs-bee-4.png",
  "/drones/cs-bee-images/cs-bee-5.png",
];

export default function CsBeeImageStack() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-16">
      {IMAGES.map((src: string, index: number) => (
        <div
          key={index}
          className="relative w-full h-[320px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        >
          {/* Image */}
          <Image
            src={src}
            alt={`CS-BEE Image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              CS-BEE Smart Quadcopter
            </h3>

            <p className="max-w-xl text-sm sm:text-base text-white/80">
              A compact, beginner-friendly quadcopter designed for learning,
              aerial exploration, and live streaming. Experience intuitive
              control, stable flight, and creative possibilities with CS-BEE.
            </p>

            <div>
              <button
                className="inline-flex items-center justify-center rounded-full bg-yellow-500 hover:bg-gray-400 text-black font-semibold px-6 py-3 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.8)]"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
