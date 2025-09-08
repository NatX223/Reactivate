import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoWall - Your Wallet. Autonomous.",
  description: "Create a smart wallet or upgrade your EOA to perform automatic actions — scheduled payments, auto-investing, yield farming, and more.",
  keywords: "smart wallet, autonomous finance, DeFi automation, Web3, blockchain",
  openGraph: {
    title: "AutoWall - Autonomous Finance Platform",
    description: "Automate your DeFi activities with smart wallets and modular extensions",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoWall - Your Wallet. Autonomous.",
    description: "Create a smart wallet or upgrade your EOA to perform automatic actions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
