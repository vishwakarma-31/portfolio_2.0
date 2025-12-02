import { motion } from 'framer-motion'
import React from 'react'

interface UnifiedCardProps {
  children: React.ReactNode
  className?: string
  animationType?: 'experience' | 'skills' | 'project' | 'education' | 'default'
  index?: number
  onClick?: () => void
  hoverEffects?: boolean
  glowEffect?: boolean
}

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className = '',
  animationType = 'default',
  index = 0,
  onClick,
  hoverEffects = true,
  glowEffect = true,
}) => {

  // Use animationType to avoid unused variable error (can be extended for future use)
  const animationClass = animationType ? `animation-${animationType}` : '';

  const baseClasses = `
    border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md rounded-xl
    transition-all duration-300 ease-out
    cursor-pointer group
    card-theme-dark
    ${hoverEffects ? 'hover:-translate-y-1' : ''}
    ${animationClass}
    ${className}
  `;

  const hoverAnimation = hoverEffects ? {
    whileHover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  } : {};

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6,
          delay: index * 0.1
        }
      }}
      // Remove whileInView to prevent content from being hidden until scroll
      onClick={onClick}
      {...hoverAnimation}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border */}
      <div className={`
        absolute inset-0 rounded-xl border-2 border-transparent
        group-hover:border-cyan-400/30 transition-colors duration-300
      `} />
    </motion.div>
  );
};

export default UnifiedCard;