import { motion } from 'framer-motion';

export default function CTAButton() {
  return (
    <div className="relative">
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href="/contact"
        className="group relative inline-flex h-10 items-center justify-center px-6 rounded-full text-white font-medium overflow-hidden"
      >
        {/* Rainbow gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #1a0f2e, #31167c, #4b2cb5, #6a3fe0, #8f52ff)',
            boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)"
          }}
        />

        {/* Enhanced traveling glow effect */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-32 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1],
              repeatDelay: 0.2,
            }}
          />
        </div>

        {/* Enhanced button border glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)',
            boxShadow: '0 0 25px rgba(143, 82, 255, 0.5), inset 0 0 10px rgba(143, 82, 255, 0.3)'
          }}
        >
          <div 
            className="h-full w-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #1a0f2e, #31167c, #4b2cb5, #6a3fe0, #8f52ff)'
            }}
          />
        </div>

        {/* Button content */}
        <span 
          className="relative flex items-center gap-2"
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          Get Started
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path 
              d="M6.5 3.5L11 8L6.5 12.5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.a>
    </div>
  );
}