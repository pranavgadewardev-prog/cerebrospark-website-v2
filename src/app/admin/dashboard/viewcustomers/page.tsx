"use client";

import React, { useMemo, useState } from "react";

type CustomerStatus = "Active" | "Inactive" | "Blocked";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joinedDate: string; // YYYY-MM-DD
  totalOrders: number;
  totalSpent: number;
  status: CustomerStatus;
}

export default function ViewCustomers() {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"All" | CustomerStatus>(
    "All"
  );

  // Dummy Customers Data (Replace with API later)
  const customers: Customer[] = [
    {
      id: "CUS-1001",
      name: "Pranav Gadewar",
      email: "pranav@gmail.com",
      phone: "+91 98765 43210",
      city: "Nagpur",
      joinedDate: "2026-01-10",
      totalOrders: 4,
      totalSpent: 789700,
      status: "Active",
    },
    {
      id: "CUS-1002",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 91234 56789",
      city: "Pune",
      joinedDate: "2026-01-12",
      totalOrders: 2,
      totalSpent: 319800,
      status: "Active",
    },
    {
      id: "CUS-1003",
      name: "Aditi Patil",
      email: "aditi@gmail.com",
      phone: "+91 99887 66554",
      city: "Mumbai",
      joinedDate: "2026-01-15",
      totalOrders: 1,
      totalSpent: 349900,
      status: "Inactive",
    },
    {
      id: "CUS-1004",
      name: "Sahil Khan",
      email: "sahil@gmail.com",
      phone: "+91 90000 11122",
      city: "Delhi",
      joinedDate: "2026-01-16",
      totalOrders: 1,
      totalSpent: 99900,
      status: "Blocked",
    },
  ];

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        query.length === 0
          ? true
          : customer.id.toLowerCase().includes(query) ||
            customer.name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.phone.toLowerCase().includes(query) ||
            customer.city.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ? true : customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusStyle = (status: CustomerStatus): string => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Inactive":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Blocked":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleExport = () => {
    const headers = [
      "Customer ID",
      "Name",
      "Email",
      "Phone",
      "City",
      "Joined Date",
      "Total Orders",
      "Total Spent",
      "Status",
    ];

    const rows = filteredCustomers.map((c) => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.city,
      c.joinedDate,
      String(c.totalOrders),
      String(c.totalSpent),
      c.status,
    ]);

    const csv = [headers, ...rows]
      .map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "customers.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            View <span className="text-yellow-500">Customers</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all customers from one dashboard
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-xl hover:bg-yellow-300 transition shadow-md"
        >
          Export Customers
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-lg border border-gray-200">
        <div className="flex flex-col xl:flex-row gap-4 xl:items-end xl:justify-between">
          {/* Search */}
          <div className="w-full xl:w-[60%]">
            <label className="text-sm text-gray-700 font-medium">
              Search Customers
            </label>
            <input
              type="text"
              placeholder="Search by ID / Name / Email / Phone / City..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-[50%] xl:w-[35%]">
            <label className="text-sm text-gray-700 font-medium">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | CustomerStatus)
              }
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Customers List</h2>
          <span className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-semibold">{filteredCustomers.length}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1100px]">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 whitespace-nowrap">Customer ID</th>
                <th className="p-4 whitespace-nowrap">Name</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Phone</th>
                <th className="p-4 whitespace-nowrap">City</th>
                <th className="p-4 whitespace-nowrap">Joined</th>
                <th className="p-4 whitespace-nowrap">Orders</th>
                {/* <th className="p-4 whitespace-nowrap">Total Spent</th> */}
                {/* <th className="p-4 whitespace-nowrap">Status</th> */}
                <th className="p-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-200 hover:bg-yellow-50 transition"
                  >
                    <td className="p-4 font-semibold text-yellow-600">
                      {customer.id}
                    </td>
                    <td className="p-4 text-gray-900">{customer.name}</td>
                    <td className="p-4 text-gray-600">{customer.email}</td>
                    <td className="p-4 text-gray-700">{customer.phone}</td>
                    <td className="p-4 text-gray-700">{customer.city}</td>
                    <td className="p-4 text-gray-700">{customer.joinedDate}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {customer.totalOrders}
                    </td>
                    {/* <td className="p-4 font-semibold text-gray-900">
                      {formatCurrency(customer.totalSpent)}
                    </td> */}
                    {/* <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getStatusStyle(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td> */}
                    <td className="p-4">
                      <button
                        type="button"
                        className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-xl text-sm transition"
                      >
                        View
                      </button>
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
