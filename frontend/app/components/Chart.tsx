"use client"
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface DataPoint {
  x: string;
  y: number;
}

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
          router.push('/auth/signin');
          return;
        }

        const res = await axios.get("http://localhost:8080/getChartData", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          router.push('/auth/signin');
          return;
        }

        console.log(res.data);

        // Process expenses data
        const processedExpenses: DataPoint[] = [];
        res.data.expenses?.forEach((expense: { month: string; amount: number }) => {
          processedExpenses.push({
            x: expense.month,
            y: expense.amount
          });
        });

        // Process balance data
        const processedBalance: DataPoint[] = [];
        res.data.balance?.forEach((balance: { month: string; amount: number }) => {
          processedBalance.push({
            x: balance.month,
            y: balance.amount
          });
        });

        // Sort data by month order
        const monthsOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        processedExpenses.sort(
          (a, b) => monthsOrder.indexOf(a.x) - monthsOrder.indexOf(b.x)
        );

        processedBalance.sort(
          (a, b) => monthsOrder.indexOf(a.x) - monthsOrder.indexOf(b.x)
        );

        console.log("Expenses Data:", processedExpenses);
        console.log("Balance Data:", processedBalance);

        setExpensesData(processedExpenses);
        setBalanceData(processedBalance);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch chart data");
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Helper function to fill missing months with 0
  const fillMissingMonths = (data: DataPoint[]) => {
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    
    const result: number[] = [];
    
    months.forEach(month => {
      const found = data.find(item => item.x === month);
      result.push(found ? found.y : 0);
    });
    
    return result;
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md w-full h-full flex items-center justify-center">
        <div>Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md w-full h-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (balanceData.length === 0 && expensesData.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md w-full h-full flex items-center justify-center">
        <div>No data available</div>
      </div>
    );
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Balance",
        data: fillMissingMonths(balanceData),
        borderColor: "#3b82f6", // blue
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointRadius: 5
      },
      {
        label: "Expenses",
        data: fillMissingMonths(expensesData),
        borderColor: "#ef4444", // red
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ef4444",
        pointRadius: 5
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#374151"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280"
        },
        grid: {
          color: "#f3f4f6"
        }
      },
      y: {
        ticks: {
          color: "#6b7280"
        },
        grid: {
          color: "#f3f4f6"
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full h-full">
      <h2 className="text-lg font-semibold mb-4 text-black">Balance vs Expenses</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}