"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const news = [
  {
    title: "Next-Generation Agricultural Drone Launched",
    description: "Felicitated by Hon. Shri Chandrakant Dada Patil - Higher and Technical Education Minister of Maharashtra",
    image: "/news_and_updates/1.jpg",
    category: "Product Launch",
    date: "July, 2023",
  },
  {
    title: "Strategic Aerospace Collaboration",
    description: "Felicitated by Dr. Mohit Dubey sir (CEO of AIC MIT ADT Incubator Forum) and Dr. Virendra Bhojwani sir ( President IIC, MIT ADTU)",
    image: "/news_and_updates/2.jpg",
    category: "Collaboration",
    date: "December, 2022",
  },
  {
    title: "Industrial Inspection with UAV Systems",
    description: "Felicitated by Hon. Dr. Tanajirao Sawant - Ex-minister of Maharashtra State Public Health and Welfare",
    image: "/news_and_updates/3.jpg",
    category: "Technology",
    date: "January, 2023",
  },
  {
    title: "Industrial Inspection with UAV Systems",
    description: "Won the 3rd prize on Global Entrepreneurs Conclave 2025.",
    image: "/news_and_updates/4.jpg",
    category: "Technology",
    date: "January, 2025",
  },
  {
    title: "Industrial Inspection with UAV Systems",
    description: "Recognized by Hon. Shri Piyush Goyal - Minister of Commerce and Industry in Government of India",
    image: "/news_and_updates/5.jpg",
    category: "Technology",
    date: "December, 2021",
  },
  {
    title: "Industrial Inspection with UAV Systems",
    description: `Interaction with Hon. Chief Minister of Maharashtra, Mr. Devendra Fadnavis at the Nation Startup Day 2025 exhibition held at the prestigious Jio World Convention Center, BKC, Mumbai.`,
    image: "/news_and_updates/7.jpg",
    category: "Technology",
    date: "December, 2025",
  },
];

export default function ProfessionalNews() {
  return (
    <section className="w-full py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header: Minimal & Aligned */}
        <header className="flex flex-col md:flex-row md:items-end justify-center mb-16 border-b border-gray-100 pb-10">
          <div className="max-w-4xl">
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
              Interaction With <span className="text-yellow-500">Policy Makers</span>
            </h3>
          </div>
        </header>

        {/* Grid: 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {news.map((item, idx) => (
            <article key={idx} className="group cursor-pointer">
              {/* Image with subtle zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6 transition-all duration-500 group-hover:shadow-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover  group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-3 mb-4">
                {/* <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 text-gray-600">
                  {item.category}
                </span> */}
                <span className="text-xs text-gray-400 font-medium">{item.date}</span>
              </div>

              {/* Text Content */}
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300 leading-snug">
                {item.description}
              </h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}