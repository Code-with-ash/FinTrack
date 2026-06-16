"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    username: string;
    feedback: string;
    profile: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    if (!containerRef.current) return;
    const durations = { fast: "20s", normal: "40s", slow: "80s" };
    containerRef.current.style.setProperty("--animation-duration", durations[speed]);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-blue-100 bg-white px-8 py-6 md:w-[450px] shadow-sm"
            key={item.name}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-gray-600">
                &ldquo;{item.feedback}&rdquo;
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <img
                  className="w-10 h-10 rounded-full border-2 border-blue-100"
                  src={item.profile}
                  alt={item.name}
                />
                <span className="flex flex-col ml-3">
                  <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-400">{item.username}</span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
