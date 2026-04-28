// "use client";
// import { link } from "fs";
// import Image from "next/image";
// import Link from "next/link";

// const drones = [
//   {
//     name: "CS_Krishi_10L",
//     title: "Agriculture Drone",
//     image: "/drones/cs-krishi-images/cs-krishi.png",
//     tag: "Featured",
//     link: "/drones/cs_krishi_10L",
//   },
//   {
//     name: "CS-Mamba",
//     title: "Surveillance Drone",
//     image: "/drones/cs-mamba-images/cs-mamba.png",
//     link: "/drones/cs-mamba",
//   },
//   // {
//   //   name: "CS-Bee",
//   //   title: "Spy Drone",
//   //   image: "/drones/cs-bee-images/cs-bee.png",
//   //   link: "/drones/cs-bee",
//   // },
//   {
//     name: "CS-Pride",
//     title: "FPV Drone",
//     image: "/drones/cs-pride-images/cs-pride-1.png",
//     link: "/drones/cs-pride",
//   },
//   {
//     name: "CS-Bheem",
//     title: "Delivery Drone",
//     image: "/drones/cs-bheem-images/cs-bheem.png",
//     link: "/drones/cs-bheem",
//   },
// ];

// export default function DroneShowcase() {
//   return (
//     <section className="py-8 bg-white w-full flex flex-col justify-center items-center">
//       {/* Heading */}
//       <h1 className="text-2xl font-bold text-gray-800 p-10">
//         <span className="block sm:hidden">Swipe to Explore Our Drones</span>
//         <span className="hidden sm:block">Our Drones</span>
//       </h1>

//       <div className="w-full max-w-7xl px-4 sm:px-6">
//         {/* Horizontal Scroll Container */}
//         {/* <div className=" flex overflow-x-auto scrollbar-hide gap-10 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:overflow-visible sm:justify-items- "> */}
//         <div className=" flex overflow-x-auto scrollbar-hide gap-10 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:overflow-visible justify-center justify-items-center mx-auto ">
//           {drones.map((drone, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center shrink-0 min-w-[100px] sm:min-w-[120px] group cursor-pointer"
//             >
//               {/* Drone Image */}
//               <div className=" relative w-28 h-28 sm:w-24 sm:h-24 md:w-55 md:h-55 mb-2 transition-transform duration-300 group-hover:scale-110 ">
//                 <Image
//                   src={drone.image}
//                   alt={drone.title}
//                   fill
//                   className="object-contain"
//                 />
//               </div>

//               {/* name */}
//               <Link href={drone.link} className="w-full">
//                 <p className=" text-xs sm:text-sm md:text-base font-medium text-yellow-500 text-center ">
//                   {drone.name}
//                 </p>
//               </Link>

//               {/* Title */}
//               <p className=" text-xs sm:text-sm md:text-base font-medium text-gray-800 text-center ">
//                 {drone.title}
//               </p>

//               {/* Optional Tag */}
//               {drone.tag && (
//                 <span className="text-xs text-orange-500">{drone.tag}</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";

const drones = [
  {
    name: "CS_Krishi_10L",
    title: "Agriculture Drone",
    image: "/drones/cs-krishi-images/cs-krishi.png",
    tag: "Featured",
    link: "/drones/cs_krishi_10L",
  },
  {
    name: "CS-Mamba",
    title: "Surveillance Drone",
    image: "/drones/cs-mamba-images/cs-mamba.png",
    link: "/drones/cs-mamba",
  },
  {
    name: "CS-Pride",
    title: "FPV Drone",
    image: "/drones/cs-pride-images/cs-pride-1.png",
    link: "/drones/cs-pride",
  },
  {
    name: "CS-Bheem",
    title: "Delivery Drone",
    image: "/drones/cs-bheem-images/cs-bheem.png",
    link: "/drones/cs-bheem",
  },
];

export default function DroneShowcase() {
  return (
    <section className="py-10 bg-white w-full flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        <span className="block sm:hidden">Swipe to Explore Our Drones</span>
        <span className="hidden sm:block">Our Drones</span>
      </h1>

      <div className="w-full max-w-7xl px-4 sm:px-6">
        {/* Mobile Scroll / Desktop Grid */}
        <div className="flex overflow-x-auto scrollbar-hide gap-10 pb-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-12 sm:overflow-visible sm:place-items-center sm:justify-center">
          {drones.map((drone, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 min-w-[110px] sm:min-w-0 group cursor-pointer">
              
              {/* Drone Image */}
              <div className="relative w-28 h-28 sm:w-28 sm:h-28 md:w-72 md:h-72 lg:w-40 lg:h-40 mb-3 transition-transform duration-300 group-hover:scale-110">
                <Image src={drone.image} alt={drone.title} fill sizes="(max-width:640px) 112px, (max-width:768px) 112px, (max-width:1024px) 144px, 160px" className="object-contain" />
              </div>

              {/* Drone Name */}
              <Link href={drone.link} className="w-full">
                <p className="text-xs sm:text-sm md:text-base font-medium text-yellow-500 text-center">{drone.name}</p>
              </Link>

              {/* Drone Title */}
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 text-center">{drone.title}</p>

              {/* Optional Tag */}
              {drone.tag && (
                <span className="text-xs text-orange-500 mt-1">{drone.tag}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}