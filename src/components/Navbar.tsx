"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Home,
  Briefcase,
  Package,
  GraduationCap,
  Info,
  Image,
  Sparkles,
  Phone,
  ArrowDownNarrowWide,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { searchItems } from "@/lib/searchData";
import { LucideIcon } from "lucide-react";

/* ===================== NAV CONFIG ===================== */

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Products", href: "/products", icon: Package },
  { label: "RPTO", href: "/rpto", icon: GraduationCap },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "Sparkathon", href: "/sparkathon", icon: Sparkles },
  { label: "Contact Us", href: "/contact", icon: Phone },
];

/* ===================== SERVICES DROPDOWN ===================== */

const serviceLinks = [
  {
    image: "/scroll/CS_KRISHI_10L.jpg",
    title: "Agriculture Drone",
    description:
      "Boost farm productivity with precision spraying, crop monitoring, and smart field analytics.",
  },
  {
    image: "/scroll/cs-mamba.jpg",
    title: "Survellience Drone",
    description:
      "Enhance security with real-time aerial surveillance, wide-area coverage, and night monitoring support.",
  },
  // {
  //   image: "/scroll/cs-BEE.jpg",
  //   title: "Spy Drone",
  //   description:
  //     "Built for stealth missions with silent flight, compact design, and secure high-resolution intelligence capture.",
  // },
  {
    image: "/scroll/CS-PRIDE.jpg",
    title: "Racing Drone",
    description:
      "Experience extreme speed and control with high-thrust performance tuned for competitive racing.",
  },
  {
    image: "/scroll/CS-BHEEM.jpg",
    title: "Delivery Drone",
    description:
      "Enable fast last-mile delivery with payload stability, route automation, and safe drop precision.",
  },
];

/* ===================== PRODUCT DROPDOWN ===================== */

