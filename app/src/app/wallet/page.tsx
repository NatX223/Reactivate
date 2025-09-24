'use client';

import React, { useState, useEffect } from 'react';
import { WalletBalance, Transaction } from '@/types/wallet';
import { MOCK_WALLET_BALANCE, MOCK_TRANSACTIONS } from '@/lib/wallet-constants';
import WalletValueCard from '@/components/wallet/WalletValueCard';
import ActionButtons from '@/components/wallet/ActionButtons';
import HistorySection from '@/components/wallet/HistorySection';
import ExploreButton from '@/components/wallet/ExploreButton';
import Navigation from '@/components/layout/Navigation';
import WalletConnectionCheck from '@/components/wallet/WalletConnectionCheck';
import CreateReactWallet from '@/components/wallet/CreateReactWallet';
import WalletLoadingScreen from '@/components/wallet/WalletLoadingScreen';
import { useReactWallet } from '@/hooks/useReactWallet';

export default function WalletPage() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isWalletDataLoading, setIsWalletDataLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const { 
    hasReactWallet, 
    reactWalletData, 
    isLoading: isReactWalletLoading, 
    createReactWallet 
  } = useReactWallet();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load wallet data only after React Wallet is confirmed
  useEffect(() => {
    if (!mounted || !hasReactWallet || isReactWalletLoading) return;
    
    const loadWalletData = async () => {
      setIsWalletDataLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBalance(MOCK_WALLET_BALANCE);
      setTransactions(MOCK_TRANSACTIONS);
      setIsWalletDataLoading(false);
    };

    loadWalletData();
  }, [mounted, hasReactWallet, isReactWalletLoading]);

  const handleWalletCreated = async (walletData: { name: string; selectedModules: string[] }) => {
    try {
      await createReactWallet(walletData);
    } catch (error) {
      console.error('Failed to create React Wallet:', error);
      // Handle error (show toast, etc.)
    }
  };

  // Loading state
  if (!mounted || isReactWalletLoading) {
    return <WalletLoadingScreen />;
  }

  return (
    <WalletConnectionCheck>
      {!hasReactWallet ? (
        // Show React Wallet creation form
        <>
          <Navigation />
          <CreateReactWallet onWalletCreated={handleWalletCreated} />
        </>
      ) : (
        // Show main wallet interface
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navigation />
          {/* Navigation spacing */}
          <div className="pt-16" />
          
          {/* Wallet Header */}
          <div className="max-w-md mx-auto px-4 pt-6 md:max-w-lg md:px-6 lg:max-w-xl lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-clash font-bold text-gray-900 mb-2">
                {reactWalletData?.name || 'React Wallet'}
              </h1>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active Modules: {reactWalletData?.modules.length || 0}</span>
              </div>
            </div>
          </div>
          
          {/* Main wallet container */}
          <div className="max-w-md mx-auto px-4 py-6 md:max-w-lg md:px-6 md:py-8 lg:max-w-xl lg:px-8 lg:py-10">
            
            {/* Wallet Value Card */}
            <div className="mb-8">
              {balance ? (
                <WalletValueCard balance={balance} isLoading={isWalletDataLoading} />
              ) : (
                <WalletValueCard 
                  balance={MOCK_WALLET_BALANCE} 
                  isLoading={true} 
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="mb-12">
              <ActionButtons />
            </div>

            {/* Transaction History */}
            <div className="mb-8">
              <HistorySection 
                transactions={transactions} 
                isLoading={isWalletDataLoading}
              />
            </div>

            {/* Explore Button */}
            <ExploreButton 
              onClick={() => {
                console.log('Navigate to modules page');
                // In a real app: router.push('/modules');
              }}
            />
          </div>
        </div>
      )}
    </WalletConnectionCheck>
  );
}