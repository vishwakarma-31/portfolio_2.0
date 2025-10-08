import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ProjectsRepository } from '../repositories/projectsRepository'
import { ProjectService } from '../domain/services/ProjectService'
import { Helmet } from 'react-helmet-async'

const Projects = () => {
  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  });

  // Get all projects from repository and convert to entities
  const allProjects = ProjectsRepository.getAllProjects().map(data => 
    ProjectService.createProject(data)
  )
  
  // Use domain service to get featured projects
  const projects = ProjectService.getFeaturedProjects(allProjects)

  // Convert repository data to component format
  const projectData = projects.map(project => ({
    title: project.title,
    description: project.description,
    tags: project.tags,
    links: {
      github: project.github,
      demo: project.link
    },
    image: project.image,
    featured: project.featured
  }))

  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100">
      <Helmet>
        <title>Projects - Aryan Vishwakarma</title>
        <meta name="description" content="Explore my portfolio of projects showcasing expertise in React, Node.js, Machine Learning, and modern web technologies." />
      </Helmet>
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
          {projectData.map((project, index) => (
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
    </main>
  )
}

export default Projects