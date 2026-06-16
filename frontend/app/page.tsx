"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MyPie from "./components/ResponsivePieChart";
import { InfiniteMovingCardsDemo } from "./components/Card";
import Dashboard from "../public/dashboard.png";
import PricingPage from "./components/Plan";
import Link from "next/link";
import {
  BarChart3,
  Shield,
  Smartphone,
  TrendingUp,
  Zap,
  PieChart,
  UserPlus,
  ClipboardList,
  LineChart,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  function scrollToFeatures() {
    featureRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const heroTl = gsap.timeline();
    heroTl
      .from(heroRef.current!.querySelectorAll(".hero-text"), {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      })
      .from(
        heroRef.current!.querySelector(".hero-chart"),
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

    const featureTextTl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.5,
        toggleActions: "play none none reverse",
      },
    });

    featureTextTl.fromTo(
      featureRef.current!.querySelector(".feature-text"),
      { x: -120, opacity: 0, rotationY: -15 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: "power2.out" }
    );

    const featureBulletsTl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 2,
        toggleActions: "play none none reverse",
      },
    });

    featureBulletsTl.fromTo(
      featureRef.current!.querySelectorAll(".feature-bullet"),
      { x: -150, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
    );

    const featureImgTl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.8,
        toggleActions: "play none none reverse",
      },
    });

    featureImgTl.fromTo(
      featureRef.current!.querySelector(".feature-img"),
      { x: 120, opacity: 0, scale: 0.9, rotation: 5 },
      { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "power2.out" }
    );

    const whyTl = gsap.timeline({
      scrollTrigger: {
        trigger: whyRef.current,
        start: "top 60%",
        end: "top 10%",
        scrub: 2,
        toggleActions: "play none none reverse",
      },
    });

    whyTl
      .fromTo(
        whyRef.current!.querySelector("#item1"),
        { x: -120, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        whyRef.current!.querySelector("#item2"),
        { x: 120, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        whyRef.current!.querySelector("#item3"),
        { x: -120, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        whyRef.current!.querySelector("#item4"),
        { x: 120, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );

    const stepsTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.5,
        toggleActions: "play none none reverse",
      },
    });

    stepsTl.fromTo(
      stepsRef.current!.querySelectorAll(".step-card"),
      { scale: 0.7, opacity: 0, y: 80, rotationY: 45 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotationY: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.2)",
      }
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(
      [heroRef.current, featureRef.current, whyRef.current, stepsRef.current, pricingRef.current],
      {
        backgroundPosition: "50% 100px",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Fin<span className="text-blue-600">Track</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => featureRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Features
            </button>
            <button onClick={() => whyRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Why Us
            </button>
            <button onClick={() => pricingRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Pricing
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div
        ref={heroRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-screen min-h-screen pt-16 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30"
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-col w-full h-full justify-center items-center px-6 md:px-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 hero-text">
              <Zap className="w-4 h-4" />
              Smart Finance Management
            </div>
            <div className="flex hero-text">
              <span className="text-7xl md:text-8xl lg:text-9xl text-gray-900 font-bold tracking-tight">
                Fin
              </span>
              <span className="text-7xl md:text-8xl lg:text-9xl text-blue-600 font-bold tracking-tight">
                Track
              </span>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 pt-6 hero-text leading-relaxed">
              Track Your Expenses. Master Your Money.
            </p>
            <p className="text-lg text-gray-500 pt-3 hero-text">
              <strong className="text-gray-700">Smart</strong>,{" "}
              <strong className="text-gray-700">Secure</strong>, and{" "}
              <strong className="text-gray-700">Effortless</strong> Expense Tracking
            </p>
            <div className="flex gap-4 pt-8 hero-text">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={scrollToFeatures}
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all font-semibold"
              >
                Learn More
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: 400 }} className="hero-chart hidden md:block">
          <MyPie />
        </div>
      </div>

      {/* Features */}
      <div
        ref={featureRef}
        className="w-screen min-h-screen bg-white flex flex-col md:flex-row items-center py-20"
        style={{ willChange: "transform" }}
      >
        <div className="w-full md:w-1/2 px-8 md:px-16 feature-text" style={{ willChange: "transform" }}>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <PieChart className="w-4 h-4" />
            Powerful Analytics
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your <span className="text-blue-600">Money</span>,
            <br />
            At a Glance
          </h2>
          <div className="space-y-6 pt-10">
            <div className="flex items-center gap-4 feature-bullet">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl text-gray-700">Beautiful interactive charts</span>
            </div>
            <div className="flex items-center gap-4 feature-bullet">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl text-gray-700">Budget control in real-time</span>
            </div>
            <div className="flex items-center gap-4 feature-bullet">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl text-gray-700">Easy expense logging</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2 feature-img p-8" style={{ willChange: "transform" }}>
          <img
            className="w-full max-w-xl rounded-2xl shadow-2xl shadow-blue-600/10 border border-gray-100"
            src={Dashboard.src}
            alt="FinTrack Dashboard"
          />
        </div>
      </div>

      {/* Why Choose */}
      <div
        ref={whyRef}
        className="w-screen min-h-screen bg-gradient-to-b from-blue-50/50 to-white py-20"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Choose Fin<span className="text-blue-600">Track</span>?
            </h2>
            <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
              Everything you need to take control of your financial life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div
              id="item1"
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                <Shield className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Login</h3>
              <p className="text-gray-500 leading-relaxed">
                Protect your data with modern authentication and encrypted storage
              </p>
            </div>
            <div
              id="item2"
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                <BarChart3 className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Analytics</h3>
              <p className="text-gray-500 leading-relaxed">
                Visualize your spending patterns instantly with interactive charts
              </p>
            </div>
            <div
              id="item3"
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                <TrendingUp className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Budget Alerts</h3>
              <p className="text-gray-500 leading-relaxed">
                Stay on top of your finances with real-time notifications
              </p>
            </div>
            <div
              id="item4"
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                <Smartphone className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-Device Access</h3>
              <p className="text-gray-500 leading-relaxed">
                Use on desktop, tablet, or mobile — your data syncs everywhere
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <InfiniteMovingCardsDemo />
        </div>
      </div>

      {/* Steps */}
      <div
        ref={stepsRef}
        className="w-screen min-h-screen bg-white py-20"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Get Started in <span className="text-blue-600">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-500 mt-4">
              From signup to savings in under a minute
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            {[
              {
                icon: UserPlus,
                title: "Create Your Free Account",
                desc: "Secure signup with email or Google. Get started in seconds.",
              },
              {
                icon: ClipboardList,
                title: "Log Your Expenses",
                desc: "Add categories, amounts, and notes in seconds.",
              },
              {
                icon: LineChart,
                title: "Analyze & Save",
                desc: "Visualize your spending and find savings opportunities.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex-1 bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 step-card group hover:-translate-y-1"
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/25">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                      {i + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{step.title}</h3>
                <p className="text-gray-500 text-center leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div
        ref={pricingRef}
        className="w-screen min-h-screen bg-gradient-to-b from-blue-50/30 to-white"
        style={{ willChange: "transform" }}
      >
        <PricingPage />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-7 h-7 text-blue-500" />
                <span className="text-2xl font-bold text-white">
                  Fin<span className="text-blue-500">Track</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Smart, secure, and effortless expense tracking. Take control of your finances today.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => featureRef.current?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => pricingRef.current?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} FinTrack. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}