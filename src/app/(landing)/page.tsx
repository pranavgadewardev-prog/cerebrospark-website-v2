import HomeClient from "./HomeClient";

export const metadata = {
  title: "Cerebrospark Innovations | Drone Company in Pune",
  description:
    "Cerebrospark Innovations is a drone manufacturing and solutions company based in Pune providing customized drone services across industries.",
  keywords: [
    "Drone Company in Pune",
    "Drone Manufacturing India",
    "Cerebrospark",
    "Drone Services",
  ],
  openGraph: {
    title: "Cerebrospark Innovations",
    description:
      "Leading Drone Manufacturing & Solutions Providing Company Based In Pune.",
    url: "https://cerebrospark-innovations-website.vercel.app", // replace with your actual domain
    siteName: "Cerebrospark",
    images: [
      {
        url: "/og-image.png", // place this image inside /public
        width: 1200,
        height: 630,
        alt: "Cerebrospark Innovations",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Cerebrospark Innovations",
    description:
      "Leading Drone Manufacturing & Solutions Providing Company Based In Pune.",
    images: ["https://cerebrospark-innovations-website.vercel.app/og-image.jpg"],
  },
};

export default function Page() {
  return <HomeClient />;
}