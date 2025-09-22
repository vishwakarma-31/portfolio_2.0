'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tech: string[];
  link: string;
  github: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  tech,
  link,
  github,
  index
}: ProjectCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`
        rounded-xl overflow-hidden hover-lift group glow-border-enter
        backdrop-filter backdrop-blur-xl transition-all duration-300
        ${
          isDark 
            ? 'bg-gradient-to-br from-slate-800/80 to-gray-900/90 border border-slate-700/60 shadow-lg shadow-black/30' 
            : 'bg-gradient-to-br from-white/90 to-gray-50/80 border border-gray-200/60 shadow-lg shadow-gray-500/10'
        }
      `}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-center text-white">
            <Code className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm opacity-80">Project Preview</p>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </motion.a>
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Github className="w-5 h-5 text-white" />
          </motion.a>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className={`
          text-xl font-semibold mb-2 group-hover:text-primary transition-colors
          ${isDark ? 'text-white' : 'text-gray-900'}
        `}>
          {title}
        </h3>
        <p className={`
          mb-4 text-sm leading-relaxed
          ${isDark ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((technology) => (
            <span
              key={technology}
              className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </motion.a>
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
