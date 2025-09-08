import React from 'react';
import { USE_CASES } from '@/lib/constants';
import UseCaseCard from '@/components/ui/UseCaseCard';

const UseCasesSection: React.FC = () => {
  return (
    <section id="use-cases" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-World Use Cases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how AutoWall transforms everyday financial operations. From personal automation to enterprise treasury management, discover what's possible.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Success Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$2.4M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total value automated through AutoWall modules
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Automated transactions executed successfully
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Uptime for automated operations
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Automate Your Use Case?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're managing personal finances or enterprise treasury operations, AutoWall has the tools to automate your workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Automating
            </button>
            <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;