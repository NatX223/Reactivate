'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ModuleData } from '@/types';
import { FEATURED_MODULES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ModulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModules?: string[];
  onToggleModule?: (moduleId: string, enabled: boolean) => void;
}

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
  ),
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  puzzle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1z" />
    </svg>
  )
};

// Additional modules for demonstration
const ADDITIONAL_MODULES: ModuleData[] = [
  {
    id: 'stop-loss',
    name: 'Stop Loss',
    description: 'Automatically sell positions when they drop below threshold',
    icon: 'trending-up',
    tags: ['Trading', 'Risk Management']
  },
  {
    id: 'rebalancer',
    name: 'Portfolio Rebalancer',
    description: 'Maintain target allocation across your portfolio',
    icon: 'layers',
    tags: ['Portfolio', 'Automation']
  },
  {
    id: 'nft-sniper',
    name: 'NFT Sniper',
    description: 'Auto-buy NFTs based on rarity and price criteria',
    icon: 'code',
    tags: ['NFT', 'Trading']
  },
  {
    id: 'gas-optimizer',
    name: 'Gas Optimizer',
    description: 'Execute transactions during low gas periods',
    icon: 'clock',
    tags: ['Gas', 'Optimization']
  }
];

const ALL_MODULES = [...FEATURED_MODULES, ...ADDITIONAL_MODULES];

interface ModuleCardProps {
  module: ModuleData;
  isActive: boolean;
  onToggle: (moduleId: string, enabled: boolean) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isActive, onToggle }) => {
  return (
    <div className={cn(
      'bg-white rounded-xl p-4 border-2 transition-all duration-200',
      isActive 
        ? 'border-blue-500 bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'p-2 rounded-lg',
          isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        )}>
          {iconMap[module.icon] || iconMap.puzzle}
        </div>
        
        <div className="flex items-center">
          {isActive && (
            <div className="flex items-center text-blue-600 text-xs font-medium mr-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
              Active
            </div>
          )}
          
          <button
            onClick={() => onToggle(module.id, !isActive)}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isActive ? 'bg-blue-600' : 'bg-gray-200'
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                isActive ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        </div>
      </div>
      
      <h3 className="font-clash font-semibold text-gray-900 mb-2">
        {module.name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        {module.description}
      </p>
      
      <div className="flex flex-wrap gap-1">
        {module.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              'px-2 py-1 text-xs rounded-full',
              isActive 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600'
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ModulesModal: React.FC<ModulesModalProps> = ({ 
  isOpen, 
  onClose, 
  activeModules = ['autopay', 'dca-bot'], 
  onToggleModule 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all unique categories
  const categories = ['All', ...Array.from(new Set(ALL_MODULES.flatMap(m => m.tags)))];

  // Filter modules based on search and category
  const filteredModules = ALL_MODULES.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || module.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Separate active and inactive modules
  const activeModulesList = filteredModules.filter(m => activeModules.includes(m.id));
  const inactiveModulesList = filteredModules.filter(m => !activeModules.includes(m.id));

  const handleToggleModule = (moduleId: string, enabled: boolean) => {
    if (onToggleModule) {
      onToggleModule(moduleId, enabled);
    }
    console.log(`${enabled ? 'Enabled' : 'Disabled'} module:`, moduleId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Modules" className="max-w-4xl">
      <div className="p-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-2xl font-clash font-bold text-blue-600">
              {activeModules.length}
            </div>
            <div className="text-sm text-blue-700">Active Modules</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-clash font-bold text-gray-600">
              {ALL_MODULES.length - activeModules.length}
            </div>
            <div className="text-sm text-gray-700">Available Modules</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Active Modules Section */}
        {activeModulesList.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-clash font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              Active Modules ({activeModulesList.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeModulesList.map(module => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isActive={true}
                  onToggle={handleToggleModule}
                />
              ))}
            </div>
          </div>
        )}

        {/* Available Modules Section */}
        {inactiveModulesList.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-clash font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              Available Modules ({inactiveModulesList.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inactiveModulesList.map(module => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isActive={false}
                  onToggle={handleToggleModule}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-clash font-medium text-gray-900 mb-2">No modules found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Developer CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-clash font-semibold text-gray-900 mb-2">
                Build Your Own Module
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Join our developer ecosystem and create custom automation modules. Earn from users while expanding the wallet ecosystem.
              </p>
              <div className="flex gap-3">
                <Button variant="primary" size="sm">
                  Developer Docs
                </Button>
                <Button variant="outline" size="sm">
                  Browse Marketplace
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModulesModal;