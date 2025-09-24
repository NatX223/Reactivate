'use client';

import React, { useState } from 'react';
import { WalletAction } from '@/types/wallet';
import { cn } from '@/lib/utils';
import SendModal from './SendModal';
import ReceiveModal from './ReceiveModal';
import ModulesModal from './ModulesModal';

interface ActionButtonsProps {
  actions?: WalletAction[];
  className?: string;
}



// Icon components
const IconMap: Record<string, React.ReactNode> = {
  'arrow-down': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  'arrow-up': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  'puzzle': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1z" />
    </svg>
  )
};

const ActionButton: React.FC<{ action: WalletAction }> = ({ action }) => {
  return (
    <button
      onClick={action.action}
      className={cn(
        'group relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28',
        'bg-white rounded-xl shadow-lg border-2 border-transparent',
        'hover:scale-105 active:scale-95 hover:shadow-xl',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'overflow-hidden'
      )}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
      <div className="absolute inset-0.5 bg-white rounded-lg" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-1">
        {/* Icon */}
        <div className="text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
          {IconMap[action.icon] || (
            <div className="w-6 h-6 bg-gray-400 rounded" />
          )}
        </div>
        
        {/* Label */}
        <span className="text-xs font-clash font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
          {action.label}
        </span>
      </div>
    </button>
  );
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  actions, 
  className 
}) => {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [modulesModalOpen, setModulesModalOpen] = useState(false);
  const [activeModules, setActiveModules] = useState(['autopay', 'dca-bot']);

  // Define actions with modal handlers
  const modalActions: WalletAction[] = [
    {
      id: 'receive',
      label: 'Receive',
      icon: 'arrow-down',
      action: () => setReceiveModalOpen(true)
    },
    {
      id: 'send',
      label: 'Send',
      icon: 'arrow-up',
      action: () => setSendModalOpen(true)
    },
    {
      id: 'modules',
      label: 'Modules',
      icon: 'puzzle',
      action: () => setModulesModalOpen(true)
    }
  ];

  const finalActions = actions || modalActions;

  const handleSend = (data: any) => {
    console.log('Send transaction:', data);
    // Here you would integrate with your wallet/blockchain logic
  };

  const handleToggleModule = (moduleId: string, enabled: boolean) => {
    setActiveModules(prev => 
      enabled 
        ? [...prev, moduleId]
        : prev.filter(id => id !== moduleId)
    );
    console.log(`${enabled ? 'Enabled' : 'Disabled'} module:`, moduleId);
  };

  return (
    <>
      <div className={cn(
        'flex justify-center items-center gap-4 md:gap-6 lg:gap-8',
        'w-full max-w-sm mx-auto',
        className
      )}>
        {finalActions.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </div>

      {/* Modals */}
      <SendModal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        onSend={handleSend}
      />
      
      <ReceiveModal
        isOpen={receiveModalOpen}
        onClose={() => setReceiveModalOpen(false)}
      />
      
      <ModulesModal
        isOpen={modulesModalOpen}
        onClose={() => setModulesModalOpen(false)}
        activeModules={activeModules}
        onToggleModule={handleToggleModule}
      />
    </>
  );
};

export default ActionButtons;