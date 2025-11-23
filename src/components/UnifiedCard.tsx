import { motion } from 'framer-motion'

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

  const baseClasses = `
    relative overflow-hidden rounded-xl
    backdrop-filter backdrop-blur-xl
    transition-all duration-300 ease-out
    cursor-pointer group
    card-theme-dark
    ${hoverEffects ? 'hover-lift' : ''}
    ${glowEffect ? 'glow-border-enter' : ''}
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

  // Simple fade-in animation that works immediately
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

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
        ${glowEffect ? 'group-hover:shadow-lg group-hover:shadow-cyan-400/20' : ''}
      `} />
    </motion.div>
  );
};

export default UnifiedCard;