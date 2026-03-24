import React, { useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, AlertTriangle, BookOpen, Github, ExternalLink, Activity, Users, Zap, Calendar, Target, Layers } from 'lucide-react';
import { projects } from '../data/projects';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useSpring } from 'framer-motion';

// Inline CountUp Component for Metrics
const CountUp = ({ valueString }: { valueString: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });
  
  const numericMatch = valueString.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = valueString.substring(0, valueString.indexOf(numericMatch?.[0] || ''));
  const suffix = valueString.substring(valueString.indexOf(numericMatch?.[0] || '') + (numericMatch?.[0].length || 0));

  const spring = useSpring(0, { bounce: 0, duration: 2000 });

  useEffect(() => {
    if (inView) {
      spring.set(numericValue);
    }
  }, [inView, spring, numericValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (nodeRef.current) {
        const isDecimal = numericValue % 1 !== 0;
        nodeRef.current.textContent = isDecimal ? latest.toFixed(1) : Math.round(latest).toString();
      }
    });
  }, [spring, numericValue]);

  return <span>{prefix}<span ref={nodeRef}>0</span>{suffix}</span>;
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === projectId);
  
  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);
  if (!project) {
    return null;
  }
  
  return (
    <main className="min-h-screen pt-24 pb-24 text-slate-100 relative overflow-hidden">
      <Helmet>
        <title>{project.title} - Aryan Vishwakarma</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none opacity-50" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button as solid pill */}
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-cyan-900/30 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-100 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-10 transition-all duration-300 group backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
          <span className="font-semibold tracking-wide text-sm uppercase">Back to Projects</span>
        </Link>
        
        {/* Project Header */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent leading-tight"
            >
              {project.title}
            </motion.h1>
            {project.featured && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/50 text-cyan-300 text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse"
              >
                Featured Project
              </motion.span>
            )}
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-10 max-w-4xl leading-relaxed font-light"
          >
            {project.longDescription || project.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-10 border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-md group"
          >
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />
              
              {/* Action Buttons Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3 px-6 bg-black/50 backdrop-blur-md border border-gray-500 text-white rounded-xl font-bold hover:bg-gray-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  <span>Source Code</span>
                </a>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 border border-transparent text-white rounded-xl font-bold hover:from-cyan-500 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 overflow-hidden relative group/btn"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Project Metrics & Info */}
        <div className="mb-16">
           <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Info Cards */}
              <div className="flex flex-wrap md:flex-nowrap gap-4 w-full lg:w-auto">
                 <div className="flex flex-col justify-center p-5 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm min-w-[140px] flex-1">
                    <Target className="w-5 h-5 text-gray-500 mb-2" />
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Category</span>
                    <span className="text-white font-medium capitalize">{project.category}</span>
                 </div>
                 <div className="flex flex-col justify-center p-5 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm min-w-[140px] flex-1">
                    <Layers className="w-5 h-5 text-gray-500 mb-2" />
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Status</span>
                    <span className="text-white font-medium capitalize">{project.status}</span>
                 </div>
                 <div className="flex flex-col justify-center p-5 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm min-w-[160px] flex-1">
                    <Calendar className="w-5 h-5 text-gray-500 mb-2" />
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Timeline</span>
                    <span className="text-white font-medium capitalize">{project.timeline}</span>
                 </div>
              </div>

              {/* Dynamic Metrics */}
              {project.metrics && (
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.metrics.accuracy && (
                      <div className="flex flex-col justify-center p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                        <Activity className="w-5 h-5 text-cyan-400 mb-2 opacity-70" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Accuracy</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"><CountUp valueString={project.metrics.accuracy} /></span>
                      </div>
                    )}
                    {project.metrics.users && (
                      <div className="flex flex-col justify-center p-5 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                        <Users className="w-5 h-5 text-purple-400 mb-2 opacity-70" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Active Users</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"><CountUp valueString={project.metrics.users} /></span>
                      </div>
                    )}
                    {project.metrics.performance && (
                      <div className="flex flex-col justify-center p-5 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
                        <Zap className="w-5 h-5 text-green-400 mb-2 opacity-70" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Performance</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"><CountUp valueString={project.metrics.performance} /></span>
                      </div>
                    )}
                </div>
              )}
           </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
             <Layers className="w-6 h-6 text-cyan-400" /> Technical Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-black/40 border border-gray-800">
              <h3 className="font-bold mb-4 text-cyan-400 text-sm tracking-wider uppercase">Frontend</h3>
              <div className="flex flex-col gap-2">
                {project.technologies.frontend.map((tech, i) => (
                  <span key={i} className="text-gray-300 font-medium flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-gray-800">
              <h3 className="font-bold mb-4 text-purple-400 text-sm tracking-wider uppercase">Backend</h3>
              <div className="flex flex-col gap-2">
                {project.technologies.backend.map((tech, i) => (
                  <span key={i} className="text-gray-300 font-medium flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-gray-800">
              <h3 className="font-bold mb-4 text-amber-400 text-sm tracking-wider uppercase">Database</h3>
              <div className="flex flex-col gap-2">
                {project.technologies.database.map((tech, i) => (
                  <span key={i} className="text-gray-300 font-medium flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-gray-800">
              <h3 className="font-bold mb-4 text-green-400 text-sm tracking-wider uppercase">Tools</h3>
              <div className="flex flex-col gap-2">
                {project.technologies.tools.map((tech, i) => (
                  <span key={i} className="text-gray-300 font-medium flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Features (Full width) */}
        <div className="p-8 md:p-10 rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-b from-cyan-900/20 to-black/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(6,182,212,0.15)] relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-cyan-500/20 rounded-xl shadow-inner border border-cyan-500/30">
               <Star className="w-7 h-7 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-cyan-900/40 transition-colors">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_currentColor]"></div>
                <span className="text-gray-200 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Challenges and Learnings Paired */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Challenges (Orange) */}
          <div className="p-8 rounded-3xl border-2 border-orange-500/20 bg-gradient-to-b from-orange-900/10 to-black/40 backdrop-blur-xl hover:border-orange-500/40 transition-colors relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-orange-500/20 rounded-xl shadow-inner border border-orange-500/30">
                 <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Challenges Overcome</h2>
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-orange-950/20 border border-orange-500/10">
                  <div className="mt-2 w-1.5 h-1.5 rounded-sm bg-orange-400 flex-shrink-0"></div>
                  <span className="text-gray-300 leading-relaxed">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Learnings (Purple) */}
          <div className="p-8 rounded-3xl border-2 border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-black/40 backdrop-blur-xl hover:border-purple-500/50 transition-colors shadow-[0_10px_30px_rgba(168,85,247,0.1)] relative overflow-hidden h-full">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-purple-500/20 rounded-xl shadow-inner border border-purple-500/30">
                 <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Key Takeaways</h2>
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              {project.learnings.map((learning, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <div className="mt-2 w-1.5 h-1.5 rounded-sm bg-purple-400 flex-shrink-0"></div>
                  <span className="text-gray-300 leading-relaxed">{learning}</span>
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
