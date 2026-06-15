import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI-Powered Circular Economy | Transforming Waste Into Opportunity",
  description:
    "A revolutionary AI-powered recommendation engine that transforms waste streams into valuable resources, building a sustainable circular economy for the future.",
  keywords: [
    "circular economy",
    "AI",
    "sustainability",
    "waste management",
    "recycling",
    "climate tech",
    "environmental engineering",
  ],
  openGraph: {
    title: "AI-Powered Circular Economy Engine",
    description: "Transforming Waste Into Opportunity with AI",
    type: "website",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen noise-overlay">{children}</body>
    </html>
  );
}
