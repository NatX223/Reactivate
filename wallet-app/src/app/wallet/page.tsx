'use client';

import React, { useState, useEffect } from 'react';
import { WalletBalance, Transaction } from '@/types/wallet';
import { MOCK_WALLET_BALANCE, MOCK_TRANSACTIONS } from '@/lib/wallet-constants';
import WalletValueCard from '@/components/wallet/WalletValueCard';
import ActionButtons from '@/components/wallet/ActionButtons';
import HistorySection from '@/components/wallet/HistorySection';
import ExploreButton from '@/components/wallet/ExploreButton';
import Navigation from '@/components/layout/Navigation';

export default function WalletPage() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate loading data
  useEffect(() => {
    if (!mounted) return;
    
    const loadWalletData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBalance(MOCK_WALLET_BALANCE);
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoading(false);
    };

    loadWalletData();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-16" />
        <div className="max-w-md mx-auto px-4 py-6 md:max-w-lg md:px-6 md:py-8 lg:max-w-xl lg:px-8 lg:py-10">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="flex justify-center gap-4 mb-12">
              <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      {/* Navigation spacing */}
      <div className="pt-16" />
      
      {/* Main wallet container */}
      <div className="max-w-md mx-auto px-4 py-6 md:max-w-lg md:px-6 md:py-8 lg:max-w-xl lg:px-8 lg:py-10">
        
        {/* Wallet Value Card */}
        <div className="mb-8">
          {balance ? (
            <WalletValueCard balance={balance} isLoading={isLoading} />
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
            isLoading={isLoading}
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
  );
}