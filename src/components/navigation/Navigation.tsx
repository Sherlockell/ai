import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import CTAButton from './CTAButton';
import ThemeToggle from '../ThemeToggle';
import { navigation } from './navigation.config';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced scroll-based transformations
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.08)']
  );
  
  const navBackdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  const logoOpacity = useTransform(
    scrollY,
    [0, 100],
    [1, 0]
  );

  const navGlow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(124, 58, 237, 0)', '0px 0px 30px rgba(124, 58, 237, 0.3)']
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <motion.a
            href="/"
            style={{ opacity: logoOpacity }}
            className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AIimplementation
          </motion.a>

          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              style={{ 
                backgroundColor: navBackground,
                backdropFilter: navBackdropBlur,
                boxShadow: navGlow,
              }}
              className="flex items-center px-3 py-1.5 rounded-full border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {navigation.map((item) => (
                <NavLink key={item.name} href={item.href}>
                  {item.name}
                </NavLink>
              ))}
              <div className="h-4 w-px bg-white/10 mx-2" />
              <ThemeToggle />
            </motion.div>
          </div>

          <div className="hidden md:flex items-center">
            <CTAButton />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}