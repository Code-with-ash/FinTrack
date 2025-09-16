"use client"
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function AddTransactionForm() {
    const [transactionType, setTransactionType] = useState("income");
    const [category, setCategory] = useState("");
    const params = useParams();
    const username = params.username;
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to
    // today's date
    const [amount, setAmount] = useState("");
    const [loadingdata, setLoadingdata] = useState(false);
    const [description, setDescription] = useState("");
    async function sendData() {
        if (!amount) {
            alert(`Please enter an amount for your ${transactionType}.`);
            return;
        }
        if (transactionType === "expense" && !category) {
            alert(`Please select a category for your ${transactionType}.`);
            return;
        }
        if (!date) {
            alert("Please select a date for your expense.");
            return;
        }

        const cleanCategory = category.replace(/[^a-zA-Z ]/g, "").trim();
        const cleanType = transactionType.replace(/[^a-zA-Z ]/g, "").trim();
        const token =
            typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            alert("No token found. Please sign in again.");
            return;
        }
        console.log("Token found:", token);

        try {
            setLoadingdata(true);
            const response = await axios.post(
                "http://localhost:8080/senddata",
                {
                    type: cleanType,
                    amount,
                    description,
                    date,
                    category: cleanCategory,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert("Transaction added successfully!");
                setAmount("");
                setDescription("");
                setCategory("");
                setDate(new Date().toISOString().split("T")[0]);
            } else {
                alert("Failed to add transaction. Please try again.");
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert("An error occurred while adding the transaction. Please try again.");
        } finally {
            setLoadingdata(false);
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
            <Link href={`/dashboard/${username}`} className="absolute top-4 right-4 text-black border drop-shadow-2xl  p-4 shadow rounded-xl hover:bg-blue-400 font-medium ">
                Back to Dashboard
            </Link>
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Add Transaction
                    </h2>
                </div>
                <div className="space-y-2">

                    {/* Type Selector */}
                    <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700">
                            Transaction Type
                        </label>
                        <select
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300
                            text-black 
                            hover:border-blue-500
                            rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm"
                        >
                            <option value="income">💰 Income</option>
                            <option value="expense">💸 Expense</option>
                        </select>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Amount
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-gray-500 text-lg font-medium">$</span>
                            </div>
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                placeholder="0.00"
                                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 
                                hover:border-blue-500 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Category (Only for Expenses) */}
                    {transactionType === "expense" && (
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300
                            text-black
                            hover:border-blue-500
                            rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-sm">
                                <option value="">Select Category</option>
                                <option value="food">🍕 Food & Dining</option>
                                <option value="groceries">🛒 Groceries</option>
                                <option value="rent">🏠 Rent & Housing</option>
                                <option value="transportation">🚗 Transportation</option>
                                <option value="entertainment">🎬 Entertainment</option>
                                <option value="shopping">🛍️ Shopping</option>
                                <option value="utilities">⚡ Utilities</option>
                                <option value="healthcare">🏥 Healthcare</option>
                                <option value="education">📚 Education</option>
                                <option value="travel">✈️ Travel</option>
                                <option value="fitness">💪 Fitness & Sports</option>
                                <option value="subscriptions">📱 Subscriptions</option>
                                <option value="insurance">🛡️ Insurance</option>
                                <option value="gifts">🎁 Gifts & Donations</option>
                                <option value="other">📋 Other</option>
                            </select>
                        </div>
                    )}

                    {/* Date Picker */}
                    <div className="space-y-3">
                        <label
                            className="block text-sm font-semibold text-gray-700">
                            Date
                        </label>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className="w-full text-black px-4 py-3 border border-gray-300 hover:border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    {/* Notes */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Notes
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add optional details about this transaction..."
                            rows={3}
                            className="w-full text-black px-4 py-3 hover:border-blue-500 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none shadow-sm"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    {loadingdata ? (
                        <div className="w-full bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl text-center">
                            Loading...
                        </div>
                    ) : (
                        <button
                            type="submit"
                            onClick={sendData}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                        >
                            Add Transaction
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}