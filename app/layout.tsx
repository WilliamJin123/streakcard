import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["600", "700", "800"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
