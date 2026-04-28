"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  "/Clients_Collaborations/clients/client1.png",
  // "/Clients_Collaborations/clients/client2.png",
  "/Clients_Collaborations/clients/client3.png",
  "/Clients_Collaborations/clients/client4.png",
  "/Clients_Collaborations/clients/client5.png",
  "/Clients_Collaborations/clients/client6.png",
  "/Clients_Collaborations/clients/client7.png",
  "/Clients_Collaborations/clients/client8.png",
  "/Clients_Collaborations/clients/client9.png",
  "/Clients_Collaborations/clients/client10.png",
];

const collaborators = [
  // "/Clients_Collaborations/collaborators/automation.jpeg",
  "/Clients_Collaborations/collaborators/bhartivid.jpeg",
  // "/Clients_Collaborations/collaborators/bihar2.jpeg",
  "/Clients_Collaborations/collaborators/bihargov.jpeg",
  "/Clients_Collaborations/collaborators/bulbkey.jpeg",
  "/Clients_Collaborations/collaborators/collgofeng.jpeg",
  "/Clients_Collaborations/collaborators/dpes.jpeg",
  "/Clients_Collaborations/collaborators/fstc.jpeg",
  "/Clients_Collaborations/collaborators/gurusys.jpeg",
  "/Clients_Collaborations/collaborators/indianarmy.jpeg",
  "/Clients_Collaborations/collaborators/jsp.jpeg",
  "/Clients_Collaborations/collaborators/jspm.jpeg",
  "/Clients_Collaborations/collaborators/mit.jpeg",
  "/Clients_Collaborations/collaborators/narhe.jpeg",
  "/Clients_Collaborations/collaborators/reachnew.jpeg",
  "/Clients_Collaborations/collaborators/rksons.jpeg",
  "/Clients_Collaborations/collaborators/sparkonix.jpeg",
  "/Clients_Collaborations/collaborators/tehri.jpeg",
  "/Clients_Collaborations/collaborators/visit.jpeg",
];

function CarouselRow({
  logos,
  reverse = false,
}: {
  logos: string[];
  reverse?: boolean;
}) {
  // Triple the logos to ensure no white space on ultra-wide monitors
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden w-full py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-6 sm:gap-10 md:gap-12 w-max will-change-transform"
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            // Increased dimensions: min-w (200px -> 280px) and height (h-32 -> h-48)
            className="flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 sm:px-12 sm:py-10 min-w-[200px] sm:min-w-[280px] h-32 sm:h-48 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={logo}
                alt={`Partner logo ${index + 1}`}
                fill
                className="object-contain transition-all duration-500 p-2"
                // Updated sizes to match the larger container dimensions
                sizes="(max-width: 768px) 200px, 280px"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClientCollaboratorCarousel() {
  return (
    <section className="bg-white pb-10 overflow-hidden">
      {/* Hero Header Section */}
      <div className="flex flex-col justify-center items-center w-full bg-gray-800 py-10 md:py-12 mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="font-black text-3xl sm:text-6xl md:text-7xl lg:text-6xl text-white tracking-tighter leading-none">
            OUR CLIENTS & <br className="hidden md:block" />
            <span className="text-yellow-500 bg-clip-text text-transparent">
              COLLABORATORS
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto space-y-18">

        {/* COLLABORATORS SECTION */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-8">
            <div className="h-[2px] flex-1 bg-gray-100" />
            {/* <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-[0.3em]">
              Global Clients
            </h3> */}
            <div className="h-[2px] flex-1 bg-gray-100" />
          </div>
          <CarouselRow logos={collaborators} reverse />
        </div>

        {/* CLIENTS SECTION */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-8">
            <div className="h-[2px] flex-1 bg-gray-100" />
            {/* <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-[0.3em]">
              Key Collaborators
            </h3> */}
            <div className="h-[2px] flex-1 bg-gray-100" />
          </div>
          <CarouselRow logos={clients} />
        </div>

        
      </div>
    </section>
  );
}