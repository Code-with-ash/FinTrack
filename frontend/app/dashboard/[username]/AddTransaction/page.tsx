"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function AddTransactionForm() {
  const params = useParams();
  const username = params.username;
  const [transactionType, setTransactionType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function sendData() {
    if (!amount) {
      alert(`Please enter an amount for your ${transactionType}.`);
      return;
    }
    if (transactionType === "expense" && !category) {
      alert("Please select a category for your expense.");
      return;
    }
    if (!date) {
      alert("Please select a date.");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      alert("Session expired. Please sign in again.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/senddata`,
        {
          type: transactionType.replace(/[^a-zA-Z ]/g, "").trim(),
          amount,
          description,
          date,
          category: category.replace(/[^a-zA-Z ]/g, "").trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSuccess(true);
        setAmount("");
        setDescription("");
        setCategory("");
        setDate(new Date().toISOString().split("T")[0]);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      alert("Failed to add transaction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const expenseCategories = [
    { value: "food", label: "Food & Dining", emoji: "🍕" },
    { value: "groceries", label: "Groceries", emoji: "🛒" },
    { value: "rent", label: "Rent & Housing", emoji: "🏠" },
    { value: "transportation", label: "Transportation", emoji: "🚗" },
    { value: "entertainment", label: "Entertainment", emoji: "🎬" },
    { value: "shopping", label: "Shopping", emoji: "🛍️" },
    { value: "utilities", label: "Utilities", emoji: "⚡" },
    { value: "healthcare", label: "Healthcare", emoji: "🏥" },
    { value: "education", label: "Education", emoji: "📚" },
    { value: "travel", label: "Travel", emoji: "✈️" },
    { value: "fitness", label: "Fitness & Sports", emoji: "💪" },
    { value: "subscriptions", label: "Subscriptions", emoji: "📱" },
    { value: "insurance", label: "Insurance", emoji: "🛡️" },
    { value: "gifts", label: "Gifts & Donations", emoji: "🎁" },
    { value: "other", label: "Other", emoji: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Link
        href={`/dashboard/${username}`}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Transaction</h2>
          <p className="text-gray-400 text-sm mt-1">Record your income or expense</p>
        </div>

        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3 mb-4">
            <CheckCircle className="w-4 h-4" />
            Transaction added successfully!
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTransactionType("income")}
                className={`py-2.5 rounded-xl font-medium text-sm transition-all ${
                  transactionType === "income"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-blue-300"
                }`}
              >
                💰 Income
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("expense")}
                className={`py-2.5 rounded-xl font-medium text-sm transition-all ${
                  transactionType === "expense"
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-red-300"
                }`}
              >
                💸 Expense
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 text-lg font-medium">$</span>
              </div>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="0.00"
                className="w-full text-gray-900 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {transactionType === "expense" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select Category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="w-full text-gray-900 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add optional details..."
              rows={3}
              className="w-full text-gray-900 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-gray-300"
            />
          </div>

          <button
            type="button"
            onClick={sendData}
            disabled={submitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}