"use client";

import React, { useMemo, useState } from "react";

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";
type PaymentMethod = "UPI" | "Card" | "NetBanking" | "Cash" | "Wallet";

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  date: string; // YYYY-MM-DD
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
}

export default function ViewPayments() {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"All" | PaymentStatus>("All");
  const [methodFilter, setMethodFilter] = useState<"All" | PaymentMethod>("All");

  // Dummy Payments Data (Replace with API data later)
  const payments: Payment[] = [
    {
      id: "PAY-2001",
      orderId: "DRN-ORD-1001",
      customer: "Pranav Gadewar",
      email: "pranav@gmail.com",
      date: "2026-01-20",
      amount: 249900,
      method: "UPI",
      status: "Paid",
      transactionId: "TXN-UPI-893241",
    },
    {
      id: "PAY-2002",
      orderId: "DRN-ORD-1002",
      customer: "Rahul Sharma",
      email: "rahul@gmail.com",
      date: "2026-01-19",
      amount: 159900,
      method: "Card",
      status: "Pending",
      transactionId: "TXN-CARD-112233",
    },
    {
      id: "PAY-2003",
      orderId: "DRN-ORD-1003",
      customer: "Aditi Patil",
      email: "aditi@gmail.com",
      date: "2026-01-18",
      amount: 349900,
      method: "NetBanking",
      status: "Paid",
      transactionId: "TXN-NB-556677",
    },
    {
      id: "PAY-2004",
      orderId: "DRN-ORD-1004",
      customer: "Sahil Khan",
      email: "sahil@gmail.com",
      date: "2026-01-17",
      amount: 99900,
      method: "Wallet",
      status: "Failed",
      transactionId: "TXN-WALLET-778899",
    },
    {
      id: "PAY-2005",
      orderId: "DRN-ORD-1005",
      customer: "Neha Kulkarni",
      email: "neha@gmail.com",
      date: "2026-01-16",
      amount: 129900,
      method: "UPI",
      status: "Refunded",
      transactionId: "TXN-UPI-990011",
    },
  ];

  const filteredPayments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const matchesSearch =
        query.length === 0
          ? true
          : payment.id.toLowerCase().includes(query) ||
            payment.orderId.toLowerCase().includes(query) ||
            payment.customer.toLowerCase().includes(query) ||
            payment.email.toLowerCase().includes(query) ||
            payment.transactionId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ? true : payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ? true : payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [search, statusFilter, methodFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusStyle = (status: PaymentStatus): string => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-700 border-red-200";
      case "Refunded":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getMethodStyle = (method: PaymentMethod): string => {
    switch (method) {
      case "UPI":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Card":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "NetBanking":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Cash":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Wallet":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleExport = () => {
    const headers = [
      "Payment ID",
      "Order ID",
      "Customer",
      "Email",
      "Date",
      "Amount",
      "Method",
      "Status",
      "Transaction ID",
    ];

    const rows = filteredPayments.map((p) => [
      p.id,
      p.orderId,
      p.customer,
      p.email,
      p.date,
      String(p.amount),
      p.method,
      p.status,
      p.transactionId,
    ]);

    const csv = [headers, ...rows]
      .map((r) => r.map((x) => `"${String(x).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "payments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const totalAmount = useMemo(() => {
    return filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  }, [filteredPayments]);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            View <span className="text-yellow-500">Payments</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Track all drone order payments and transaction details
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-xl hover:bg-yellow-300 transition shadow-md"
        >
          Export Payments
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-lg border border-gray-200">
        <div className="flex flex-col 2xl:flex-row gap-4 2xl:items-end 2xl:justify-between">
          {/* Search */}
          <div className="w-full 2xl:w-[45%]">
            <label className="text-sm text-gray-700 font-medium">
              Search Payments
            </label>
            <input
              type="text"
              placeholder="Search by Payment ID / Order ID / Name / Email / Txn ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-[50%] 2xl:w-[25%]">
            <label className="text-sm text-gray-700 font-medium">
              Payment Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | PaymentStatus)
              }
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          {/* Method Filter */}
          <div className="w-full sm:w-[50%] 2xl:w-[25%]">
            <label className="text-sm text-gray-700 font-medium">
              Payment Method
            </label>
            <select
              value={methodFilter}
              onChange={(e) =>
                setMethodFilter(e.target.value as "All" | PaymentMethod)
              }
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="NetBanking">NetBanking</option>
              <option value="Wallet">Wallet</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredPayments.length}</span>{" "}
            payments
          </p>
          <p className="text-sm text-gray-600">
            Total Amount:{" "}
            <span className="font-semibold text-gray-900">
              {formatCurrency(totalAmount)}
            </span>
          </p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Payments List</h2>
          <span className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-semibold">{filteredPayments.length}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1200px]">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 whitespace-nowrap">Payment ID</th>
                <th className="p-4 whitespace-nowrap">Order ID</th>
                <th className="p-4 whitespace-nowrap">Customer</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Date</th>
                <th className="p-4 whitespace-nowrap">Amount</th>
                <th className="p-4 whitespace-nowrap">Method</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap">Transaction ID</th>
                <th className="p-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-500">
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-200 hover:bg-yellow-50 transition"
                  >
                    <td className="p-4 font-semibold text-yellow-600">
                      {payment.id}
                    </td>
                    <td className="p-4 text-gray-900">{payment.orderId}</td>
                    <td className="p-4 text-gray-900">{payment.customer}</td>
                    <td className="p-4 text-gray-600">{payment.email}</td>
                    <td className="p-4 text-gray-700">{payment.date}</td>
                    <td className="p-4 font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getMethodStyle(
                          payment.method
                        )}`}
                      >
                        {payment.method}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm border ${getStatusStyle(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-700">{payment.transactionId}</td>

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
