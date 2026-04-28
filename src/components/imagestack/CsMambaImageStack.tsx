"use client";

import Image from "next/image";

const IMAGES: string[] = [
  "/drones/cs-mamba-images/cs-mamba-1.png",
  "/drones/cs-mamba-images/cs-mamba-2.png",
  "/drones/cs-mamba-images/cs-mamba-3.png",
  "/drones/cs-mamba-images/cs-mamba-4.png",
  "/drones/cs-mamba-images/cs-mamba-5.png",
  "/drones/cs-mamba-images/cs-mamba-6.png",
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
            alt={`CS-Mamba Drone Image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              CS-MAMBA Surveillance Drone
            </h3>

          </div>
        </div>
      ))}
    </section>
  );
}
