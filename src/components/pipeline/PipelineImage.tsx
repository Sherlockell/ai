import { motion, AnimatePresence } from 'framer-motion';

interface PipelineImageProps {
  src: string;
}

export default function PipelineImage({ src }: PipelineImageProps) {
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-900/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent z-10" />
          <img
            src={src}
            alt="AI Pipeline Visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}