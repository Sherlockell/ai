import { motion, useScroll, useTransform } from 'framer-motion';
import { heroAnimation } from '../utils/animations';
import NeuralNetwork from './hero/NeuralNetwork';
import HeroContent from './hero/HeroContent';
import ScrollIndicator from './hero/ScrollIndicator';
import StarField from './hero/StarField';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-20%,#3d1d6d_0%,#0a0118_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_120%,#6d1d3d_0%,transparent_50%)]"></div>
      
      {/* Stars effect */}
      <div className="absolute inset-0">
        <StarField />
      </div>

      {/* Main content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative mx-auto max-w-7xl px-6 pt-32 sm:pt-40 lg:px-8 lg:pt-44"
      >
        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <HeroContent />
          <NeuralNetwork />
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}