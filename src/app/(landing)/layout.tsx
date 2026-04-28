import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: {
    default: "Cerebrospark Innovations",
    template: "%s | Cerebrospark",
  },
  description:
    "Cerebrospark Innovations is a leading drone manufacturing and solutions company based in Pune, providing customized drone services across industries.",
  keywords: [
    "Cerebrospark",
    "Drone Company in Pune",
    "Drone Manufacturing",
    "Drone Services India",
    "Drone Pilot Training",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main className="grow">{children}</main>
      <footer className="relative z-10 bg-white">
        <Footer />
      </footer>
    </div>
  );
}