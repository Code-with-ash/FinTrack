"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-card";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-auto rounded-md flex flex-col antialiased bg-transparent items-center mt-10 relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
    </div>
  );
}

const testimonials = [
  {
    name: "Aarav Mehta",
    username: "@aarav_fin",
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "FinTrack completely changed how I manage my expenses. The insights are spot-on and help me save more every month.",
  },
  {
    name: "Priya Sharma",
    username: "@priyasharma",
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "I love how simple and intuitive FinTrack is. It's like having a personal finance coach in my pocket.",
  },
  {
    name: "Kunal Verma",
    username: "@kunalv",
    profile: "https://randomuser.me/api/portraits/men/28.jpg",
    feedback:
      "Finally, a tool that makes tracking my spending fun! The charts are beautiful and easy to understand.",
  },
  {
    name: "Ishita Kapoor",
    username: "@ishitakapoor",
    profile: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback:
      "I've tried many expense trackers, but FinTrack is the only one I've actually stuck with. Highly recommended!",
  },
  {
    name: "Rohan Singh",
    username: "@rohan_s",
    profile: "https://randomuser.me/api/portraits/men/85.jpg",
    feedback:
      "The automatic categorization is a game-changer. I can focus on my goals instead of managing spreadsheets.",
  },
];
