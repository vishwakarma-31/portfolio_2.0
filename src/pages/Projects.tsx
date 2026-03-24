import React, { useState } from 'react'
import UnifiedCard from '../components/UnifiedCard'
import { projects } from '../data/projects'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const getTagColor = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('react') || t.includes('typescript') || t.includes('css') || t.includes('tailwind') || t.includes('html') || t.includes('next')) return 'cyan';
  if (t.includes('node') || t.includes('python') || t.includes('express') || t.includes('api') || t.includes('django')) return 'green';
  if (t.includes('mongo') || t.includes('sql') || t.includes('database') || t.includes('firebase')) return 'amber';
  if (t.includes('ml') || t.includes('ai') || t.includes('machine') || t.includes('tensor') || t.includes('data')) return 'purple';
  return 'blue';
};

const getGlowByColor = (color: string) => {
  switch(color) {
    case 'cyan': return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300';
    case 'green': return 'border-green-500/30 bg-green-500/10 text-green-300';
    case 'amber': return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
    case 'purple': return 'border-purple-500/30 bg-purple-500/10 text-purple-300';
    default: return 'border-blue-500/30 bg-blue-500/10 text-blue-300';
  }
};

const getProjectGlowColor = (tags: string[]) => {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.some(t => t.includes('ml') || t.includes('ai') || t.includes('machine'))) return 'purple';
  if (lowerTags.some(t => t.includes('node') || t.includes('express') || t.includes('python'))) return 'green';
  return 'cyan';
};

const categories = ['All', 'Web', 'ML / AI', 'Full Stack'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      // Very basic filtering logic based on tags
      if (activeFilter === 'All') return true;
      const lowerTags = project.tags.map(t => t.toLowerCase());
      if (activeFilter === 'Web') return lowerTags.some(t => t.includes('react') || t.includes('html'));
      if (activeFilter === 'ML / AI') return lowerTags.some(t => t.includes('ml') || t.includes('ai') || t.includes('data'));
      if (activeFilter === 'Full Stack') return lowerTags.some(t => t.includes('node') || t.includes('express') || t.includes('mongo') || t.includes('database'));
      return true;
    })
  }, [activeFilter])

  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100">
      <Helmet>
        <title>Projects - Aryan Vishwakarma</title>
        <meta name="description" content="Explore my portfolio of projects showcasing expertise in React, Node.js, Machine Learning, and modern web technologies." />
        <link rel="canonical" href="https://vishwakarma-31-portfolio.vercel.app/projects" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            My Projects
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            A showcase of my latest work and technical achievements
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === cat 
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'border-gray-700 bg-black/40 text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects match this filter.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => {
                const glowColor = getProjectGlowColor(project.tags);
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link 
                      to={`/project/${project.id}`} 
                      className="block group h-full"
                    >
                      <UnifiedCard
                        animationType="project"
                        index={index}
                        variant={project.featured ? 'featured' : 'default'}
                        glowColor={glowColor as any}
                        className="group h-full flex flex-col"
                      >
                        {/* Project Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Persistent overlay for depth */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/0" />
                          
                          {/* Hover sweep border */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 transition-colors duration-500 rounded-t-xl" />

                          {project.featured && (
                            <div className="absolute top-4 right-4 z-10">
                              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                FEATURED
                              </span>
                            </div>
                          )}

                          {/* Tech stack icons overlay */}
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                             {project.tags.slice(0,4).map((tech, i) => {
                               const tagColor = getTagColor(tech);
                               const tagClass = getGlowByColor(tagColor);
                               return (
                                  <span key={i} className={`px-2 py-0.5 text-[10px] rounded border ${tagClass} backdrop-blur-sm truncate max-w-[80px]`}>
                                    {tech}
                                  </span>
                               )
                             })}
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors text-white">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                            {project.description}
                          </p>

                          {/* Action Buttons - Full Width */}
                          <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex gap-3">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-800/80 border border-gray-600/50 text-gray-300 rounded-lg font-medium hover:bg-gray-700 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300 text-sm relative z-20"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="w-4 h-4" /> Code
                              </a>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 relative overflow-hidden group/btn bg-gradient-to-r flex-col from-cyan-600 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 text-sm z-20"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                  <div className="flex items-center gap-2 flex-row"><ExternalLink className="w-4 h-4" /> Demo</div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </UnifiedCard>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default Projects