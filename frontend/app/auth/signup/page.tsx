"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BarChart3, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [userExists, setUserExists] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setUserExists(false);

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        username,
        password,
      });

      if (response.status === 201) {
        router.push("/auth/signin");
      }
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 409) {
        setUserExists(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BarChart3 className="w-12 h-12 text-white" />
            <span className="text-4xl font-bold text-white">FinTrack</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4">Start your journey</h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            Create your free account and take control of your finances with smart expense tracking and analytics.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">
              Fin<span className="text-blue-600">Track</span>
            </span>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-500 mb-6">Get started with FinTrack for free</p>

            {userExists && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                This username is already taken. Please choose another.
              </div>
            )}

            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  id="signup-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6 text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}