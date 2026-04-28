"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ContactPage() {
  // ✅ STATE
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ✅ HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // important
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");

        // reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <main className="w-full bg-[#fdfdfd] text-slate-900 font-sans selection:bg-yellow-200">
      {/* ================= HEADER WITH VIDEO ================= */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
        >
          <source src="/hero/contactus.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <img
            src="/logo/CBS_logo_1.png"
            alt="Cerebrospark Innovations"
            className="mx-auto h-24 drop-shadow-2xl"
          />

          <h1 className="text-3xl md:text-3xl font-black text-white tracking-tight">
            Cerebrospark <span className="text-yellow-400">Innovations</span>
          </h1>

          <div className="mt-4 h-1 w-24 bg-yellow-400 mx-auto rounded-full" />

          <p className="mt-6 text-xl md:text-2xl text-gray-200 font-light max-w-2xl">
            Pioneering the future of{" "}
            <span className="font-semibold text-white">Drone Technology</span> &
            Solutions.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative -mt-20 z-20 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* ================= FORM ================= */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900">
                Send a Message
              </h2>
            </div>

            {/* ✅ FORM CONNECTED */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-hidden transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 shadow-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-hidden transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile No."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-hidden transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 shadow-sm"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject / Product"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-hidden transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 shadow-sm"
                />
              </div>

              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help your business?"
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-hidden transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 shadow-sm resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl text-slate-900 font-bold text-lg bg-yellow-400 shadow-lg shadow-yellow-400/30 hover:bg-yellow-500 transition-all duration-300 cursor-pointer"
              >
                Send Inquiry
              </motion.button>
            </form>
          </motion.div>

          {/* ================= RIGHT SIDE (UNCHANGED) ================= */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              {[
                {
                  title: "Direct Email",
                  value: "info@cerebrospark.in",
                  icon: "✉️",
                },
                {
                  title: "Our Headquarters",
                  value:
                    "Plot No. 84, Swami Vivekanand Industrial Estate, Handewadi Rd, Satav Nagar, Hadapsar, Pune, Maharashtra 411028",
                  icon: "📍",
                },
                {
                  title: "Call Support",
                  value: "+91 8600104934 / 7387515448",
                  icon: "📞",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-slate-400 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg font-medium text-slate-800 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/40 border-4 border-white aspect-video lg:aspect-auto"
            >
              <iframe
                src="https://maps.google.com/maps?q=CerebroSpark%20Innovations%20Pvt.%20Ltd.%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}