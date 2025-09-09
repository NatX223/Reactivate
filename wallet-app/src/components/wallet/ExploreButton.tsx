'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ExploreButtonProps {
  onClick?: () => void;
  className?: string;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({ onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default navigation to modules or ecosystem
      console.log('Navigate to explore section');
      // In a real app, this would navigate to a modules page
      // router.push('/modules');
    }
  };

  return (
    <div className={cn('text-center py-8', className)}>
      <button
        onClick={handleClick}
        className={cn(
          'group relative inline-block',
          'text-2xl font-bold',
          'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
          'hover:from-blue-500 hover:to-purple-500',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 py-2'
        )}
      >
        Explore
        
        {/* Gradient glow effect on hover */}
        <div className={cn(
          'absolute inset-0 -z-10 rounded-lg',
          'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
          'opacity-0 group-hover:opacity-100 blur-xl',
          'transition-opacity duration-300',
          'scale-110'
        )} />
        
        {/* Subtle underline animation */}
        <div className={cn(
          'absolute bottom-0 left-1/2 transform -translate-x-1/2',
          'w-0 group-hover:w-full h-0.5',
          'bg-gradient-to-r from-blue-500 to-purple-600',
          'transition-all duration-300 ease-out',
          'rounded-full'
        )} />
      </button>
      
      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
        Discover more modules and features in the AutoWall ecosystem
      </p>
    </div>
  );
};

export default ExploreButton;