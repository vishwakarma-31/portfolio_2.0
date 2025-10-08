import React from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Projects = () => {

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
    <div className="min-h-screen pt-24 pb-16 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            My Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            A showcase of my latest work and technical achievements
          </p>
        </motion.div>

        <div 
          ref={containerRef as any}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <UnifiedCard
              key={index}
              animationType="project"
              index={index}
              className="group"
            >
              <div className="relative h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors text-white">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-xs rounded-full transition-all duration-200 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 text-center py-2 px-4 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 text-sm"
                    >
                      View Code
                    </motion.a>
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-sm"
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </UnifiedCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects