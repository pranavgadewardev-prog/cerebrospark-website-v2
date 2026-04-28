"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DroneIcon, X } from "lucide-react";

type WelcomeModalProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(open ?? true);

  useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // ESC key close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Wrapper (responsive sizing + safe height) */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="
              relative w-full
              max-w-[92vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl
              overflow-hidden rounded-3xl border border-gray-200 bg-white
              shadow-[0_40px_120px_rgba(0,0,0,0.35)]
            "
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 rounded-xl bg-gray-900/90 p-2 text-yellow-400 transition hover:bg-gray-900"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Top Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-500 via-yellow-400/70 to-transparent" />

            {/* Scrollable Content Area (prevents overflow on small devices) */}
            <div
              className="
                max-h-[88vh] sm:max-h-[86vh] md:max-h-[82vh]
                overflow-y-auto
                px-5 sm:px-7 md:px-10
                py-8 sm:py-10
                text-center
              "
            >
              {/* Logo */}
              <div className="flex items-center justify-center">
                {/* <div className="flex h-12 w-36 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-yellow-500/15 ring-1 ring-yellow-500/30"> */}
                {/* Replace this with your logo image if needed */}
                {/* <span className="text-lg sm:text-xl font-extrabold text-yellow-600">
                    CS
                  </span> */}
                <img src="/logo/csi-logo.png" alt="Cerebrospark Innovations" />
                {/* </div> */}
              </div>

              {/* Title */}
              <div className="flex flex-col justify-center items-center">
                <h2 className="flex justify-center items-center gap-5 mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                  Welcome to CerebroSpark <DroneIcon className="h-16 w-16" />
                </h2>
              </div>

              {/* Description */}
              <p className="mt-2 sm:mt-3 mx-auto max-w-xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Explore our fast services, premium solutions, and on-site
                support designed to help your business grow with speed and
                reliability.
              </p>

              {/* Big Image (fully responsive + never breaks layout) */}
              {/* <div className="relative mt-6 sm:mt-7 w-full overflow-hidden shadow-xl shadow-amber-400 hover:scale-105 transition hover:shadow-2xl border border-gray-200 bg-gray-100 shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
                <img
                  src="/welcome/welcome2.png"
                  alt="Welcome"
                  className="
                    w-full object-cover
                    h-[full] sm:h-[260px] md:h-[320px] lg:h-[360px]
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/25 via-transparent to-yellow-500/15" />
              </div> */}
              <div className="relative mt-6 sm:mt-7 w-full overflow-hidden border border-gray-200 bg-gray-100 shadow-xl shadow-amber-400 transition hover:scale-105 hover:shadow-2xl">
                {/* Give container a fixed ratio (so image stays full everywhere) */}
                <div className="relative w-full aspect-[16/9]">
                  <img
                    src="/welcome/welcome2.png"
                    alt="Welcome"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/25 via-transparent to-yellow-500/15" />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 sm:mt-7 flex w-full flex-col sm:flex-row gap-3">
                <a
                  href="/services"
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-bold text-yellow-400 shadow-md transition hover:bg-gray-800"
                >
                  View Services
                </a>

                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-bold text-gray-900 shadow-[0_18px_40px_rgba(234,179,8,0.25)] transition hover:bg-yellow-400"
                >
                  Contact Us
                </a>
              </div>

              {/* Hint */}
              <p className="mt-4 sm:mt-5 text-[11px] sm:text-xs text-gray-500">
                Tip: Click outside the modal or press <b>ESC</b> to close.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
