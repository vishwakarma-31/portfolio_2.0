import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'experience' | 'skills' | 'project' | 'education' | 'default';
  index?: number;
  onClick?: () => void;
  hoverEffects?: boolean;
  glowEffect?: boolean;
}

const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  className = '',
  animationType = 'default',
  index = 0,
  onClick,
  hoverEffects = true,
  glowEffect = true
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'experience':
        return {
          hidden: { opacity: 0, x: -100, rotateY: -15 },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: {
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      case 'skills':
        return {
          hidden: { opacity: 0, scale: 0.8, rotateX: 45 },
          visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: index * 0.1
            }
          }
        };
      case 'project':
        return {
          hidden: { opacity: 0, y: 100, rotateX: 20 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              duration: 0.7,
              delay: index * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      case 'education':
        return {
          hidden: { opacity: 0, x: 100, scale: 0.9 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }
        };
    }
  };

  const baseClasses = `
    relative overflow-hidden rounded-xl
    backdrop-filter backdrop-blur-xl
    transition-all duration-300 ease-out
    cursor-pointer group
    ${isDark ? 'card-theme-dark' : 'card-theme-light'}
    ${hoverEffects ? 'hover-lift' : ''}
    ${glowEffect ? 'glow-border-enter' : ''}
    ${className}
  `;

  const hoverAnimation = hoverEffects ? {
    whileHover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  } : {};

  return (
    <motion.div
      className={baseClasses}
      variants={getAnimationVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
      {...hoverAnimation}
    >
      {/* Background gradient effect on hover */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        ${isDark 
          ? 'bg-gradient-to-br from-cyan-500/5 to-purple-500/5' 
          : 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10'
        }
      `} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border */}
      <div className={`
        absolute inset-0 rounded-xl border-2 border-transparent
        group-hover:border-cyan-400/30 transition-colors duration-300
        ${glowEffect ? 'group-hover:shadow-lg group-hover:shadow-cyan-400/20' : ''}
      `} />
    </motion.div>
  );
};

export default UnifiedCard;