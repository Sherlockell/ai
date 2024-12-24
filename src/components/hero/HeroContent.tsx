import { motion } from 'framer-motion';
import { textGradient } from '../../utils/animations';

export default function HeroContent() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={textGradient}
      className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl"
    >
      <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
          Empowering SMBs
        </span>
        <br />
        with the Future of AI
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Transform your business with cutting-edge AI solutions designed specifically for small and medium-sized businesses. 
        Unlock efficiency, drive growth, and stay ahead of the competition.
      </p>
      <div className="mt-10 flex items-center gap-x-6">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/contact"
          className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-600 hover:to-violet-600 transition-all duration-200"
        >
          Get Started
        </motion.a>
        <motion.a 
          whileHover={{ x: 10 }}
          href="/services" 
          className="text-base font-semibold leading-7 text-gray-300 hover:text-white transition-colors"
        >
          Learn more <span aria-hidden="true">→</span>
        </motion.a>
      </div>
    </motion.div>
  );
}