import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const steps = [
  {
    title: 'Analyzing needs...',
    description: 'Our AI helps determine the optimal solutions and implementation strategy for your business.',
    delay: 0.2
  },
  {
    title: 'Building pipeline...',
    description: 'We create a customized AI pipeline that integrates seamlessly with your existing workflows.',
    delay: 0.4
  },
  {
    title: 'Deploy and optimize!',
    description: 'Launch your AI solution and continuously optimize for maximum efficiency.',
    delay: 0.6
  }
];

export default function AIPipeline() {
  return (
    <section className="py-24 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#6d1d3d_0%,transparent_60%)] opacity-30" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
      >
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-2xl font-display text-blue-400 mb-4">
            AI Pipeline
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Building intelligence,
            <br />
            end-to-end.
          </h3>
        </motion.div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-blue-500 to-violet-500 hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                custom={index}
                className="relative pl-14 sm:pl-24"
              >
                {/* Step indicator */}
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                
                <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-400 max-w-2xl">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-12"
        >
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:from-blue-600 hover:to-violet-600 transition-all duration-200"
          >
            Get Started
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}