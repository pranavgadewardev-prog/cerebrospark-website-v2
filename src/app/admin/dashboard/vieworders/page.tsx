"use client";

import React, { useMemo, useState } from "react";

type OrderStatus = "Delivered" | "Processing" | "Shipped" | "Cancelled";
type PaymentStatus = "Paid" | "Pending" | "Failed";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string; // YYYY-MM-DD
  total: number;
  payment: PaymentStatus;
  status: OrderStatus;
  product: string;
  quantity: number;
}

export default function ViewOrders() {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
  const [paymentFilter, setPaymentFilter] = useState<"All" | PaymentStatus>(
    "All"
  );

  // Dummy Orders Data (Replace with API data later)
  const orders: Order[] = [
    {
      id: "DRN-ORD-1001",
      customer: "Pranav Gadewar",
      email: "pranav@gmail.com",
      date: "2026-01-20",
      total: 249900,
      payment: "Paid",
      status: "Delivered",
      product: "CS-Krishi",
      quantity: 1,
    },
    {
      id: "DRN-ORD-1002",
      customer: "Rahul Sharma",
      email: "rahul@gmail.com",
      date: "2026-01-19",
      total: 159900,
      payment: "Pending",
      status: "Processing",
      product: "CS-Bee",
      quantity: 2,
    },
    {
      id: "DRN-ORD-1003",
      customer: "Aditi Patil",
      email: "aditi@gmail.com",
      date: "2026-01-18",
      total: 349900,
      payment: "Paid",
      status: "Shipped",
      product: "CS-Mamba",
      quantity: 1,
    },
    {
      id: "DRN-ORD-1004",
      customer: "Sahil Khan",
      email: "sahil@gmail.com",
      date: "2026-01-17",
      total: 99900,
      payment: "Failed",
      status: "Cancelled",
      product: "CS-Pride",
      quantity: 1,
    },
  ];

  // Filtering logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        query.length === 0
          ? true
          : order.id.toLowerCase().includes(query) ||
            order.customer.toLowerCase().includes(query) ||
            order.email.toLowerCase().includes(query) ||
            order.product.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ? true : order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ? true : order.payment === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [search, statusFilter, paymentFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusStyle = (status: OrderStatus): string => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStyle = (payment: PaymentStatus): string => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleExport = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Product",
      "Qty",
      "Date",
      "Total",
      "Payment",
      "Status",
    ];

    const rows = filteredOrders.map((o) => [
      o.id,
      o.customer,
      o.email,
      o.product,
      String(o.quantity),
      o.date,
      String(o.total),
      o.payment,
      o.status,
    ]);

    const csv = [headers, ...rows]
      .map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "drone-orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            View <span className="text-yellow-500">Drone Orders</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all drone purchase orders in one place
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-xl hover:bg-yellow-300 transition shadow-md"
        >
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-lg border border-gray-200">
        <div className="flex flex-col xl:flex-row gap-4 xl:items-end xl:justify-between">
          {/* Search */}
          <div className="w-full xl:w-[50%]">
            <label className="text-sm text-gray-700 font-medium">
              Search Orders
            </label>
            <input
              type="text"
              placeholder="Search by Order ID / Name / Email / Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-[50%] xl:w-[22%]">
            <label className="text-sm text-gray-700 font-medium">
              Order Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | OrderStatus)
              }
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Filter */}
          <div className="w-full sm:w-[50%] xl:w-[22%]">
            <label className="text-sm text-gray-700 font-medium">
              Payment Status
            </label>
            <select
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value as "All" | PaymentStatus)
              }
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Orders List</h2>
          <span className="text-sm text-gray-600">
            Total: <span className="font-semibold">{filteredOrders.length}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 whitespace-nowrap">Order ID</th>
                <th className="p-4 whitespace-nowrap">Customer</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Drone</th>
                <th className="p-4 whitespace-nowrap">Qty</th>
                <th className="p-4 whitespace-nowrap">Date</th>
                <th className="p-4 whitespace-nowrap">Total</th>
                <th className="p-4 whitespace-nowrap">Payment</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-yellow-50 transition"
                  >
                    <td className="p-4 font-semibold text-yellow-600">
                      {order.id}
                    </td>
                    <td className="p-4 text-gray-900">{order.customer}</td>
                    <td className="p-4 text-gray-600">{order.email}</td>
                    <td className="p-4 text-gray-900">{order.product}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {order.quantity}
                    </td>
                    <td className="p-4 text-gray-700">{order.date}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getPaymentStyle(
                          order.payment
                        )}`}
                      >
                        {order.payment}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

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
