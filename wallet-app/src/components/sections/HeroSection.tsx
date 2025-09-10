import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import WalletHubAnimation from "@/components/animations/WalletHubAnimation";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Wallet.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Autonomous.
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Create a smart wallet or upgrade your EOA to perform automatic
              actions — scheduled payments, auto-investing, yield farming, and
              more. Developers can extend powers with plug-and-play modules.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                variant="primary"
                size="lg"
                className="text-lg px-8 py-4"
                href="/wallet"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
                href="#modules"
              >
                Explore Modules
              </Button>
            </div>

            {/* Caption */}
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center lg:justify-start space-x-2">
              <span>Powered by</span>
              <span className="font-clash font-medium">Reactive Network</span>
            </p>
          </div>

          {/* Right Side - Animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <WalletHubAnimation />
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default HeroSection;
