import { motion } from 'framer-motion';
import { fadeInUp, slideInFromRight } from '../utils/animations';

export default function FeaturedService() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#3d1d6d_0%,transparent_50%)] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Transform Your Business with AI-Powered Solutions
            </h2>
            <p className="text-gray-300 mb-8">
              Our AI implementation services help SMBs automate processes, gain insights, and stay ahead of the competition. With our expertise, you can harness the power of AI without the complexity.
            </p>
            <ul className="space-y-4">
              {['Custom AI Solutions', 'Seamless Integration', 'Expert Support'].map(feature => (
                <li key={feature} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 p-8 backdrop-blur-sm border border-white/10">
              {/* Add visualization or image here */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}