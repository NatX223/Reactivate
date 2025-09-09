'use client';

import React from 'react';
import { Transaction } from '@/types/wallet';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, className }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatTokenAmount = (amount: number, token: string) => {
    return `${amount.toFixed(token === 'ETH' ? 4 : 2)} ${token}`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'send':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        );
      case 'receive':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        );
      case 'module':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getIconGradient = () => {
    switch (transaction.type) {
      case 'send':
        return 'from-red-400 to-red-600';
      case 'receive':
        return 'from-green-400 to-green-600';
      case 'module':
        return 'from-blue-400 to-purple-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isPositive = transaction.type === 'receive';
  const displayAmount = isPositive ? `+${formatTokenAmount(transaction.amount, transaction.token)}` : `-${formatTokenAmount(transaction.amount, transaction.token)}`;

  return (
    <div className={cn(
      'bg-white rounded-xl p-4 shadow-sm border border-gray-100',
      'hover:shadow-md hover:border-gray-200 transition-all duration-200',
      'relative overflow-hidden',
      className
    )}>
      {/* Accent border */}
      <div className={cn(
        'absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b',
        getIconGradient()
      )} />
      
      <div className="flex items-center justify-between pl-3">
        {/* Left - Icon and Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Icon */}
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-white',
            'bg-gradient-to-br shadow-sm',
            getIconGradient()
          )}>
            {getTransactionIcon()}
          </div>
          
          {/* Transaction Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {transaction.type === 'send' ? 'Sent' : transaction.type === 'receive' ? 'Received' : 'Module'} {transaction.token}
              </h3>
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                getStatusColor()
              )}>
                {transaction.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">
              {transaction.counterparty}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {formatTimeAgo(transaction.timestamp)}
            </p>
          </div>
        </div>
        
        {/* Right - Amount */}
        <div className="text-right flex-shrink-0 ml-4">
          <div className={cn(
            'font-semibold text-sm',
            isPositive ? 'text-green-600' : 'text-gray-900'
          )}>
            {displayAmount}
          </div>
          <div className="text-xs text-gray-500">
            {formatCurrency(transaction.usdValue)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;