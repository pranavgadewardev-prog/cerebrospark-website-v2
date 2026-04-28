"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { supabase } from "@/lib/supabaseClient";

import HeroComponent from "@/components/HeroComponent";
import VisionBoard from "@/components/VisionBoard";
import Featured from "@/components/Featured";
import QuickView from "@/components/QuickView";
import FeaturedIn from "@/components/TvChannels";
import StackLayer from "@/components/StackLayer";
import Services from "@/components/Services";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import EventHighlight from "@/components/EventHighlight";
import EventAnnouncementBar from "@/components/EventAnnouncementBar";
import ClientCollaboratorCarousel from "@/components/ClientCollaboratorCarousel";
import Testimonial from "@/components/Testimonial";

gsap.registerPlugin(ScrollTrigger);

interface EventData {
  id: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  link?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function Home() {
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  const [event, setEvent] = useState<EventData | null>(null);

  /* ================= FETCH ACTIVE EVENT ================= */
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      const now = new Date();

      const activeEvent = data?.find((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        return event.isActive && now >= start && now <= end;
      });

      if (activeEvent) {
        setEvent(activeEvent);
      }
    };

    fetchEvent();
  }, []);

  /* ================= HERO GSAP ANIMATION ================= */
  useGSAP(() => {
    if (!heroInnerRef.current) return;

    gsap.to(heroInnerRef.current, {
      scale: 0.85,
      opacity: 0.3,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: heroInnerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      ease: "none",
    });
  });

  return (
    <main className="relative w-full bg-black">
      {/* ================= HERO ================= */}

      <section className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <EventAnnouncementBar />

        <div ref={heroInnerRef} className="h-full w-full will-change-transform">
          <HeroComponent />
        </div>
      </section>

      {/* ================= STACKED CONTENT ================= */}

      <div className="relative z-20 bg-white">
        {event && (
          <StackLayer index={-1}>
            <EventHighlight event={event} />
          </StackLayer>
        )}

        <StackLayer index={0}>
          <QuickView />
        </StackLayer>

        <StackLayer index={1}>
          <Services />
        </StackLayer>

        <StackLayer index={2}>
          <VisionBoard />
        </StackLayer>

        <StackLayer index={3}>
          <Featured />
        </StackLayer>

        <StackLayer index={5}>
          <WhyChooseUsSection />
        </StackLayer>
      </div>

      {/* ================= FINAL SECTIONS ================= */}

      <section className="relative z-30 bg-white border-t border-slate-100">
        <div className="py-15">
          <ClientCollaboratorCarousel />
        </div>
      </section>

      <section className="relative z-30 bg-white border-t border-slate-100">
        <div className="py-15">
          <FeaturedIn />
        </div>
      </section>

      <section className="relative z-30 bg-white border-t border-slate-100">
        <div>
          <Testimonial />
        </div>
      </section>

    </main>
  );
}