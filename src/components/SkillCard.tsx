'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  index: number;
  description?: string;
}

export default function SkillCard({ name, icon: Icon, color, index, description }: SkillCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="text-center group cursor-pointer"
    >
      <div className={`
        p-8 rounded-xl hover-lift group-hover:border-primary/50 
        transition-all duration-300 relative overflow-hidden 
        glow-border-enter backdrop-filter backdrop-blur-xl
        ${
          isDark 
            ? 'bg-gradient-to-br from-slate-800/80 to-gray-900/90 border border-slate-700/60 shadow-lg shadow-black/30' 
            : 'bg-gradient-to-br from-white/90 to-gray-50/80 border border-gray-200/60 shadow-lg shadow-gray-500/10'
        }
      `}>
        {/* Background gradient on hover */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${
            isDark 
              ? 'bg-gradient-to-br from-primary/5 to-accent/5' 
              : 'bg-gradient-to-br from-primary/10 to-accent/10'
          }
        `}></div>
        
        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Icon className={`w-12 h-12 mx-auto ${color} group-hover:scale-110 transition-transform duration-300`} />
          </motion.div>
          
          <h3 className={`
            text-xl font-semibold mb-2 group-hover:text-primary transition-colors
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {name}
          </h3>
          
          {description && (
            <p className={`
              text-sm transition-colors
              ${
                isDark 
                  ? 'text-gray-400 group-hover:text-gray-300' 
                  : 'text-gray-600 group-hover:text-gray-700'
              }
            `}>
              {description}
            </p>
          )}
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300"></div>
      </div>
    </motion.div>
  );
}
