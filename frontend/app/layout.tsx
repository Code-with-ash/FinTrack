import type { Metadata } from "next";
import { Roboto, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

// Fonts
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinTrack",
  description: "Smart Expense Tracker with Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Default font: Poppins */}
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
