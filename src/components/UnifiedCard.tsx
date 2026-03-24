import { motion, HTMLMotionProps } from 'framer-motion'
import React from 'react'

interface UnifiedCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  animationType?: 'experience' | 'skills' | 'project' | 'education' | 'default'
  index?: number
  onClick?: () => void
  hoverEffects?: boolean
  glowEffect?: boolean
  glowColor?: 'cyan' | 'purple' | 'green' | 'amber' | 'blue' | 'pink'
  variant?: 'default' | 'featured'
}

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className = '',
  animationType = 'default',
  index = 0,
  onClick,
  hoverEffects = true,
  glowEffect = true,
  glowColor = 'cyan',
  variant = 'default',
  ...rest
}) => {

  const animationClass = animationType ? `animation-${animationType}` : '';

  const colorMap = {
    cyan: {
      border: 'border-cyan-500/50',
      hoverBorder: 'hover:border-cyan-400/80',
      shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]',
      gradient: 'from-cyan-500/5 to-purple-500/5'
    },
    purple: {
      border: 'border-purple-500/50',
      hoverBorder: 'hover:border-purple-400/80',
      shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]',
      gradient: 'from-purple-500/5 to-pink-500/5'
    },
    green: {
      border: 'border-green-500/50',
      hoverBorder: 'hover:border-green-400/80',
      shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.7)]',
      gradient: 'from-green-500/5 to-emerald-500/5'
    },
    amber: {
      border: 'border-amber-500/50',
      hoverBorder: 'hover:border-amber-400/80',
      shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.7)]',
      gradient: 'from-amber-500/5 to-orange-500/5'
    },
    blue: {
      border: 'border-blue-500/50',
      hoverBorder: 'hover:border-blue-400/80',
      shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]',
      gradient: 'from-blue-500/5 to-cyan-500/5'
    },
    pink: {
      border: 'border-pink-500/50',
      hoverBorder: 'hover:border-pink-400/80',
      shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]',
      gradient: 'from-pink-500/5 to-purple-500/5'
    },
    red: {
      border: 'border-red-500/50',
      hoverBorder: 'hover:border-red-400/80',
      shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]',
      gradient: 'from-red-500/5 to-orange-500/5'
    },
    orange: {
      border: 'border-orange-500/50',
      hoverBorder: 'hover:border-orange-400/80',
      shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.5)]',
      hoverShadow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.7)]',
      gradient: 'from-orange-500/5 to-amber-500/5'
    }
  };

  const activeColors = colorMap[glowColor as keyof typeof colorMap] || colorMap['cyan'];

  const featuredClasses = variant === 'featured' 
    ? `border-t-[3px] border-t-cyan-400 border-l border-r border-b border-cyan-500/30 ${glowEffect ? activeColors.shadow.replace('15px', '25px') : ''}`
    : `border ${activeColors.border} ${glowEffect ? activeColors.shadow : ''}`;

  const hoverClasses = hoverEffects 
    ? `hover:-translate-y-2 ${activeColors.hoverBorder} ${glowEffect ? activeColors.hoverShadow : ''}`
    : '';

  const baseClasses = `
    bg-black/40 backdrop-blur-md rounded-xl
    transition-all duration-300 ease-out
    cursor-pointer group relative overflow-hidden
    card-theme-dark
    ${featuredClasses}
    ${hoverClasses}
    ${animationClass}
    ${className}
  `;

  const hoverAnimation = hoverEffects ? {
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
          delay: index * 0.1,
          ease: "easeOut"
        }
      }}
      onClick={onClick}
      {...hoverAnimation}
      {...rest}
    >
      {/* Unified background gradient effect that fades in with hover without layout flash */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${activeColors.gradient} pointer-events-none`} />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default UnifiedCard;