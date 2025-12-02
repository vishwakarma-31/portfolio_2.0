import React from 'react'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { projects } from '../data/projects'
import { Helmet } from 'react-helmet-async'

const Projects = () => {
  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  });

  // Directly map and filter projects without fake loading
  const projectData = React.useMemo(() => {
    // Filter locally to get featured projects
    const featuredProjects = projects.filter(p => p.featured)

    // Map to component format
    return featuredProjects.map(project => ({
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
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100">
      <Helmet>
        <title>Projects - Aryan Vishwakarma</title>
        <meta name="description" content="Explore my portfolio of projects showcasing expertise in React, Node.js, Machine Learning, and modern web technologies." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            My Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            A showcase of my latest work and technical achievements
          </p>
        </div>

        {projectData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found.</p>
          </div>
        ) : (
          <div 
            ref={containerRef as React.RefObject<HTMLDivElement>}
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

                </div>

                {/* Project Content */}

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors text-white">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack - Removed staggered delay logic */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full transition-all duration-200 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-4 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300 text-sm"
                    >
                      View Code
                    </a>
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </UnifiedCard>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Projects