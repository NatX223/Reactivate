'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '@/components/ui/Button';

interface WalletConnectionCheckProps {
  children: React.ReactNode;
}

const WalletConnectionCheck: React.FC<WalletConnectionCheckProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-clash font-bold text-gray-900 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To access your React Wallet, please connect your Ethereum wallet first. 
              This will allow us to check if you have an existing React Wallet or help you create one.
            </p>

            {/* Connect Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => openConnectModal?.()}
              className="w-full"
            >
              Connect Wallet
            </Button>

            {/* Info */}
            <p className="text-sm text-gray-500 mt-4">
              We support MetaMask, WalletConnect, and other popular wallets
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WalletConnectionCheck;