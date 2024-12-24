import { useState } from 'react';
import { motion } from 'framer-motion';
import PipelineProgress from './PipelineProgress';
import PipelineStep from './PipelineStep';
import PipelineImage from './PipelineImage';

const steps = [
  {
    title: 'Analyzing prompt...',
    description: 'Our AI helps determine the optimal solutions for your business needs.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    title: 'Crafting designs...',
    description: 'Next, it helps craft original solutions within your existing workflow.',
    image: 'https://images.unsplash.com/photo-1676277791608-ac54525aa94d'
  },
  {
    title: 'Tweak, iterate, publish!',
    description: "Deploy your AI solution and continuously optimize for maximum efficiency.",
    image: 'https://images.unsplash.com/photo-1675256900659-f8c37b992ccd'
  }
];

export default function AIPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#6d1d3d_0%,transparent_60%)] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-display text-blue-400 mb-4">
            AI Pipeline
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
            Building intelligence,
            <br />
            end-to-end.
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <PipelineImage src={steps[activeStep].image} />
            </div>
          </div>

          {/* Steps Section */}
          <div className="relative order-1 lg:order-2">
            <PipelineProgress progress={activeStep} />
            
            <div className="space-y-16">
              {steps.map((step, index) => (
                <PipelineStep
                  key={index}
                  title={step.title}
                  description={step.description}
                  isActive={activeStep === index}
                  index={index}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pl-16"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/get-started"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold hover:from-blue-600 hover:to-violet-600 transition-all duration-200"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}