import React from 'react';

const IncentiveSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Autonomous Wallets?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AutoWall creates value for everyone in the ecosystem. Whether you're a user looking to automate your finances or a developer building the future of Web3.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Users Column */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Users</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Save Time</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Wallet handles repetitive actions automatically. No more manual transactions or missed opportunities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Never Miss Opportunities</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Auto-invest on schedule, catch yield opportunities, and execute strategies 24/7.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🔒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Set & Forget</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Trustless automation onchain. Your funds stay secure while automation runs transparently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developers Column */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Developers</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🧩</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Build Modules</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Expand wallet powers with plug-ins. Create custom automation strategies and financial tools.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">💰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Earn from Users</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Monetize modules through usage fees, subscriptions, or performance-based rewards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🌐</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Join the Ecosystem</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Be part of the modular finance movement. Shape the future of autonomous financial operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="mt-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Value Circulation
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              {/* Users */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Users</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Use modules & pay fees</p>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 transform md:rotate-0 rotate-90">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Wallet */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👛</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">AutoWall</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Orchestrates automation</p>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 transform md:rotate-0 rotate-90">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Developers */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💻</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Developers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Build modules & earn revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncentiveSection;