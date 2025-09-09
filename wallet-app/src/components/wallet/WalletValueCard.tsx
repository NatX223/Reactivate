'use client';

import React from 'react';
import { WalletBalance } from '@/types/wallet';
import { cn } from '@/lib/utils';

interface WalletValueCardProps {
  balance: WalletBalance;
  isLoading?: boolean;
  className?: string;
}

const WalletValueCard: React.FC<WalletValueCardProps> = ({ 
  balance, 
  isLoading = false, 
  className 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatTokenAmount = (amount: number, symbol: string) => {
    return `${amount.toFixed(symbol === 'ETH' ? 4 : 2)} ${symbol}`;
  };

  if (isLoading) {
    return (
      <div className={cn(
        'relative w-full h-32 md:h-36 lg:h-40 rounded-2xl p-6 overflow-hidden',
        'bg-gradient-to-br from-blue-500 to-purple-600',
        'shadow-lg shadow-blue-500/25 animate-pulse',
        className
      )}>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-start">
            <div className="h-4 w-24 bg-white/30 rounded animate-pulse" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-12 w-48 bg-white/30 rounded animate-pulse" />
          </div>
          <div className="flex justify-end">
            <div className="h-6 w-32 bg-white/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'relative w-full h-32 md:h-36 lg:h-40 rounded-2xl p-6 overflow-hidden',
      'bg-gradient-to-br from-blue-500 to-purple-600',
      'shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30',
      'transition-all duration-300 ease-out',
      className
    )}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl" />
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-sm" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top Left - Label */}
        <div className="flex justify-start">
          <span className="text-white/80 text-sm font-medium">
            Wallet Balance
          </span>
        </div>
        
        {/* Center - Main USD Value */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-none">
            {formatCurrency(balance.usdValue)}
          </h1>
        </div>
        
        {/* Bottom Right - Secondary Token Value */}
        <div className="flex justify-end items-end">
          <div className="text-right">
            <div className="text-white/90 text-lg font-semibold">
              {formatTokenAmount(balance.primaryToken.amount, balance.primaryToken.symbol)}
            </div>
            {balance.secondaryTokens && balance.secondaryTokens.length > 0 && (
              <div className="text-white/70 text-sm">
                +{balance.secondaryTokens.length} more token{balance.secondaryTokens.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletValueCard;