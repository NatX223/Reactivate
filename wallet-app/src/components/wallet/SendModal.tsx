'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (data: SendData) => void;
}

interface SendData {
  recipient: string;
  amount: string;
  token: string;
  memo?: string;
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, onSend }) => {
  const [formData, setFormData] = useState<SendData>({
    recipient: '',
    amount: '',
    token: 'ETH',
    memo: ''
  });
  const [errors, setErrors] = useState<Partial<SendData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.45' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00' },
    { symbol: 'USDT', name: 'Tether', balance: '500.00' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SendData> = {};

    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.recipient)) {
      newErrors.recipient = 'Invalid Ethereum address';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSend) {
        onSend(formData);
      }
      
      // Reset form and close modal
      setFormData({ recipient: '', amount: '', token: 'ETH', memo: '' });
      onClose();
    } catch (error) {
      console.error('Send failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxAmount = () => {
    const selectedToken = tokens.find(t => t.symbol === formData.token);
    if (selectedToken) {
      setFormData(prev => ({ ...prev, amount: selectedToken.balance }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Token Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Token
          </label>
          <select
            value={formData.token}
            onChange={(e) => setFormData(prev => ({ ...prev, token: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name} (Balance: {token.balance})
              </option>
            ))}
          </select>
        </div>

        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={formData.recipient}
            onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
            placeholder="0x..."
            className={cn(
              'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              errors.recipient ? 'border-red-300' : 'border-gray-300'
            )}
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <button
              type="button"
              onClick={handleMaxAmount}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Max
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              className={cn(
                'w-full px-4 py-3 pr-16 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.amount ? 'border-red-300' : 'border-gray-300'
              )}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              {formData.token}
            </div>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        {/* Memo (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Memo (Optional)
          </label>
          <input
            type="text"
            value={formData.memo}
            onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
            placeholder="Add a note..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Transaction Summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Network Fee</span>
            <span className="font-medium">~$2.50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="font-bold">
              {formData.amount || '0'} {formData.token} + Fee
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SendModal;