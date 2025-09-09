'use client';

import React, { useState, useEffect } from 'react';
import { WalletBalance, Transaction } from '@/types/wallet';
import { MOCK_WALLET_BALANCE, MOCK_TRANSACTIONS } from '@/lib/wallet-constants';
import WalletValueCard from '@/components/wallet/WalletValueCard';
import ActionButtons from '@/components/wallet/ActionButtons';
import HistorySection from '@/components/wallet/HistorySection';
import ExploreButton from '@/components/wallet/ExploreButton';

export default function WalletPage() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadWalletData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBalance(MOCK_WALLET_BALANCE);
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoading(false);
    };

    loadWalletData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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