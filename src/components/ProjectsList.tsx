import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { projects } from '../data/projects';

interface Project {
  name: string;
  description: string;
  link: string;
  github: string;
  tags: string[];
}

interface ProjectsProps {
  projects?: Project[];
  title?: string;
  description?: string;
}

export default function ProjectsList({
  projects: projectsProp,
  title = "My Projects",
  description = "A showcase of my recent work and side projects that demonstrate my skills and passion for development."
}: ProjectsProps) {
  const projectsToUse = projectsProp || projects;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gradient">{title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {projectsToUse.map((project) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className="glass-card rounded-xl overflow-hidden hover-lift group"
            >
              <div className="relative h-64 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Eye className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-semibold">{project.name}</p>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}