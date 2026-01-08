import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, AlertTriangle, BookOpen, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { Helmet } from 'react-helmet-async';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  // Find the project by ID
  const project = projects.find(p => p.id === projectId);
  
  // If project not found, navigate after mount to avoid navigation during render
  React.useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);
  if (!project) {
    return null;
  }
  
  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100">
      <Helmet>
        <title>{project.title} - Aryan Vishwakarma</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </Link>
        
        {/* Project Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            {/* {project.featured && (
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                Featured
              </span>
            )} */}
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            {project.longDescription || project.description}
          </p>
          
          {/* Project Image */}
          <div className="rounded-xl overflow-hidden mb-8 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 px-6 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>View Source Code</span>
            </a>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
        
        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Technologies */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-white">Technologies Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-cyan-400">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.frontend.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-cyan-400">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.backend.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-cyan-400">Database</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.database.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-cyan-400">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-green-500/20 text-green-300 border border-green-500/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Metrics & Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Project Info</h2>
            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md">
                <h3 className="font-semibold mb-3 text-gray-200">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category</span>
                    <span className="text-white capitalize">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white capitalize">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline</span>
                    <span className="text-white">{project.timeline}</span>
                  </div>
                </div>
              </div>
              
              {project.metrics && (
                <div className="p-5 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md">
                  <h3 className="font-semibold mb-3 text-gray-200">Metrics</h3>
                  <div className="space-y-3">
                    {project.metrics.accuracy && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy</span>
                        <span className="text-cyan-400 font-medium">{project.metrics.accuracy}</span>
                      </div>
                    )}
                    {project.metrics.users && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Users</span>
                        <span className="text-cyan-400 font-medium">{project.metrics.users}</span>
                      </div>
                    )}
                    {project.metrics.performance && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Performance</span>
                        <span className="text-cyan-400 font-medium">{project.metrics.performance}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Features, Challenges, Learnings */}
        <div className="space-y-12">
          {/* Features */}
          <div className="p-6 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-cyan-500/10">
                  <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Challenges */}
          <div className="p-6 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Challenges</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-orange-500/10">
                  <div className="mt-1 w-2 h-2 rounded-full bg-orange-400 flex-shrink-0"></div>
                  <span className="text-gray-200">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Learnings */}
          <div className="p-6 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Learnings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.learnings.map((learning, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span className="text-gray-200">{learning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
