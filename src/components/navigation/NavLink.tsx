import { motion } from 'framer-motion';
import { useHoverEffect } from '../../hooks/useHoverEffect';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function NavLink({ href, children, isActive }: NavLinkProps) {
  const { isHovered, hoverProps } = useHoverEffect();

  return (
    <motion.a
      href={href}
      className="relative px-3 py-1 text-sm font-medium transition-all duration-200"
      style={{
        color: isHovered ? 'white' : 'rgb(209 213 219)',
        letterSpacing: isHovered ? '0.01em' : '0',
      }}
      {...hoverProps}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Hover background effect */}
      <motion.div
        className="absolute inset-0 rounded-md -z-0"
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {isActive && (
        <motion.div
          layoutId="activeNavLink"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.a>
  );
}