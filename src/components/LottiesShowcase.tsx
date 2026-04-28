"use client";

import React from "react";
import dynamic from "next/dynamic";

/* ===================== SAFE DYNAMIC IMPORT ===================== */

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then(
      (mod) => mod.DotLottieReact
    ),
  { ssr: false }
);

/* ===================== LOTTIE DATA ===================== */
/* Updated as per new lottifiles */

const lotties = [
  {
    id: "lottie-1",
    src: "https://lottie.host/9aa2bfea-3566-4638-b7c5-031c294a92c3/LHsOlYd9Aa.lottie",
    label: "Lottie 1"
  },
  {
    id: "lottie-2",
    src: "https://lottie.host/d8c86282-afe8-4d87-ab0a-3c8ef36364c7/A5LNINQEwT.lottie",
    label: "Lottie 2"
  },
  {
    id: "lottie-3",
    src: "https://lottie.host/a782d6f5-ad21-4d4a-a103-cdff69232485/wtgTAew1PK.lottie",
    label: "Lottie 3"
  },
  {
    id: "lottie-4",
    src: "https://lottie.host/4d10bd86-39d2-4f99-a60c-ba378c20b3ef/MIbheHW1m3.lottie",
    label: "Lottie 4"
  },
  {
    id: "lottie-5",
    src: "https://lottie.host/df8cc4f9-a509-440b-af86-5897f951e8cf/L1FwVjHa2K.lottie",
    label: "Lottie 5"
  },
  {
    id: "lottie-6",
    src: "https://lottie.host/0740979d-0810-4767-99d3-892725db2b67/bCtht6HR1f.lottie",
    label: "Lottie 6"
  },
  {
    id: "lottie-7",
    src: "https://lottie.host/654fbc39-8aa9-411d-9fea-0dbe89f511ce/aKt7hAfH18.lottie",
    label: "Lottie 7"
  }
];

/* ===================== COMPONENT ===================== */

export default function LottiesShowcase() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center">
          {lotties.map((item) => (
            <div
              key={item.id}
              className="w-72 h-72 flex items-center justify-center pointer-events-none"
            >
              <DotLottieReact
                src={item.src}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
