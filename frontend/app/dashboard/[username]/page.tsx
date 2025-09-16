"use client"
import Link from 'next/link';
import ExpenseLineChart from "../../components/Chart";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Recent from '@/app/components/ui/Recent';
import Settings from '../../components/sidebar/Settings';
import AllTransaction from '../../components/sidebar/AllTransaction';
import { LogOut, AlertTriangle } from 'lucide-react'; // Import AlertTriangle for the modal icon

export default function Dashboard() {
    const router = useRouter();
    const params = useParams();
    const username = params.username;
    const [currentmonthbalance, setCurrentMonthBalance] = useState(0);
    const [prevmonthbalance, setPrevMonthBalance] = useState(0);
    const [currentmonthexpense, setCurrentMonthExpense] = useState(0);
    const [prevmonthexpense, setPrevMonthExpense] = useState(0);
    const [balancechangepercentage, setBalancechangepercentage] = useState(0);
    const [expensechangepercentage, setExpensechangepercentage] = useState(0);
    const [Transaction, setTransaction] = useState([]);
    const [loadingdata, setLoadingdata] = useState(true);
    const [clickedonsignout, setClickedOnSignOut] = useState(false); // State to control modal visibility

     useEffect(() => {
        const checkAuthAndFetchData = async () => {
            const storedUsername = localStorage.getItem("username");
            const token = localStorage.getItem("token");

            if (!storedUsername || storedUsername !== username || !token) {
                router.push('/auth/signin');
                return;
            }

            try {
                const res = await axios.get(`http://localhost:8080/getdata`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Safely calculate percentages to avoid division by zero
                const prevBalance = res.data.previousmonthbalance[0]?.amount || 0;
                const currentBalance = res.data.currentmonthbalance[0]?.amount || 0;
                if (prevBalance !== 0) {
                    setBalancechangepercentage(((currentBalance - prevBalance) / prevBalance) * 100);
                } else if (currentBalance > 0) {
                    setBalancechangepercentage(100); // Or handle as you see fit
                }

                const prevExpense = res.data.previousmonthexpense[0]?.amount || 0;
                const currentExpense = res.data.currentmonthexpense[0]?.amount || 0;
                if (prevExpense !== 0) {
                    setExpensechangepercentage(((currentExpense - prevExpense) / prevExpense) * 100);
                } else if (currentExpense > 0) {
                    setExpensechangepercentage(100);
                }

                setCurrentMonthBalance(currentBalance);
                setCurrentMonthExpense(currentExpense);
                setPrevMonthBalance(prevBalance);
                setPrevMonthExpense(prevExpense);
                setTransaction(res.data.transaction);
                setLoadingdata(false);

            } catch (error) {
                console.error("Failed to fetch data:", error);
                // If token is expired or invalid (often a 401 or 403), redirect
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    router.push('/auth/signin');
                }
            }
        };

        checkAuthAndFetchData();
    }, [username, router]);

    // Function to handle the sign out process
    const handleSignOut = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        router.push('/auth/signin');
    };


    return (
        <>
            <div className="grid grid-cols-12 h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200">
                {/* Sidebar */}
                <div className="col-span-12 md:col-span-1 bg-white shadow-2xl rounded-xl m-3 md:m-5">
                    <div className='text-black flex justify-center mt-10'><Settings /></div>
                    <div className='text-black flex justify-center mt-10 '><AllTransaction /></div>
                    <div
                        onClick={() => setClickedOnSignOut(true)} // Set to true to show modal
                        className='text-black flex justify-center mt-10 cursor-pointer hover:text-red-500 transition-colors'
                    >
                        <LogOut />
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-11 flex flex-col">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center p-4">
                        <div className="text-black text-3xl">Dashboard</div>
                        <div className="flex gap-4 items-center">
                            <Link href={`/dashboard/${username}/AddTransaction`} className="text-blue-500 bg-white p-2 rounded drop-shadow-2xl">Add Transaction</Link>
                            <div className="text-black text-xl">{username}</div>
                            <div className='bg-black h-10 w-10 rounded-full text-blue-400 flex items-center justify-center'>{username?.charAt(0).toUpperCase()}</div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex flex-wrap gap-6 px-4 pt-4">
                        <div className="flex flex-col justify-between rounded-xl shadow-md bg-white p-4 w-full sm:w-64 h-28">
                            <div className="text-gray-500 text-md font-medium">Total Balance</div>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-semibold text-gray-900">$ {currentmonthbalance.toFixed(2)}</div>
                                {balancechangepercentage >= 0 ? (
                                    <div className="text-green-500 font-bold">↑ {balancechangepercentage.toFixed(2)}%</div>
                                ) : (
                                    <div className="text-red-500 font-bold">↓ {Math.abs(balancechangepercentage).toFixed(2)}%</div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl shadow-md bg-white p-4 w-full sm:w-64 h-28">
                            <div className="text-gray-500 text-md font-medium">Expenses</div>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-semibold text-gray-900">$ {currentmonthexpense.toFixed(2)}</div>
                                {expensechangepercentage > 0 ? (
                                    <div className="text-red-500 font-bold">↑ {expensechangepercentage.toFixed(2)}%</div>
                                ) : (
                                    <div className="text-green-500 font-bold">↓ {Math.abs(expensechangepercentage).toFixed(2)}%</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Middle Section */}
                    <div className="flex flex-col lg:flex-row gap-6 px-4 pt-6">
                        <div className="bg-white shadow-md rounded-xl w-full lg:w-1/2 p-4">
                            <div className="text-lg font-semibold mb-2 text-blue-400">Recent Transactions</div>
                            <div className="max-h-96 overflow-y-auto">
                                {loadingdata ? (
                                    <div className='text-black'>Loading...</div>
                                ) : (
                                    Transaction.length === 0 ? (
                                        <div className="text-gray-500 text-center py-4">No recent transactions found.</div>
                                    ) : (Transaction.slice(-8).reverse().map((tran) => (
                                        <Recent
                                            key={tran.id}
                                            amount={tran.amount}
                                            type={tran.type}
                                            date={new Date(tran.date).toLocaleDateString()}
                                        />
                                    ))))}
                            </div>
                        </div>
                        <div className="bg-white shadow-md rounded-xl w-full lg:w-1/2 p-4">
                            <ExpenseLineChart />
                        </div>
                    </div>
                </div>

                {/* Sign Out Confirmation Modal */}
                {clickedonsignout && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-sm w-full transform transition-all">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-red-100 p-3 rounded-full mb-4">
                                    <AlertTriangle className="h-8 w-8 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Sign Out</h2>
                                <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
                                <div className="flex gap-4 w-full">
                                    <button
                                        onClick={() => setClickedOnSignOut(false)}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
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