const productLinks = [
  {
    label: "CS_KRISHI_10L – Featured",
    href: "/drones/cs_krishi_10L",
    image: "/drones/cs-krishi-images/cs-krishi.png",
    description: "Agriculture Drone",
  },
  {
    label: "CS-MAMBA",
    href: "/drones/cs-mamba",
    image: "/drones/cs-mamba-images/mamba.png",
    description: "Survellience Drone",
  },
  // {
  //   label: "CS-Bee",
  //   href: "/drones/cs-bee",
  //   image: "/drones/cs-bee-images/cs-bee.png",
  //   description: "Spy Drone",
  // },
  {
    label: "CS-PRIDE",
    href: "/drones/cs-pride",
    image: "/drones/cs-pride-images/cs-pride-2.png",
    description: "Racing Drone",
  },
  {
    label: "CS-BHEEM",
    href: "/drones/cs-bheem",
    image: "/drones/cs-bheem-images/cs-bheem.png",
    description: "Delivery Drone",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(productLinks[0]);
  const [activeService, setActiveService] = useState(serviceLinks[0]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // const [results, setResults] = useState<typeof searchItems>([]);
  const results = searchQuery.trim()
    ? searchItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];


  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!searchQuery.trim()) {
  //     setResults([]);
  //     return;
  //   }

  //   const filtered = searchItems.filter((item) =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );

  //   setResults(filtered);
  // }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gray-50/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* ===================== LOGO ===================== */}
            <Link href="/" className="flex items-center group relative">
              <span className="absolute -inset-1 rounded-lg blur-lg opacity-0 bg-gradient-to-r from-gray-400 to-yellow-400 transition-opacity group-hover:opacity-100" />
              <img
                src="/logo/CBS_logo.png"
                alt="Cerebrospark Logo"
                className="relative h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* ===================== DESKTOP NAV ===================== */}
            <nav className="hidden lg:flex items-end gap-10">
              {/* HOME */}
              <div>
                <NavItem
                  icon={Home}
                  label="Home"
                  href="/"
                  pathname={pathname}
                />
              </div>

              {/* SERVICES (DROPDOWN) */}
              <div className="relative">
                <div className="group">
                  <NavItem
                    icon={Briefcase}
                    label="Services"
                    href="/services"
                    pathname={pathname}
                  />

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px] rounded-2xl bg-white shadow-2xl border border-gray-100 opacity-0 drop-shadow-lg drop-shadow-amber-400 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="grid grid-cols-2">
                      {/* LEFT – SERVICE LIST */}
                      <div className="p-4">
                        {serviceLinks.map((service) => (
                          <div
                            key={service.title}
                            onMouseEnter={() => setActiveService(service)}
                            className="px-4 py-3 rounded-lg cursor-pointer hover:bg-yellow-100 transition"
                          >
                            <p className="text-sm font-medium text-gray-800">
                              {service.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {service.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* RIGHT – IMAGE PREVIEW (YOU WILL ADD IMAGES) */}
                      <div className="p-4 border-l bg-gray-50 rounded-r-2xl flex items-center justify-center">
                        <img
                          src={activeService.image}
                          alt={activeService.title}
                          className="w-full h-96 object-contain transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="relative">
                <div className="group">
                  <NavItem
                    icon={Package}
                    label="Products"
                    href="/products"
                    pathname={pathname}
                  />

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] rounded-2xl bg-white shadow-2xl border border-gray-100 opacity-0 drop-shadow-lg drop-shadow-amber-400 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="grid grid-cols-2">
                      <div className="p-4">
                        {productLinks.map((product) => (
                          <Link
                            key={product.label}
                            href={product.href}
                            onMouseEnter={() => setActiveProduct(product)}
                            className="block px-4 py-3 rounded-lg hover:bg-yellow-100 transition"
                          >
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-800">
                                {product.label}
                              </span>
                              <span className="text-xs text-gray-500 mt-1 leading-snug">
                                {product.description}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="p-4 border-l bg-gray-50 rounded-r-2xl flex items-center justify-center">
                        <img
                          src={activeProduct.image}
                          alt={activeProduct.label}
                          className="w-full h-40 object-contain transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RPTO */}
              <div>
                <NavItem
                  icon={GraduationCap}
                  label="RPTO"
                  href="/rpto"
                  pathname={pathname}
                />
              </div>

              {/* ABOUT */}
              {/* <div>
                <NavItem icon={Info} label="About Us" href="/about" />
              </div> */}
              {/* ABOUT US */}
              <div className="relative group">
                <NavItem
                  icon={Info}
                  label="About Us"
                  href="/about"
                  pathname={pathname}
                />

                {/* Hover Card */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] rounded-2xl bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid grid-cols-2 gap-8 p-6">
                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Who We Are
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We are a technology-driven company focused on building
                        scalable, secure, and user-centric digital products that
                        help businesses grow faster in a connected world.
                      </p>

                      <Link
                        href="/about"
                        className="mt-4 inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        Learn more →
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-xl">
                      <img
                        src="/logo/csi-logo.png"
                        alt="About Company"
                        className="w-full h-40 object-contain p-5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GALLERY */}
              <div>
                <NavItem
                  icon={Image}
                  label="Gallery"
                  href="/gallery"
                  pathname={pathname}
                />
              </div>

              {/* SPARKATHON */}
              <div>
                <NavItem
                  icon={Sparkles}
                  label="Sparkathon"
                  href="/sparkathon"
                  pathname={pathname}
                />
              </div>

              {/* CONTACT US */}
              <div className="relative group">
                <NavItem
                  icon={Phone}
                  label="Contact Us"
                  href="/contact"
                  pathname={pathname}
                />

                {/* Hover Card */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] rounded-2xl bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    {/* Left: Contact Info */}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Get in Touch
                      </h4>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Have a project in mind or need help with our services?
                        Our team is ready to assist you.
                      </p>

                      <div className="space-y-2 text-sm text-gray-700">
                        <p>📧 info@cerebrospark.in</p>
                        <p>📞 +91 62614 62230</p>
                        <p>📍 Pune, India</p>
                      </div>

                      <Link
                        href="/contact"
                        className="mt-4 inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        Contact form →
                      </Link>
                    </div>

                    {/* Right: Image / Illustration */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-xl">
                      <img
                        src="/logo/CBS_logo.png"
                        alt="Contact Us"
                        className="w-full h-58 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* ===================== SEARCH ===================== */}
            {/* <div className="hidden lg:flex items-center ml-6">
              <div className="relative ">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search…"
                  className="w-56 pl-9 pr-4 py-2 rounded-full hover:drop-shadow-amber-800 drop-shadow-lg drop-shadow-yellow-600 bg-white/70 backdrop-blur border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-sm"
                />
              </div>
            </div> */}
            <div
              className="hidden lg:flex items-center ml-6 relative"
              ref={searchRef}
            >
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  placeholder="Search drones, services..."
                  className="w-64 pl-9 pr-4 py-2 rounded-full bg-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-sm"
                />
              </div>

              {/* DROPDOWN */}
              {showDropdown && results.length > 0 && (
                <div className="absolute top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  {results.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => {
                        setSearchQuery("");
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-yellow-50 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain"
                      />

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-gray-700"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* ===================== MOBILE DRAWER ===================== */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-gray-50 shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
          {/* MOBILE SEARCH */}
          {/* <div className="px-4 py-3 border-b">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search…"
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />
            </div>
          </div> */}
          {/* ===================== MOBILE SEARCH ===================== */}
          <div className="px-4 py-3 border-b relative">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Search drones, services..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
            </div>

            {/* MOBILE DROPDOWN RESULTS */}
            {showDropdown && results.length > 0 && (
              <div className="mt-3 bg-white rounded-xl shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
                {results.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => {
                      setSearchQuery("");
                      setShowDropdown(false);
                      setOpen(false); // CLOSE DRAWER
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* NO RESULTS */}
            {showDropdown && searchQuery && results.length === 0 && (
              <div className="mt-3 text-sm text-gray-500 px-2">
                No results found
              </div>
            )}
          </div>

          <nav className="flex flex-col justify-center py-2">
            {/* HOME */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <Home size={18} />
              Home
            </Link>

            {/* SERVICES (MOBILE ACCORDION) */}
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <Home size={18} />
              Services
            </Link>

            {servicesOpen && (
              <div className="pl-12 pb-2">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.title}
                    href="/services"
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-gray-500 hover:text-gray-800"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}

            {/* PRODUCTS (MOBILE ACCORDION) */}
            <div className="flex justify-between px-6 items-center text-gray-600 hover:bg-yellow-100">
              <Link href={"/products"}>
                <span className="flex items-center gap-3">
                  <Package size={18} />
                  Products
                </span>
              </Link>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="px-6 py-3 flex items-center justify-between"
              >
                <ArrowDownNarrowWide />
              </button>
            </div>

            {productsOpen && (
              <div className="pl-12 pb-2">
                {productLinks.map((product) => (
                  <Link
                    key={product.label}
                    href={product.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-gray-500 hover:text-gray-800"
                  >
                    {product.label}
                  </Link>
                ))}
              </div>
            )}

            {/* RPTO */}
            <Link
              href="/rpto"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <GraduationCap size={18} />
              RPTO
            </Link>

            {/* ABOUT */}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <Info size={18} />
              About Us
            </Link>

            {/* GALLERY */}
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <Image size={18} />
              Gallery
            </Link>

            {/* SPARKATHON */}
            <Link
              href="/sparkathon"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <Sparkles size={18} />
              Sparkathon
            </Link>

            {/* CONTACT */}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="px-6 py-3 flex items-center gap-3 text-gray-600 hover:bg-yellow-100"
            >
              <Phone size={18} />
              Contact Us
            </Link>
          </nav>
        </aside>
      </div>

      <div className="h-20" />
    </>
  );
}

/* ===================== NAV ITEM ===================== */

// function NavItem({
//   icon: Icon,
//   label,
//   href,
// }: {
//   icon: any;
//   label: string;
//   href: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group flex flex-col items-center text-gray-600 hover:text-gray-900 transition"
//     >
//       <Icon size={18} className="mb-1 group-hover:text-yellow-500 transition" />
//       <span className="relative text-sm font-medium after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all group-hover:after:w-full">
//         {label}
//       </span>
//     </Link>
//   );
// }

function NavItem({
  icon: Icon,
  label,
  href,
  pathname,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  pathname: string;
}) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex flex-col items-center transition
        ${isActive ? "text-yellow-600" : "text-gray-600 hover:text-gray-900"}
      `}
    >
      <Icon
        size={18}
        className={`mb-1 transition 
          ${isActive ? "text-yellow-500 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]" : "group-hover:text-yellow-500"}
        `}
      />

      <span
        className={`relative text-sm font-medium after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-yellow-400 after:transition-all
          ${isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
