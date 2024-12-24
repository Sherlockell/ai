import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const benefits = [
  {
    title: 'Save Time',
    description: 'Automate repetitive tasks and streamline your workflows with AI-powered solutions.',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Boost Revenue',
    description: 'Leverage predictive analytics to identify trends and optimize business decisions.',
    icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
  },
  {
    title: 'Stay Competitive',
    description: 'Keep ahead of the curve with cutting-edge AI solutions tailored for your business.',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
  }
];

export default function ValueProposition() {
  return (
    <section className="py-24 relative overflow-hidden section-transition">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark/80"></div>
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-4">
            <span className="text-gradient">AI Made Simple</span>, AI That Works for You
          </h2>
          <p className="text-lg text-gray-300">
            Transform your business with powerful AI solutions designed specifically for SMBs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={fadeInUp}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-xl mb-5">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon}></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}