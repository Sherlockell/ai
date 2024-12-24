import { motion } from 'framer-motion';

interface PipelineProgressProps {
  progress: number;
}

export default function PipelineProgress({ progress }: PipelineProgressProps) {
  return (
    <div className="absolute left-8 top-8 bottom-8 w-[2px]">
      {/* Background line */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* Glowing progress line */}
      <motion.div 
        className="relative w-full"
        initial={{ height: 0 }}
        animate={{ height: `${(progress + 1) * 33.33}%` }}
        transition={{ duration: 0.5 }}
      >
        {/* Core line */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-violet-500" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-violet-500 blur-sm" />
        
        {/* Moving light effect */}
        <motion.div
          className="absolute w-full h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}