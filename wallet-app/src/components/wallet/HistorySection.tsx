'use client';

import React from 'react';
import { Transaction } from '@/types/wallet';
import TransactionCard from './TransactionCard';
import { cn } from '@/lib/utils';

interface HistorySectionProps {
  transactions: Transaction[];
  isLoading?: boolean;
  className?: string;
}

const SkeletonCard = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-3 bg-gray-200 rounded w-12" />
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <h3 className="text-lg font-clash font-medium text-gray-900 mb-2">No transactions yet</h3>
    <p className="text-gray-500 max-w-sm mx-auto">
      Your transaction history will appear here once you start using your wallet.
    </p>
  </div>
);

const HistorySection: React.FC<HistorySectionProps> = ({ 
  transactions, 
  isLoading = false, 
  className 
}) => {
  // Sort transactions by timestamp (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className={cn('w-full', className)}>
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-clash font-bold text-gray-900 relative inline-block">
          History
          {/* Gradient underline */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </h2>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeleton
          <>
            {[...Array(5)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </>
        ) : sortedTransactions.length > 0 ? (
          // Transaction cards
          <>
            {sortedTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                className="w-full"
              />
            ))}
            
            {/* Load More Button (for future pagination) */}
            {sortedTransactions.length >= 10 && (
              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50">
                  Load more transactions
                </button>
              </div>
            )}
          </>
        ) : (
          // Empty state
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default HistorySection;