import { Check, X, Star, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";
import SignupPage from "../auth/signup/page";
export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200">
            {/* Header */}
            <div className="text-center pt-10 pb-12 px-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    Choose Your Plan
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Take control of your finances with our powerful expense tracking solution.
                    Perfect for individuals and teams.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Free Plan */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h3>
                            <div className="text-4xl font-bold text-gray-800 mb-2">
                                $0<span className="text-lg text-gray-500 font-normal">/month</span>
                            </div>
                            <p className="text-gray-600">Perfect for getting started</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">Track up to 100 transactions</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">Basic expense categories</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">Monthly spending overview</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">Mobile-friendly interface</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">Data export (CSV)</span>
                            </div>
                            <div className="flex items-center">
                                <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-400">Advanced analytics</span>
                            </div>
                            <div className="flex items-center">
                                <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-400">Team collaboration</span>
                            </div>
                            <div className="flex items-center">
                                <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                                <span className="text-gray-400">Priority support</span>
                            </div>
                        </div>

                        <Link href={"/auth/signup"}
                         className="w-full text-center py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 ml-20">
                            Get Started Free
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-2xl transform relative">
                        {/* Popular Badge */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                Most Popular
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                            <div className="text-4xl font-bold text-white mb-2">
                                $9<span className="text-lg text-blue-100 font-normal">/month</span>
                            </div>
                            <p className="text-blue-100">For serious expense tracking</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Unlimited transactions</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">15+ custom categories</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Advanced analytics & insights</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Budget goals & alerts</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Receipt photo uploads</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Team collaboration tools</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Multi-format exports</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                                <span className="text-white">Priority email support</span>
                            </div>
                        </div>
                        <button className="w-full py-3 px-6 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-200 shadow-lg">
                            Start Pro Trial
                        </button>
                    </div>
                </div>

                {/* Features Comparison */}
                <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        Why Choose Pro?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Advanced Analytics</h4>
                            <p className="text-gray-600 text-sm">Get detailed insights into your spending patterns with interactive charts and reports.</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Team Collaboration</h4>
                            <p className="text-gray-600 text-sm">Share expenses with team members and manage group budgets effortlessly.</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                                <Shield className="w-6 h-6 text-purple-600" />
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-2">Premium Support</h4>
                            <p className="text-gray-600 text-sm">Get priority support from our expert team whenever you need help.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ or Guarantee */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        🔒 30-day money-back guarantee • Cancel anytime • No hidden fees
                    </p>
                    <p className="text-sm text-gray-500">
                        Trusted by over 10,000+ users worldwide
                    </p>
                </div>
            </div>
        </div>
    );
}