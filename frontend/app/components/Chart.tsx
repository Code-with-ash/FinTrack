"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

interface DataPoint {
  x: string;
  y: number;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BalanceExpenseChart() {
  const router = useRouter();
  const [balanceData, setBalanceData] = useState<DataPoint[]>([]);
  const [expensesData, setExpensesData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/signin");
          return;
        }

        const res = await axios.get("http://localhost:8080/getChartData", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          router.push("/auth/signin");
          return;
        }

        const processedExpenses: DataPoint[] = (res.data.expenses || []).map(
          (e: { month: string; amount: number }) => ({ x: e.month, y: e.amount })
        );

        const processedBalance: DataPoint[] = (res.data.balance || []).map(
          (b: { month: string; amount: number }) => ({ x: b.month, y: b.amount })
        );

        processedExpenses.sort((a, b) => MONTHS.indexOf(a.x) - MONTHS.indexOf(b.x));
        processedBalance.sort((a, b) => MONTHS.indexOf(a.x) - MONTHS.indexOf(b.x));

        setExpensesData(processedExpenses);
        setBalanceData(processedBalance);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setError("Failed to fetch chart data");
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const fillMissingMonths = (data: DataPoint[]) => {
    return MONTHS.map((month) => {
      const found = data.find((item) => item.x === month);
      return found ? found.y : 0;
    });
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl w-full h-full flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Loading chart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-xl w-full h-full flex items-center justify-center">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  if (balanceData.length === 0 && expensesData.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-sm">No data available yet</div>
      </div>
    );
  }

  const chartData = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Balance",
        data: fillMissingMonths(balanceData),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.08)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#2563eb",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: fillMissingMonths(expensesData),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.08)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ef4444",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#374151", usePointStyle: true, pointStyle: "circle" as const },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#f3f4f6" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl w-full h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Balance vs Expenses</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}