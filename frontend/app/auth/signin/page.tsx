"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
export default function SigninPage() {
    const router = useRouter();
    const [userexists , setUserexists] = useState(true)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    async function signinhandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            const response = await axios.post("http://localhost:8080/signin", {
                username,
                password
            });
            console.log(response.data);
            if (response.status == 200) {
                router.push(`/dashboard/${response.data.username}`);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setUserexists(false); // show "user exists" message
            } else {
                console.error("Signin failed:", error);
            }
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
            <div className="flex flex-col border rounded-xl p-6 bg-white shadow-md h-100 w-1/3">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">Signin</h1>

                    {!userexists && (
                    <div className=" text-red-800 rounded-lg   flex items-center justify-center">
                        Invalid credentials. Please try again.
                    </div>
                )}
                <form action="" onSubmit={signinhandler}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300  text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"
                    >
                        Signin
                    </button>
                </form>
                <Link href={"/auth/signup"}>
                <div className="text-black text-center py-2">Havent Signed up ? SignUp here</div>
                </Link>
            </div>
        </div>
    )
}