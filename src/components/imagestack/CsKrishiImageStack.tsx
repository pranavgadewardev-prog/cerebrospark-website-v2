"use client";

import Image from "next/image";

const IMAGES: string[] = [
  "/drones/cs-krishi-images/cs-krishi-1.png",
  "/drones/cs-krishi-images/cs-krishi-2.png",
  "/drones/cs-krishi-images/cs-krishi-3.png",
  "/drones/cs-krishi-images/cs-krishi-4.png",
  "/drones/cs-krishi-images/cs-krishi-5.png",
  "/drones/cs-krishi-images/cs-krishi-6.png",
  "/drones/cs-krishi-images/cs-krishi-7.png",
  "/drones/cs-krishi-images/cs-krishi-8.png",
];

export default function ImageStack() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-16">
      {IMAGES.map((src: string, index: number) => (
        <div
          key={index}
          className="relative w-full h-[320px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden "
        >
          {/* Image */}
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              CS-Krishi Agricultural Drone
            </h3>

            <p className="max-w-xl text-sm sm:text-base text-white/80">
              Precision farming redefined. Automate spraying, monitoring, and
              crop analysis with industry-grade drone technology built for
              modern agriculture.
            </p>

            <div>
              {/* <button
                className="inline-flex items-center justify-center rounded-full bg-yellow-500 hover:bg-gray-400 text-black font-semibold px-6 py-3 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(34,197,94,0.8)]"
              >
                Order Now
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
