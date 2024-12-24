import { motion } from 'framer-motion';

interface PipelineStepProps {
  title: string;
  description: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export default function PipelineStep({ title, description, isActive, index, onClick }: PipelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`relative pl-16 cursor-pointer transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'
      }`}
      onClick={onClick}
    >
      {/* Step indicator */}
      <motion.div 
        className="absolute left-6 top-1 w-4 h-4 rounded-full"
        layout
      >
        {/* Outer ring */}
        <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isActive ? 'bg-gradient-to-r from-orange-500 to-blue-500' : 'bg-white/20'
        }`} />
        
        {/* Inner dot */}
        <div className={`absolute inset-1 rounded-full bg-white transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-50'
        }`} />
        
        {/* Glow effect */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-orange-500/50 blur-md animate-pulse" />
        )}
      </motion.div>
      
      <h4 className={`text-2xl font-display font-bold mb-2 transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-white/50'
      }`}>
        {title}
      </h4>
      <p className={`text-lg transition-colors duration-300 ${
        isActive ? 'text-white/80' : 'text-white/30'
      }`}>
        {description}
      </p>
    </motion.div>
  );
}