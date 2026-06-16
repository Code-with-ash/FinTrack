import React from "react";

interface RecentProps {
  amount: number;
  type: string;
  date: string;
}

const Recent = ({ amount, type, date }: RecentProps) => {
  const isIncome = type === "income";

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg mb-2 hover:bg-gray-50 transition-colors border border-gray-100">
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full ${
            isIncome ? "bg-emerald-500" : "bg-red-400"
          }`}
        />
        <span className="text-sm font-medium text-gray-800 capitalize">{type}</span>
      </div>
      <span
        className={`text-sm font-semibold ${
          isIncome ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {isIncome ? "+" : "-"}${amount}
      </span>
      <span className="text-xs text-gray-400">{date}</span>
    </div>
  );
};

export default Recent;