'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Button from '@/components/ui/Button';
import { ModuleData } from '@/types';
import { cn } from '@/lib/utils';

interface CreateReactWalletProps {
  onWalletCreated: (walletData: { name: string; selectedModules: string[] }) => void;
}

// Basic modules for wallet creation
const BASIC_MODULES: ModuleData[] = [
  {
    id: 'autopay',
    name: 'AutoPay',
    description: 'Set up recurring payments and subscriptions',
    icon: 'clock',
    tags: ['Payments', 'Automation']
  },
  {
    id: 'dca-bot',
    name: 'DCA Bot',
    description: 'Dollar-cost average into your favorite tokens',
    icon: 'trending-up',
    tags: ['Investing', 'DeFi']
  },
  {
    id: 'yield-aggregator',
    name: 'Yield Aggregator',
    description: 'Automatically find and stake in highest yield pools',
    icon: 'layers',
    tags: ['Staking', 'Yield']
  }
];

const iconMap: Record<string, React.ReactNode> = {
  clock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'trending-up': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  layers: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
  )
};

const CreateReactWallet: React.FC<CreateReactWalletProps> = ({ onWalletCreated }) => {
  const { address } = useAccount();
  const [walletName, setWalletName] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string } = {};

    if (!walletName.trim()) {
      newErrors.name = 'Wallet name is required';
    } else if (walletName.trim().length < 3) {
      newErrors.name = 'Wallet name must be at least 3 characters';
    } else if (walletName.trim().length > 20) {
      newErrors.name = 'Wallet name must be less than 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateWallet = async () => {
    if (!validateForm()) return;

    setIsCreating(true);
    
    try {
      // Simulate wallet creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onWalletCreated({
        name: walletName.trim(),
        selectedModules
      });
    } catch (error) {
      console.error('Failed to create wallet:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-2xl font-clash font-bold text-gray-900 mb-2">
              Create Your React Wallet
            </h2>
            <p className="text-gray-600">
              Set up your autonomous wallet with smart automation capabilities
            </p>
          </div>

          {/* Connected Address */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Connected Address</p>
                <p className="text-sm text-gray-600 font-mono">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wallet Name
            </label>
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="My React Wallet"
              className={cn(
                'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.name ? 'border-red-300' : 'border-gray-300'
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Module Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Basic Modules (Optional)
            </label>
            <div className="space-y-3">
              {BASIC_MODULES.map(module => (
                <div
                  key={module.id}
                  className={cn(
                    'border-2 rounded-xl p-4 cursor-pointer transition-all',
                    selectedModules.includes(module.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => handleModuleToggle(module.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      'p-2 rounded-lg',
                      selectedModules.includes(module.id)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    )}>
                      {iconMap[module.icon]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-clash font-semibold text-gray-900">
                          {module.name}
                        </h3>
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center',
                          selectedModules.includes(module.id)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        )}>
                          {selectedModules.includes(module.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {module.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {module.tags.map(tag => (
                          <span
                            key={tag}
                            className={cn(
                              'px-2 py-1 text-xs rounded-full',
                              selectedModules.includes(module.id)
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600'
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              You can add more modules later from the wallet dashboard
            </p>
          </div>

          {/* Create Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreateWallet}
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? 'Creating Wallet...' : 'Create React Wallet'}
          </Button>

          {/* Info */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">What happens next?</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  We'll deploy a smart contract wallet for you that can execute automated actions. 
                  This is a one-time setup that enables all the autonomous features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReactWallet;