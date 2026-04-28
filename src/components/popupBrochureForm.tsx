// "use client";

// import { useState } from "react";
// import { X, FileText, ChevronRight, Loader2 } from "lucide-react";

// export default function PopupBrochureForm({
//   onClose,
//   brochureType,
// }: {
//   onClose: () => void;
//   brochureType: string;
// }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     state: "",
//     city: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateEmail = (email: string) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const handleSubmit = async () => {
//   if (!validateEmail(form.email)) {
//     alert("Please enter a valid email.");
//     return;
//   }

//   try {
//     setLoading(true);

//     // ✅ Supabase base URL
//     const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

//     // ✅ Same mapping
//     const brochureFiles: Record<string, string[]> = {
//       "CS_KRISHI_10L": [
//         "cs-krishi-english.pdf",
//         "cs-krishi-marathi.pdf",
//       ],
//       "CS-MAMBA": ["cs-mamba.pdf"],
//       "CS-PRIDE": ["cs-pride.pdf"],
//       "CS-BHEEM": ["cs-bheem.pdf"],
//     };

//     const files = brochureFiles[brochureType] || [];

//     // 🔥 1. CALL API FIRST (validation + DB + email)
//     const res = await fetch("/api/brochure-download", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...form,
//         brochureType,
//       }),
//     });

//     const data = await res.json();

//     // 🔥 2. ONLY DOWNLOAD IF SUCCESS
//     if (data.success) {
//       files.forEach((file) => {
//         window.open(
//           `${baseUrl}/storage/v1/object/public/brochures/${file}`,
//           "_blank"
//         );
//       });

//       onClose();
//     } else {
//       alert(data.message || "Failed to process request");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//       {/* BACKDROP - Professional dark overlay */}
//       <div
//         className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* MODAL - Structured & Corporate */}
//       <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden border border-slate-200">
//         {/* Accent Bar */}
//         <div className="h-1 w-full bg-slate-900" />

//         <div className="flex flex-col md:flex-row">
//           {/* LEFT SIDE: Information (Value Prop) */}
//           <div className="hidden md:flex md:w-1/3 bg-slate-50 p-10 flex-col justify-between border-r border-slate-100">
//             <div>
//               <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mb-6">
//                 <FileText className="text-white" size={24} />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4">
//                 Technical Specifications & Insights
//               </h3>
//               <p className="text-sm text-slate-600 leading-relaxed">
//                 Download the complete documentation for{" "}
//                 <span className="font-semibold text-slate-900 capitalize">
//                   {brochureType.replace("-", " ")}
//                 </span>
//                 .
//               </p>
//             </div>

//             <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
//               © 2026 Corporate Portfolio
//             </div>
//           </div>

//           {/* RIGHT SIDE: Form */}
//           <div className="flex-1 p-8 md:p-12">
//             <div className="flex justify-between items-start mb-8">
//               <div>
//                 <h2 className="text-2xl font-light tracking-tight text-slate-900 uppercase">
//                   Request <span className="font-bold">Brochure</span>
//                 </h2>
//                 <div className="h-1 w-12 bg-slate-900 mt-2" />
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-slate-400 hover:text-slate-900 transition-colors p-1"
//               >
//                 <X size={24} strokeWidth={1.5} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
//               <div className="space-y-1.5">
//                 <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//                   Full Name
//                 </label>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//                   Email Address
//                 </label>
//                 <input
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300"
//                   placeholder="name@company.com"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//                   Phone
//                 </label>
//                 <input
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300"
//                   placeholder="+1 (555) 000-0000"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//                   State / Region
//                 </label>
//                 <input
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300"
//                   placeholder="California"
//                 />
//               </div>

//               <div className="space-y-1.5 md:col-span-2">
//                 <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
//                   City
//                 </label>
//                 <input
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300"
//                   placeholder="San Francisco"
//                 />
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="mt-10 w-full bg-slate-900 text-white py-4 px-6 flex items-center justify-between group hover:bg-slate-800 transition-all disabled:opacity-50"
//             >
//               <span className="text-sm font-bold uppercase tracking-[0.2em]">
//                 {loading ? "Processing Request..." : "Download Documentation"}
//               </span>
//               {loading ? (
//                 <Loader2 className="animate-spin" size={18} />
//               ) : (
//                 <ChevronRight
//                   className="group-hover:translate-x-1 transition-transform"
//                   size={18}
//                 />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { X, FileText, ChevronRight, Loader2 } from "lucide-react";

export default function PopupBrochureForm({
  onClose,
  brochureType,
}: {
  onClose: () => void;
  brochureType: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ VALIDATION FUNCTIONS
  const validateName = (name: string) => {
    return /^[A-Za-z\s]{2,50}$/.test(name.trim());
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    return /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(phone.trim());
  };

  const validateTextField = (value: string) => {
    return /^[A-Za-z\s]{2,50}$/.test(value.trim());
  };

  const handleSubmit = async () => {
    // 🔥 TRIMMED VALUES
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const state = form.state.trim();
    const city = form.city.trim();

    // ❌ VALIDATIONS
    if (!name || !email || !phone || !state || !city) {
      alert("All fields are required.");
      return;
    }

    if (!validateName(name)) {
      alert("Enter a valid name (only letters, min 2 characters).");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Enter a valid phone number (10 digits, Indian format).");
      return;
    }

    if (!validateTextField(state)) {
      alert("Enter a valid state (only letters).");
      return;
    }

    if (!validateTextField(city)) {
      alert("Enter a valid city (only letters).");
      return;
    }

    try {
      setLoading(true);

      const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      const brochureFiles: Record<string, string[]> = {
        CS_KRISHI_10L: [
          "cs-krishi-english.pdf",
          "cs-krishi-marathi.pdf",
        ],
        "CS-MAMBA": ["cs-mamba.pdf"],
        "CS-PRIDE": ["cs-pride.pdf"],
        "CS-BHEEM": ["cs-bheem.pdf"],
      };

      const files = brochureFiles[brochureType] || [];

      const res = await fetch("/api/brochure-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          state,
          city,
          brochureType,
        }),
      });

      const data = await res.json();

      if (data.success) {
        files.forEach((file) => {
          window.open(
            `${baseUrl}/storage/v1/object/public/brochures/${file}`,
            "_blank"
          );
        });

        onClose();
      } else {
        alert(data.message || "Failed to process request");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        <div className="h-1 w-full bg-slate-900" />

        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex md:w-1/3 bg-slate-50 p-10 flex-col justify-between border-r border-slate-100">
            <div>
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center mb-6">
                <FileText className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4">
                Technical Specifications & Insights
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Download the complete documentation for{" "}
                <span className="font-semibold text-slate-900 capitalize">
                  {brochureType.replace("-", " ")}
                </span>
                .
              </p>
            </div>

            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              © 2026 Corporate Portfolio
            </div>
          </div>

          <div className="flex-1 p-8 md:p-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-light tracking-tight text-slate-900 uppercase">
                  Request <span className="font-bold">Brochure</span>
                </h2>
                <div className="h-1 w-12 bg-slate-900 mt-2" />
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-900 transition-colors p-1"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300" placeholder="John Doe" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300" placeholder="name@company.com" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Phone
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300" placeholder="+91 9876543210" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  State / Region
                </label>
                <input name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300" placeholder="Maharashtra" />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  City
                </label>
                <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2.5 border-b-2 border-slate-100 bg-slate-50/50 focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-300" placeholder="Pune" />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-10 w-full bg-slate-900 text-white py-4 px-6 flex items-center justify-between group hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                {loading ? "Processing Request..." : "Download Documentation"}
              </span>
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}