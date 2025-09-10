import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Web3Provider } from "@/providers/Web3Provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReactWallet - Your Autonomous and Modular Wallet.",
  description: "Create a smart wallet or upgrade your EOA to perform automatic actions — scheduled payments, auto-investing, yield farming, and more.",
  keywords: "smart wallet, autonomous finance, DeFi automation, Web3, blockchain",
  openGraph: {
    title: "ReactWallet - Your Autonomous and Modular Wallet.",
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
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`font-clash antialiased`}
      >
        <Toaster position="top-right"/>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
