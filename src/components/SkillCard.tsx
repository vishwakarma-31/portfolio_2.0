'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  index: number;
  description?: string;
}

export default function SkillCard({ name, icon: Icon, color, index, description }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="text-center group cursor-pointer"
    >
      <div className="glass p-8 rounded-xl hover-lift group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden glow-border-enter">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Icon className={`w-12 h-12 mx-auto ${color} group-hover:scale-110 transition-transform duration-300`} />
          </motion.div>
          
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {description && (
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
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
