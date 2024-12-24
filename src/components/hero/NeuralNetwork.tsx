import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNeuralNetwork } from './useNeuralNetwork';

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useNeuralNetwork(canvasRef, containerRef);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative aspect-[9/10] w-[18rem] sm:w-[24rem] rounded-2xl bg-gray-900/5 p-6 backdrop-blur-sm ring-1 ring-white/10"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  );
}