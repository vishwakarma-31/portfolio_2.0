import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Projects = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  });

  const projects = [
    {
      title: 'Cropify',
      description: 'Developed a crop recommendation system that suggests the most suitable crop based on input parameters like soiltype,pH,temperature,humidity and rainfall.',
      tags: ['Vapi', 'Next.js', 'Web Development'],
      links: {
        github: 'https://github.com/Aryan2764/Cropify-ML',
        // demo: 'https://ai-voice-mock-interview-preparation-yh-krishs-projects-f5177f25.vercel.app/sign-in'
      },
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      featured: true
    },
    {
      title: 'Full Stack Movie Ticket Booking System',
      description: ' It provides a seamless interface for users to browse movies, check showtimes, select seats, and securely book tickets online. The system features a user-friendly frontend for customers and a robust backend for managing movie listings, showtimes, and booking data',
      tags: ['Next.js', 'Inngest', 'Clerk', 'vercel'],
      links: {
        github: 'https://github.com/Aryan2764/Movie-Booking-System',
        // demo: 'https://ai-finance-tracker-phi.vercel.app/'
      },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      featured: true
    },
    {
      title: 'Fake Fingerprint Detection',
      description: 'This project is a machine learning-based system designed to enhance biometric security by distinguishing between live and fake fingerprints it analyzes textural and structural features of a fingerprint image to classify it as either authentic or fraudulent.',
      tags: ['Next.js', 'Prisma', 'Clerk', 'Gemini AI'],
      links: {
        github: 'https://github.com/101krish/Sensei',
        demo: 'https://sensei-448g.vercel.app/'
      },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      featured: true
    }
  ]

  return (
    <div className={`pt-24 pb-16 min-h-screen p-8 relative z-10 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
      <div className="max-w-7xl mx-auto space-y-12" ref={containerRef as any}>
        {projects.map((project, index) => (
          <UnifiedCard
            key={index}
            animationType="project"
            index={index}
            className="overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center group">
              {/* Project Image */}
              <div className="md:w-1/2 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Project Content */}
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.div 
                      className="text-emerald-400 text-sm font-mono mb-2 tracking-wide uppercase"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      Featured Project
                    </motion.div>
                    <motion.h2 
                      className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {project.title}
                    </motion.h2>
                  </div>

                  <motion.div 
                    className="flex gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.a
                      href={project.links.github}
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      whileTap={{ scale: 0.9 }}
                      className={`
                        transition-all duration-300
                        ${isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}
                      `}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={22} />
                    </motion.a>
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        whileHover={{ scale: 1.2, rotate: -12 }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                          transition-all duration-300
                          ${isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}
                        `}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={22} />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                <motion.p 
                  className={`mb-6 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {project.description}
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + tagIndex * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 shadow-lg hover:shadow-xl transform transition-all duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </UnifiedCard>
        ))}
      </div>
    </div>
  )
}

export default Projects