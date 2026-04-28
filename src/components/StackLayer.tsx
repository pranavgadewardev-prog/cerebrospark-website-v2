"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StackLayer({ children, index }: { children: React.ReactNode, index: number }) {
  const container = useRef(null);

  useGSAP(() => {
    // A subtle fade and lift as the section enters the viewport
    gsap.fromTo(container.current, 
      { opacity: 0, y: 50 }, 
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom-=100", 
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full" 
      style={{ zIndex: index * 10 }}
    >
      <div className="sticky top-0 w-full min-h-screen bg-white rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] transition-transform duration-500">
        {/* Content wrapper: no-scrollbar ensures tall content is accessible but clean */}
        <div className="w-full min-h-screen py-24 px-6 md:px-5 max-w-7xl mx-auto no-scrollbar">
          {children}
        </div>
      </div>
      
      {/* Spacer to prevent background bleeding through rounded corners */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white -z-1" />
    </section>
  );
}