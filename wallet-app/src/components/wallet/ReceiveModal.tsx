'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress?: string;
}

const ReceiveModal: React.FC<ReceiveModalProps> = ({ 
  isOpen, 
  onClose, 
  walletAddress = '0x742d35Cc6634C0532925a3b8D4C2C4e0C8b8E8E8' 
}) => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [copied, setCopied] = useState(false);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum Mainnet' },
    { symbol: 'USDC', name: 'USD Coin', network: 'Ethereum Mainnet' },
    { symbol: 'USDT', name: 'Tether', network: 'Ethereum Mainnet' }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareAddress = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Wallet Address',
          text: `Send ${selectedToken} to this address:`,
          url: walletAddress
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  // Generate QR code placeholder (in real app, use a QR code library)
  const QRCodePlaceholder = () => (
    <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-4.01M12 12v4m6-4h.01M12 8h.01M12 8h4.01M12 8H7.99M12 8V4m0 0H7.99M12 4h4.01" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">QR Code</p>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receive">
      <div className="p-6 space-y-6">
        {/* Token Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Token to Receive
          </label>
          <div className="grid grid-cols-1 gap-2">
            {tokens.map(token => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token.symbol)}
                className={cn(
                  'p-3 rounded-xl border-2 text-left transition-all',
                  selectedToken === token.symbol
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{token.symbol}</div>
                    <div className="text-sm text-gray-500">{token.name}</div>
                  </div>
                  <div className="text-xs text-gray-400">{token.network}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <QRCodePlaceholder />
          <p className="mt-3 text-sm text-gray-600">
            Scan this QR code to send {selectedToken} to your wallet
          </p>
        </div>

        {/* Wallet Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Wallet Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={walletAddress}
              readOnly
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {copied ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          {copied && (
            <p className="mt-1 text-sm text-green-600">Address copied to clipboard!</p>
          )}
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Important</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Only send {selectedToken} and compatible tokens to this address. 
                Sending other tokens may result in permanent loss.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={shareAddress}
            className="flex-1"
          >
            Share Address
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="flex-1"
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReceiveModal;