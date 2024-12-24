import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

export default function CTASection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark"></div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto text-center px-6 lg:px-8 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Join hundreds of SMBs already leveraging our AI solutions to drive growth and efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:from-blue-600 hover:to-violet-600 transition-all duration-200"
          >
            Get Started
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-200"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </section>
  );
}