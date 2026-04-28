"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  X,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* LOGO */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src="/logo/csi-logo.png"
            alt="Cerebrospark Logo"
            width={260}
            height={120}
            priority
            className="object-contain"
          />
        </div>

        {/* FOOTER CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
          {/* OUR OFFICIALS */}
          <FooterColumn title="Our Officials">
            <FooterLink href="/">Cerebrospark Innovations</FooterLink>
            <FooterLink href="https://cerebrosparkacademy.in/">Cerebrospark Academy</FooterLink>
          </FooterColumn>

          {/* OUR SERVICES */}
          <FooterColumn title="Our Services">
            {[
              "Agriculture",
              "Disaster Management",
              "Delivery",
              "Surveillance",
              "Aerial Mapping",
              "Powerline Inspection",
              "Solar Panel Inspection",
            ].map((item) => (
              <FooterLink key={item} href="/services">
                {item}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* OUR PRODUCTS */}
          <FooterColumn title="Our Products">
            {[
              "CS_KRISHI_10L",
              "CS-MAMBA",
              // "CS-Bee",
              "CS-PRIDE",
              // "CS-Vtol",
              "CS-BHEEM",
            ].map((item) => (
              <FooterLink key={item} href="/products">
                {item}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* CONTACT US */}
          <FooterColumn title="Contact Us">
            <ContactItem
              icon={<Phone size={18} />}
              text="+91 8600104934 / +91 7387515448"
            />
            <ContactItem
              icon={<Mail size={18} />}
              text="info@cerebrospark.in"
            />
            <ContactItem
              icon={<MapPin size={18} />}
              text="Pune, Maharashtra, India"
            />

            <div className="flex justify-center lg:justify-start gap-3 mt-6">
              <SocialIcon
                icon={<Instagram size={18} />}
                href="https://www.instagram.com/cerebrospark?igsh=MWRmcjZ6cXppa3JpNw=="
              />
              <SocialIcon
                icon={<Facebook size={18} />}
                href="https://www.facebook.com/share/1HuuQEzvzE/"
              />
              <SocialIcon
                icon={<Linkedin size={18} />}
                href="https://www.linkedin.com/company/cerebrospark-innovations/"
              />
              <SocialIcon
                icon={<Youtube size={18} />}
                href="https://youtube.com/@cerebrosparkinnovationsllp?si=nwnPEUysI2-VDtxD"
              />
            </div>
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ================= HELPERS ================= */

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-sm text-gray-600 transition-all duration-200 hover:text-yellow-500 hover:translate-x-1 inline-block"
  >
    → {children}
  </Link>
);

const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-start gap-2 text-sm text-gray-600 justify-center lg:justify-start">
    <span className="text-gray-500 mt-0.5">{icon}</span>
    <span>{text}</span>
  </div>
);

const SocialIcon = ({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 transition-all duration-200 hover:bg-yellow-400 hover:text-white hover:border-yellow-400"
  >
    {icon}
  </Link>
);
