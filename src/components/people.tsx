"use client";

import Image from "next/image";
import Link from "next/link";

const TEAM_MEMBERS = [
  {
    name: "Mr. Ganesh Thorat",
    role: "Founder & Chief Executive Officer",
    photo: "/people/Ganesh Thorat.png",
    link: "https://www.linkedin.com/in/ganesh-thorat-963884196/",
    bio: "Every meaningful journey begins with curiosity and the courage to build something new. My journey in the drone industry started during my college days while working on drone technology along with Mihir. What began as an academic exploration soon evolved into a deeper realization that India needed stronger indigenous capabilities in this rapidly growing sector. This realization led to the establishment of Cerebrospark Innovations, with the vision of building reliable, high-quality drone technologies designed and manufactured in India. Over the years, our efforts have been focused on creating practical drone solutions across sectors such as agriculture, surveillance, inspection, training, and industrial applications, while simultaneously contributing to the growth of India’s drone ecosystem. Alongside technology development, we also recognized the importance of building skilled professionals in this field, which led to the creation of Cerebrospark Academy, a DGCA authorized Remote Pilot Training Organization dedicated to developing the next generation of drone pilots and professionals. It has been an honour to see our work recognized by various national and international platforms, including being acknowledged among the Top Young Change Makers by United Nations India and UNICEF. However, for me the real motivation lies in continuously innovating, solving real-world problems, and making advanced drone technology more accessible and impactful for industries and communities across India. As we move forward, our focus remains clear: to build world-class drone technologies, nurture talent, and contribute towards strengthening India’s position in the global drone ecosystem.",
  },
  {
    name: "Mr. Mihir Kedar",
    role: "Founder, CMO & CTO",
    photo: "/people/Mihir Kedar.png",
    link: "https://www.linkedin.com/in/mihir-kedar-092286190/",
    bio: "Engineering has always been about solving real problems through innovation. My journey with drones began during my engineering days, where what started as curiosity gradually turned into a deep passion for unmanned systems, robotics, and emerging technologies. Over the years, I have had the opportunity to work on and mentor several projects related to drones, UAVs, and robotics, which strengthened my belief in the immense potential this technology holds. As a DGCA Certified Remote Pilot Instructor, I strongly believe that along with technology development, building skilled professionals is equally important for the growth of the drone ecosystem in India. This belief continues to guide my work in developing advanced drone platforms while also contributing to knowledge sharing and skill development in this field. At Cerebrospark Innovations, our focus is on building reliable, high-performance drone technologies that can serve critical sectors including surveillance, inspection, agriculture, and defence applications. Strengthening indigenous drone capabilities is essential for the country’s technological progress, and we remain committed to continuous innovation and research in this rapidly evolving industry. It has been encouraging to see our work being recognized by media platforms such as The Times of India and News18 Lokmat, but the true motivation lies in pushing technological boundaries and contributing to a stronger, self-reliant drone ecosystem in India.",
  },
  {
    name: "Mr. Rushikesh Sonawane",
    role: "Chief Operating Officer",
    photo: "/people/Rushikesh Sonawane.png",
    link: "https://www.linkedin.com/in/rushikesh-sonawane-0a0934294/",
    bio: "Technology becomes truly powerful when it is combined with purpose and teamwork. As a mechanical engineer working in the field of drones, UAVs, and mechatronics for several years, I have always been fascinated by how emerging technologies can transform traditional industries and create new opportunities. At Cerebrospark Innovations, my focus has been on strengthening the design, development, and research aspects of UAV technology while ensuring that our solutions address practical challenges across sectors. One area that particularly inspires me is agriculture, where drone technology can play a significant role in making farming smarter, more efficient, and sustainable. Beyond technology, I strongly believe that people are the true strength of any organization. Building a collaborative environment where innovation, learning, and mutual respect thrive is essential for any team to grow and succeed. By fostering strong connections and encouraging teamwork, we aim to create a workplace where ideas turn into impactful solutions. As we continue to grow, our goal remains to advance indigenous drone technologies and contribute to building a strong and dynamic drone ecosystem in India.",
  },
];

export default function People() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
            Leadership
          </h2>
          <p className="text-gray-500 mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            The minds driving innovation and shaping the future of drone technology.
          </p>
        </div>

        {/* TEAM */}
        <div className="space-y-12 flex flex-col gap-8 md:gap-10">
          {TEAM_MEMBERS.map((person, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-yellow-200 via-white to-yellow-400 border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[2px] overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">

                {/* LEFT SIDE */}
                <div className="md:w-1/2 w-full flex flex-col p-4 sm:p-6">
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[420px] overflow-hidden bg-yellow-500 rounded-2xl">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center p-4 sm:p-5 bg-gray-950 backdrop-blur-sm rounded-xl mt-4 shadow-sm">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {person.name}
                    </h3>
                    <p className="text-yellow-600 font-medium text-sm md:text-base mt-1">
                      {person.role}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="md:w-1/2 w-full flex flex-col p-4 sm:p-6">

                  {/* BIO (ALWAYS SCROLLABLE) */}
                  <div className="overflow-y-auto pr-2 custom-scroll h-[220px] sm:h-[260px] md:h-[420px]">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-[15px] md:text-base tracking-[0.2px]">
                      {person.bio}
                    </p>
                  </div>

                  {/* BUTTON */}
                  {person.link && (
                    <div className="mt-4 sm:mt-5">
                      <Link
                        href={person.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-black text-white px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                      >
                        View LinkedIn →
                      </Link>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}