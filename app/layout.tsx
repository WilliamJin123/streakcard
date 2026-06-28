import type { Metadata } from "next";
import { Geist, Sora, Anton } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  weight: ["600", "800"],
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = "https://streakcard.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "StreakCard — Show off your streak",
  description:
    "Turn any habit streak into a clean, shareable “Day N” card. Free, instant, and exports a transparent PNG you can overlay on your Reels.",
  openGraph: {
    title: "StreakCard — Show off your streak",
    description:
      "Turn any habit streak into a clean, shareable “Day N” card. Free PNG + transparent export.",
    url: siteUrl,
    siteName: "StreakCard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreakCard — Show off your streak",
    description:
      "Turn any habit streak into a clean, shareable “Day N” card. Free PNG + transparent export.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${sora.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
