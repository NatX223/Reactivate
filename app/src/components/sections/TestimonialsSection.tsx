import React from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import TestimonialCard from '@/components/ui/TestimonialCard';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from developers and users who are already building and benefiting from autonomous finance with AutoWall.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Growing Community
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-2">85+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Developers</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-green-600 mb-2">42</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Live Modules</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join the AutoWall Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Connect with other users and developers. Share strategies, get support, and stay updated on the latest features and modules.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="https://discord.gg/autowall"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <span>💬</span>
                <span>Discord</span>
              </a>
              
              <a
                href="https://twitter.com/autowall"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <span>🐦</span>
                <span>Twitter</span>
              </a>
              
              <a
                href="https://github.com/autowall"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
              >
                <span>🐙</span>
                <span>GitHub</span>
              </a>
              
              <a
                href="https://farcaster.xyz/autowall"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <span>🟣</span>
                <span>Farcaster</span>
              </a>
            </div>
            
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;