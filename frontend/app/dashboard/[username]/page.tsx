"use client";
import Link from "next/link";
import ExpenseLineChart from "../../components/Chart";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Recent from "@/app/components/ui/Recent";
import {
  LogOut,
  AlertTriangle,
  Settings,
  ArrowLeftRight,
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Wallet,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const username = params.username;
  const [currentMonthBalance, setCurrentMonthBalance] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [balanceChangePercent, setBalanceChangePercent] = useState(0);
  const [expenseChangePercent, setExpenseChangePercent] = useState(0);
  const [transactions, setTransactions] = useState<{ id: number; amount: number; type: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!storedUsername || storedUsername !== username || !token) {
        router.push("/auth/signin");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/getdata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const prevBalance = res.data.previousmonthbalance[0]?.amount || 0;
        const curBalance = res.data.currentmonthbalance[0]?.amount || 0;
        if (prevBalance !== 0) {
          setBalanceChangePercent(((curBalance - prevBalance) / prevBalance) * 100);
        } else if (curBalance > 0) {
          setBalanceChangePercent(100);
        }

        const prevExpense = res.data.previousmonthexpense[0]?.amount || 0;
        const curExpense = res.data.currentmonthexpense[0]?.amount || 0;
        if (prevExpense !== 0) {
          setExpenseChangePercent(((curExpense - prevExpense) / prevExpense) * 100);
        } else if (curExpense > 0) {
          setExpenseChangePercent(100);
        }

        setCurrentMonthBalance(curBalance);
        setCurrentMonthExpense(curExpense);
        setTransactions(res.data.transaction);
        setLoading(false);
      } catch (error: unknown) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/auth/signin");
        }
      }
    };

    fetchDashboardData();
  }, [username, router]);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  return (
    <>
      <div className="grid grid-cols-12 h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-1 bg-white border-r border-gray-100 flex md:flex-col items-center py-6 gap-2">
          <Link href="/" className="mb-6 hidden md:block">
            <BarChart3 className="w-7 h-7 text-blue-600" />
          </Link>

          <div className="flex md:flex-col items-center gap-1 md:gap-0 md:mt-4 flex-1">
            <button
              className="p-3 rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className="p-3 rounded-xl text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
              title="Transactions"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setShowSignOutModal(true)}
            className="p-3 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all md:mt-auto"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-11 flex flex-col overflow-y-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, {username}</p>
            </div>
            <div className="flex gap-3 items-center">
              <Link
                href={`/dashboard/${username}/AddTransaction`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium text-sm shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Transaction
              </Link>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {typeof username === "string" ? username.charAt(0).toUpperCase() : ""}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 pt-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Total Balance</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">${currentMonthBalance.toFixed(2)}</div>
              <div className="mt-2 flex items-center gap-1">
                {balanceChangePercent >= 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-500">
                      +{balanceChangePercent.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">
                      {balanceChangePercent.toFixed(1)}%
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-400 ml-1">vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">Expenses</span>
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">${currentMonthExpense.toFixed(2)}</div>
              <div className="mt-2 flex items-center gap-1">
                {expenseChangePercent > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">
                      +{expenseChangePercent.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-500">
                      {Math.abs(expenseChangePercent).toFixed(1)}%
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-400 ml-1">vs last month</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 pt-4 pb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Transactions</h3>
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No transactions yet</p>
                  </div>
                ) : (
                  transactions
                    .slice(-8)
                    .reverse()
                    .map((tran) => (
                      <Recent
                        key={tran.id}
                        amount={tran.amount}
                        type={tran.type}
                        date={new Date(tran.date).toLocaleDateString()}
                      />
                    ))
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <ExpenseLineChart />
            </div>
          </div>
        </div>

        {/* Sign Out Modal */}
        {showSignOutModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 m-4 max-w-sm w-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-50 p-3 rounded-full mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Sign Out</h2>
                <p className="text-gray-500 mb-6">Are you sure you want to sign out?</p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setShowSignOutModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}