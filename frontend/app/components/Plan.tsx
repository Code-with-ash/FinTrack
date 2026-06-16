import { Check, X, Star, TrendingUp, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <div className="text-center pt-16 pb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Take control of your finances with our powerful expense tracking solution.
          Perfect for individuals and teams.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $0<span className="text-lg text-gray-400 font-normal">/month</span>
              </div>
              <p className="text-gray-500">Perfect for getting started</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { included: true, text: "Track up to 100 transactions" },
                { included: true, text: "Basic expense categories" },
                { included: true, text: "Monthly spending overview" },
                { included: true, text: "Mobile-friendly interface" },
                { included: true, text: "Data export (CSV)" },
                { included: false, text: "Advanced analytics" },
                { included: false, text: "Team collaboration" },
                { included: false, text: "Priority support" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                  )}
                  <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/auth/signup"
              className="block w-full text-center py-3.5 px-6 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-amber-400 text-amber-900 px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
              <div className="text-4xl font-bold text-white mb-2">
                $9<span className="text-lg text-blue-200 font-normal">/month</span>
              </div>
              <p className="text-blue-200">For serious expense tracking</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Unlimited transactions",
                "15+ custom categories",
                "Advanced analytics & insights",
                "Budget goals & alerts",
                "Receipt photo uploads",
                "Team collaboration tools",
                "Multi-format exports",
                "Priority email support",
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-300 mr-3 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3.5 px-6 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Start Pro Trial
            </button>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Choose Pro?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h4>
              <p className="text-gray-500 text-sm">
                Get detailed insights into your spending patterns with interactive charts and reports.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
              <p className="text-gray-500 text-sm">
                Share expenses with team members and manage group budgets effortlessly.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Support</h4>
              <p className="text-gray-500 text-sm">
                Get priority support from our expert team whenever you need help.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            30-day money-back guarantee &middot; Cancel anytime &middot; No hidden fees
          </p>
          <p className="text-sm text-gray-400">Trusted by over 10,000+ users worldwide</p>
        </div>
      </div>
    </div>
  );
}