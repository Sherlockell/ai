import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function BlogHeader() {
  return (
    <header className="relative py-24 overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-20%,#3d1d6d_0%,#0a0118_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_120%,#6d1d3d_0%,transparent_50%)]"></div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
      >
        <h1 className="text-4xl font-display font-bold text-white sm:text-5xl mb-6">
          Latest Insights & Updates
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover the latest trends, tips, and strategies in AI implementation for SMBs
        </p>
      </motion.div>
    </header>
  );
}