"use client"
import Link from 'next/link';
import ExpenseLineChart from "../../components/Chart";
import { useParams, useRouter } from 'next/navigation'; // Correct import for both hooks
import { use, useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const router = useRouter();
    const params = useParams();
    const username = params.username;
    const [currentmonthbalance, setCurrentMonthBalance] = useState(0);
    const [prevmonthbalance, setPrevMonthBalance] = useState(0);
    const [currentmonthexpense, setCurrentMonthExpense] = useState(0);
    const [prevmonthexpense, setPrevMonthExpense] = useState(0);
    const [balancechangepercentage , setBalancechangepercentage] = useState(0);
    const [expensechangepercentage , setExpensechangepercentage] = useState(0);
    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            const storedUsername = localStorage.getItem("username");
            const token = localStorage.getItem("token");

            // A more robust authentication check
            if (!storedUsername || storedUsername !== username || !token) {
                router.push('/auth/signin');
                return; // Stop execution if not authenticated
            }

            try {
                const res = await axios.get(`http://localhost:8080/getdata`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data);
                    setBalancechangepercentage(((res.data.currentmonthbalance[0].amount - res.data.previousmonthbalance[0].amount)/(res.data.previousmonthbalance[0].amount))*100)
                    setExpensechangepercentage(((res.data.currentmonthexpense[0].amount - res.data.previousmonthexpense[0].amount)/(res.data.previousmonthexpense[0].amount))*100)
                setCurrentMonthBalance(res.data.currentmonthbalance[0].amount);
                setCurrentMonthExpense(res.data.currentmonthexpense[0].amount);
                setPrevMonthBalance(res.data.previousmonthbalance[0].amount);
                setPrevMonthExpense(res.data.previousmonthexpense[0].amount);
                if (res.data && (res.status === 401 || res.status === 403)) {
                    router.push('/auth/signin');
                } // Access the data property
            } catch (error) {
                // Handle authentication errors gracefully
                console.error("Failed to fetch data:", error);
            }
        };

        checkAuthAndFetchData();
    }, [username, router]); // Dependency array to re-run on username change

    return (
        <>
            <div className="grid grid-cols-12 h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200">
                {/* Sidebar */}
                <div className="col-span-12 md:col-span-1 bg-white shadow-2xl rounded-xl m-3 md:m-5">
                    {/* Add your sidebar items here */}
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-11 flex flex-col">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center p-4">
                        <div className="text-black text-3xl">Dashboard</div>
                        <div className="flex gap-4 items-center">
                            <Link href={`/dashboard/${username}/AddTransaction`} className="text-blue-500 bg-white p-2 rounded drop-shadow-2xl">Add Transaction</Link>
                            <div className="text-black text-xl">{username}</div>
                            <div className='bg-black h-10 w-10 rounded-full text-blue-400 flex items-center justify-center'>{username?.charAt(0)}</div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex flex-wrap gap-6 px-4 pt-4">
                        <div className="flex flex-col justify-between rounded-xl shadow-md bg-white p-4 w-full sm:w-64 h-28">
                            <div className="text-gray-500 text-md font-medium">Total Balance</div>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-semibold text-gray-900">$ {currentmonthbalance}</div>
                                {balancechangepercentage > 0 ? (
                                    <div className="text-green-500 font-bold">↑ {balancechangepercentage}%</div>
                                ) : (
                                    <div className="text-red-500 font-bold">↓ {Math.abs(balancechangepercentage)}%</div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl shadow-md bg-white p-4 w-full sm:w-64 h-28">
                            <div className="text-gray-500 text-md font-medium">Expenses</div>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-semibold text-gray-900">$ {currentmonthexpense}</div>
                                {expensechangepercentage > 0 ? (
                                    <div className="text-green-500 font-bold">↑ {expensechangepercentage}%</div>
                                ) : (
                                    <div className="text-red-500 font-bold">↓ {Math.abs(expensechangepercentage)}%</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Middle Section */}
                    <div className="flex flex-col lg:flex-row gap-6 px-4 pt-6">
                        <div className="bg-white shadow-md rounded-xl w-full lg:w-1/2 p-4">
                            <div className="text-lg font-semibold mb-2">Recent Transactions</div>
                            {/* Add recent transactions list here */}
                        </div>
                        <div className="bg-white shadow-md rounded-xl w-full lg:w-1/2 p-4">
                            <ExpenseLineChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}