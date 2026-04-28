// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// type BrochureDownload = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   state: string;
//   city: string;
//   brochure_type: string;
//   created_at: string;
// };

// export default async function Page() {
//   const { data } = await supabase
//     .from("brochure_downloads")
//     .select("*")
//     .order("created_at", { ascending: false });

//   const downloads = data as BrochureDownload[];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         Brochure Downloads
//       </h1>

//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>State</th>
//             <th>City</th>
//             <th>Brochure</th>
//           </tr>
//         </thead>

//         <tbody>
//           {downloads?.map((item) => (
//             <tr key={item.id} className="border-t">
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//               <td>{item.phone}</td>
//               <td>{item.state}</td>
//               <td>{item.city}</td>
//               <td>{item.brochure_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type BrochureDownload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  brochure_type: string;
  created_at: string;
};

export default function Page() {
  const [downloads, setDownloads] = useState<BrochureDownload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("brochure_downloads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setDownloads(data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // ✅ CSV Download
  const downloadCSV = () => {
    if (!downloads.length) return;

    const headers = [
      "Name",
      "Email",
      "Phone",
      "State",
      "City",
      "Brochure",
      "Date",
    ];

    const rows = downloads.map((d) => [
      d.name,
      d.email,
      d.phone,
      d.state,
      d.city,
      d.brochure_type,
      new Date(d.created_at).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "brochure_downloads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Brochure Downloads
        </h1>

        <button
          onClick={downloadCSV}
          className="bg-slate-900 text-white px-5 py-2 rounded-md hover:bg-slate-800 transition w-full sm:w-auto"
        >
          Download CSV
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Scroll wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">State</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Brochure</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : downloads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                downloads.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.phone}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.state}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.city}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">
                      {item.brochure_type}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}