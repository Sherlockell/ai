import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative aspect-[4/3] w-full max-w-[500px] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent z-10" />
      <img
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
        alt="AI Neural Network Visualization"
        className="w-full h-full object-cover"
      />
      
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 mix-blend-overlay" />
      
      {/* Floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full blur-xl"
      />
    </motion.div>
  );
}