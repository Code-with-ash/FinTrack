"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MyPie from "./components/ResponsivePieChart";
import { Poppins } from "next/font/google";
import { InfiniteMovingCardsDemo } from "./components/Card";
import Dashboard from "../public/dashboard.png";
import PricingPage from "./components/Plan";


gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const heroRef = useRef(null);
  const featureRef = useRef(null);
  const whyRef = useRef(null);
  const stepsRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Hero section - Initial load animations (no scroll trigger)
    const heroTl = gsap.timeline();
    heroTl.from(heroRef.current.querySelectorAll(".hero-text"), {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1.2,
      ease: "power3.out",
    })
    .from(heroRef.current.querySelector(".hero-chart"), {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "back.out(1.7)",
    }, "-=0.5");

    // Features Section - Perfect scroll with scrub
    const featureTextTl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.5,
        toggleActions: "play none none reverse",
      }
    });
    
    featureTextTl.fromTo(featureRef.current.querySelector(".feature-text"), {
      x: -120,
      opacity: 0,
      rotationY: -15,
    }, {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Feature bullet points animation
    const featureBulletsTl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 2,
        toggleActions: "play none none reverse",
      }
    });

    featureBulletsTl.fromTo(featureRef.current.querySelectorAll(".feature-bullet"), {
      x: -150,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    });

    const featureImgTl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.8,
        toggleActions: "play none none reverse",
      }
    });
    
    featureImgTl.fromTo(featureRef.current.querySelector(".feature-img"), {
      x: 120,
      opacity: 0,
      scale: 0.9,
      rotation: 5,
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Why Choose Section - Staggered list animations with scrub
    const whyTl = gsap.timeline({
      scrollTrigger: {
        trigger: whyRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 2,
        toggleActions: "play none none reverse",
      }
    });

    whyTl.fromTo(whyRef.current.querySelectorAll("li"), {
      y: 60,
      opacity: 0,
      scale: 0.95,
      rotationX: 15,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });

    // Steps Section - Card animations with enhanced effects
    const stepsTl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.5,
        toggleActions: "play none none reverse",
      }
    });

    stepsTl.fromTo(stepsRef.current.querySelectorAll(".step-card"), {
      scale: 0.7,
      opacity: 0,
      y: 80,
      rotationY: 45,
    }, {
      scale: 1,
      opacity: 1,
      y: 0,
      rotationY: 0,
      stagger: 0.15,
      duration: 1,
      ease: "back.out(1.2)",
    });

    // Pricing Section - Smooth entrance with scrub
    const pricingTl = gsap.timeline({
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
        toggleActions: "play none none reverse",
      }
    });
    // Additional scroll-based background parallax effect
    gsap.to([heroRef.current, featureRef.current, whyRef.current, stepsRef.current, pricingRef.current], {
      backgroundPosition: "50% 100px",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <div
        ref={heroRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-screen h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200"
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="flex pl-15 hero-text">
            <div
              className={`text-9xl text-black underline ${poppins.className} font-bold`}
            >
              Fin
            </div>
            <div
              className={`text-9xl text-blue-500 underline ${poppins.className} font-bold`}
            >
              Track
            </div>
          </div>
          <div
            className={`text-2xl text-gray-700 ${poppins.className} text-center pt-10 hero-text`}
          >
            Track Your Expenses. Master Your Money
          </div>
          <div
            className={`text-2xl text-gray-700 ${poppins.className} text-center pt-10 hero-text`}
          >
            <strong>Smart</strong>, <strong>Secure</strong>, and{" "}
            <strong>Effortless</strong> Expense Tracking
          </div>
        </div>
        <div style={{ height: 400 }} className="hero-chart">
          <MyPie />
        </div>
      </div>

      {/* FEATURE */}
      <div
        ref={featureRef}
        className="w-screen h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200 flex pt-10"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1/2 feature-text" style={{ willChange: 'transform' }}>
          <h1 className={`text-6xl p-5  text-blue-500 ${poppins.className}`}>
            Your <strong className="text-black">Money</strong>,
          </h1>
          <h1 className={`text-6xl p-5  text-blue-500 ${poppins.className}`}>
            At a Glance
          </h1>
          <div
            className={`text-gray-700 ${poppins.className} pt-10 pl-20 text-3xl feature-bullet`}
          >
            Beautiful charts
          </div>
          <div
            className={`text-gray-700 ${poppins.className} pt-15 text-3xl pl-40 feature-bullet`}
          >
            Budget control in real-time
          </div>
          <div
            className={`text-gray-700 ${poppins.className} pt-15 pl-70 text-3xl feature-bullet`}
          >
            Easy expense logging
          </div>
        </div>
        <div className="flex items-center justify-center w-1/2 feature-img" style={{ willChange: 'transform' }}>
          <img
            className="w-150 h-100 rounded-3xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            style={{
              filter: "drop-shadow(0 4px 10px rgba(59, 130, 246, 0.5))",
            }}
            src={Dashboard.src}
            alt="Dashboard UI"
          />
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div
        ref={whyRef}
        className="w-screen h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`text-5xl text-black ${poppins.className} text-center`}
        >
          " Why Choose Fin
          <div className="inline-block text-blue-500">Track? </div> "
        </div>
        <div className="mt-20 text-center text-3xl">
          <ul className="list-inside text-black" style={{ willChange: 'transform' }}>
            <li className="pb-10">
              🔒 Secure Login - <strong>Protect</strong> your data with modern
              authentication
            </li>
            <li className="pb-10">
              📊 Smart <strong>Analytics</strong> - Visualize your spending
              patterns instantly
            </li>
            <li className="pb-10">
              💡 Budget Alerts - Stay on <strong>top</strong> of your finances
            </li>
            <li>
              📱 <strong>Cross-Device</strong> Access - Use on desktop, tablet,
              or mobile
            </li>
          </ul>
        </div>
        <InfiniteMovingCardsDemo />
      </div>

      {/* STEPS */}
      <div
        ref={stepsRef}
        className="w-screen h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200"
        style={{ willChange: 'transform' }}
      >
        <div className="text-black text-center text-5xl pt-20">
          Get Started in <strong className="text-blue-500">3 Simple Steps</strong>
        </div>
        <div className="flex justify-evenly items-center mt-15">
          {[
            { title: "Create Your Free Account", desc: "Secure signup with email or Google. Get started in seconds." },
            { title: "Log Your Expenses", desc: "Add categories, amounts, and notes in seconds." },
            { title: "Analyze & Save", desc: "Visualize your spending and find savings opportunities." }
          ].map((step, i) => (
            <div key={i} className="border rounded-xl h-80 w-80 bg-white drop-shadow-2xl step-card" style={{ willChange: 'transform' }}>
              <div className="flex items-center justify-center pt-10">
                <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <div className="text-black text-4xl text-center pt-5">{step.title}</div>
              <div className="text-gray-500 pt-10 text-center">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div
        className="w-screen h-screen bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200"
        style={{ willChange: 'transform' }}
      >
        <PricingPage />
      </div>
    </>
  );
}