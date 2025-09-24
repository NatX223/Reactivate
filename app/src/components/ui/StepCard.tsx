import React from 'react';
import { StepData } from '@/types';
import { cn } from '@/lib/utils';

interface StepCardProps {
  step: StepData;
  className?: string;
}

const iconMap: Record<string, string> = {
  wallet: '👛',
  clock: '⏰',
  puzzle: '🧩',
  rocket: '🚀'
};

const StepCard: React.FC<StepCardProps> = ({ step, className }) => {
  return (
    <div className={cn(
      'relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300',
      className
    )}>
      {/* Step Number */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {step.id}
      </div>
      
      {/* Icon */}
      <div className="text-4xl mb-4 text-center">
        {iconMap[step.icon] || '⚡'}
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
        {step.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">
        {step.description}
      </p>
    </div>
  );
};

export default StepCard;