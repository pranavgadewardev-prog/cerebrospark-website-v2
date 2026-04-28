import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function ScrollTriggered() {
    return (
        <>
            <div
                className="flex flex-col justify-center items-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl p-4 sm:p-6 md:p-8 lg:p-10 w-full bg-gray-900">
                <h1 className="font-bold text-white">
                    EXPLORE OUR <span className="text-yellow-400">APPLICATIONS</span>
                </h1>
            </div>

            <div style={container}>
                {items.map((item, i) => (
                    <Card key={item.title} i={i} item={item} />
                ))}
            </div>
        </>
    );
}

interface CardItem {
    image: string;
    title: string;
    description: string;
    hueA: number;
    hueB: number;
}

interface CardProps {
    item: CardItem;
    i: number;
}

function Card({ item, i }: CardProps) {
    const background = `linear-gradient(306deg, #facc15, #fde047)`; // ✅ yellow only

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div style={{ ...splash, background, pointerEvents: "none" }} />

            <motion.div style={card} variants={cardVariants} className="card">
                <div style={contentWrap}>
                    <img src={item.image} alt={item.title} style={imageStyle} />
                    <h2 style={titleStyle}>{item.title}</h2>
                    <p style={descStyle}>{item.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "120px auto",
    maxWidth: 750,
    paddingBottom: 140,
    width: "100%",
};

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 40,
    marginBottom: -170,
};

/** Bigger splash behind card */
const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 760,
    height: 620,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 720 219.5 C 730.085 218.033 740 228.454 740 239.5 L 760 560 C 760 571.046 751.046 580 740 580 L 20 580 C 8.954 580 0 571.046 0 560 Z")`,
};

const card: React.CSSProperties = {
    width: 460,
    height: 590,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
    padding: 22,
};

const contentWrap: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 14,
    textAlign: "center",
};

const imageStyle: React.CSSProperties = {
    width: "100%",
    height: 320,
    objectFit: "contain",
    borderRadius: 22,
    background: "#f3f4f6",
    padding: 12,
};

const titleStyle: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
};

const descStyle: React.CSSProperties = {
    fontSize: 16,
    opacity: 0.8,
    margin: 0,
    lineHeight: 1.5,
    paddingInline: 10,
};

/**
 * ==============   Data   ================
 */

const items: CardItem[] = [
  {
    image: "/scroll/CS_KRISHI_10L.jpg",
    title: "Agriculture Drone",
    description:
      "Boost farm productivity with precision spraying, crop monitoring, and smart field analytics.",
    hueA: 340,
    hueB: 10,
  },
  {
    image: "/scroll/cs-mamba.jpg",
    title: "Survellience Drone",
    description:
      "Enhance security with real-time aerial surveillance, wide-area coverage, and night monitoring support.",
    hueA: 20,
    hueB: 40,
  },
//   {
//     image: "/scroll/cs-BEE.jpg",
//     title: "Spy Drone",
//     description:
//       "Built for stealth missions with silent flight, compact design, and secure high-resolution intelligence capture.",
//     hueA: 205,
//     hueB: 245,
//   },
  {
    image: "/scroll/CS-PRIDE.jpg",
    title: "Racing Drone",
    description:
      "Experience extreme speed and control with high-thrust performance tuned for competitive racing.",
    hueA: 260,
    hueB: 290,
  },
  {
    image: "/scroll/CS-BHEEM.jpg",
    title: "Delivery Drone",
    description:
      "Enable fast last-mile delivery with payload stability, route automation, and safe drop precision.",
    hueA: 260,
    hueB: 290,
  },
];
