"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import NewsAndUpdates from "./NewsAndUpdates";
import Link from "next/link";

interface Media {
  name: string;
  logo: string;
  description: string;
  link: string;
}

const mediaList: Media[] = [
  {
    name: "Lokmat",
    logo: "/tv-channels/lokmat-image.png",
    description: "Team Cerebrospark featured on Lokmat News",
    link: "https://youtu.be/1zddFVlVq7Y?si=BX6qr28r2Kzty9OX",
  },
  {
    name: "Sam TV",
    logo: "/tv-channels/saam-image.png",
    description: "Coverage on SamTV highlighting innovation",
    link: "https://youtu.be/WXcyDnz5nIE?si=Uqf83xuU6NMR6P4L",
  },
  {
    name: "TV9",
    logo: "/tv-channels/tv9-image.png",
    description: "National coverage on TV9 News",
    link: "https://youtu.be/96Tx5k5V9g0?si=O_vM3gqw80u5Bu90",
  },
  {
    name: "Navbharat Times",
    logo: "/tv-channels/nbt-image.png",
    description: "Featured in NBT for emerging technology",
    link: "https://youtu.be/KlWPtmK3tbA?si=7Uj8EpNh5iaGWCzA",
  },
  {
    name: "Zee 24 Taas",
    logo: "/tv-channels/zee-image.png",
    description: "Interview & showcase on Zee 24 Taas",
    link: "https://youtu.be/2YysPRZ_8NQ?si=9aROY5sy5OycTimV",
  },
  {
    name: "Youtube",
    logo: "/tv-channels/piyushgoyal.png",
    description: "Interview & showcase on Piyush Goyal Show",
    link: "https://youtu.be/ec-JPLJPJ9g?si=tY4JVqzkgE_Dy6ZB",
  },
];

export default function FeaturedInTV() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center w-full h-auto bg-gray-800">
          <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-white p-4 sm:p-6 md:p-8 lg:p-10">
            MEDIA <span className="text-yellow-400">PRESENCE</span>
          </h2>
        </div>
      </div>

      <section className="py-16 px-6 bg-[#f8fafc]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="mt-6 text-gray-600 font-bold text-2xl">
            Our innovations and impact have been showcased across major national
            and regional media platforms.
          </p>
        </motion.div>

        {/* TV Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 max-w-7xl mx-auto">
          {mediaList.map((media, index) => (
            <motion.div
              key={media.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center hover:scale-105 transition-transform duration-300 "
            >
              
              <div className="flex gap-5 mb-2">
                <span className="w-10 h-0.5 bg-gray-400 rotate-60" />
                <span className="w-10 h-0.5 bg-gray-400 rotate-[-240deg]" />
              </div>
              
              <div onClick={() => window.open(media.link, "_blank")} className="relative w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-yellow-400">
                
                <div className="relative h-40 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center">
                  <Image
                    src={media.logo}
                    alt={media.name}
                    width={180}
                    height={80}
                    className="object-contain"
                  />

                  
                  <div className="absolute inset-0 rounded-xl ring-1 ring-yellow-400/10" />
                </div>

                
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-300 rounded-full" />
              </div>

              
              <div className="text-center mt-8 max-w-xs">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {media.name}
                </h3>
                <p className="text-sm text-gray-600">{media.description}</p>
              </div>
            </motion.div>
          ))}
        </div> */}
        {/* TV Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 max-w-7xl mx-auto">
          {mediaList.map((media, index) => (
            <motion.div
              key={media.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              {/* TV Antenna */}
              <div className="flex gap-5 mb-2">
                <span className="w-10 h-0.5 bg-gray-400 rotate-60" />
                <span className="w-10 h-0.5 bg-gray-400 -rotate-60" />
              </div>

              {/* TV Body */}
              <div
                onClick={() => window.open(media.link, "_blank")}
                className="relative w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-yellow-400 cursor-pointer active:scale-95 transition p-7"
              >
                {/* Screen */}
                <div className="relative h-40 w-full overflow-hidden  bg-gray-100 border border-gray-200">

                  {/* IMAGE FIX (MAIN CHANGE) */}
                  <Image
                    src={media.logo}
                    alt={media.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />

                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-black text-xl shadow-md">
                      ▶
                    </div>
                  </div>

                  {/* Screen Glow */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-yellow-400/10" />
                </div>

                {/* TV Stand */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-300 rounded-full" />
              </div>

              {/* Caption */}
              <div className="text-center mt-8 max-w-xs">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {media.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {media.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section>
        <NewsAndUpdates />
      </section>
    </>
  );
}
