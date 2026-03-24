import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion'
import { personalInfo } from '../data/personal'
import { aboutMe } from '../data/about'
import { SOCIAL_LINKS } from '../config/constants'
import { Github, ExternalLink, Code, Database, Zap, Star, Download, ChevronDown } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

// Sparkles Component for Photo Hover Effect
const Sparkles = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <AnimatePresence>
      {isHovered && Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0],
              x: Math.cos(angle) * (100 + Math.random() * 60),
              y: Math.sin(angle) * (100 + Math.random() * 60),
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full"
            style={{ boxShadow: '0 0 12px rgba(34,211,238,1)', pointerEvents: 'none' }}
          />
        )
      })}
    </AnimatePresence>
  );
};

const HoverSparklesWrapper = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="absolute inset-0 z-20 rounded-full cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <Sparkles isHovered={isHovered} />
    </div>
  );
};

// StatCard Component integrating CountUp and Gradient Border Fill
const StatCard = ({ stat }: { stat: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const spring = useSpring(0, { bounce: 0, duration: 1500 });
  
  const numericValue = parseInt(stat.number.replace(/\D/g, '')) || 0;
  const suffix = stat.number.replace(/\d/g, '');

  const IconComponent = stat.icon === 'Code' || stat.icon === 'code' ? Code : 
                        stat.icon === 'Database' || stat.icon === 'database' ? Database : 
                        stat.icon === 'Zap' || stat.icon === 'zap' ? Zap : Star;

  useEffect(() => {
    if (inView) {
      spring.set(numericValue);
    }
  }, [inView, spring, numericValue]);

  const [displayValue, setDisplayValue] = useState(0);
  const [progressWidth, setProgressWidth] = useState('0%');

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
      if (numericValue > 0) {
        setProgressWidth(`${Math.min(100, (latest / numericValue) * 100)}%`);
      } else {
        setProgressWidth('100%');
      }
    });
  }, [spring, numericValue]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -6, boxShadow: '0 0 30px rgba(6,182,212,0.4)', transition: { duration: 0.3 } }}
      className="relative text-center p-8 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md rounded-xl transition-colors duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: progressWidth }} />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex justify-center mb-4 relative z-10"
      >
        <IconComponent className="w-8 h-8 text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
      </motion.div>
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 relative z-10 drop-shadow-sm">
        {displayValue}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-400 uppercase tracking-wider relative z-10">{stat.label}</div>
    </motion.div>
  );
};

const roles = ['Full Stack Developer', 'React Engineer', 'Python Developer', 'AI Solutions Builder'];

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Role string cycle
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const profileData = {
    name: personalInfo.name,
    title: personalInfo.title,
    description: personalInfo.bio, 
    about: aboutMe.detailedDescription,
    skills: aboutMe.skills,
    stats: aboutMe.stats
  }

  const skillGroups = [
    { label: "Frontend", color: "cyan", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"] },
    { label: "Backend", color: "purple", skills: ["Node.js", "Express", "Python", "REST", "GraphQL", "WebSockets"] },
    { label: "Tools & Cloud", color: "blue", skills: ["MongoDB", "AWS", "Docker", "Git", "Java", "Linux"] }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan': return { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-300', shadow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]' };
      case 'purple': return { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-300', shadow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]' };
      case 'blue': return { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-300', shadow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]' };
      default: return { border: 'border-gray-500/30', bg: 'bg-gray-500/10', text: 'text-gray-300', shadow: '' };
    }
  }

  return (
    <main ref={containerRef} className="min-h-screen pt-16 pb-16 overflow-hidden relative z-10">
      <Helmet>
        <title>Aryan Vishwakarma - Full Stack Developer Portfolio</title>
        <meta name="description" content="Passionate Full Stack Developer specializing in React, Node.js, and modern web technologies. Explore my projects in machine learning, web development, and innovative solutions." />
        <link rel="canonical" href="https://vishwakarma-31-portfolio.vercel.app/" />
        <meta property="og:url" content="https://vishwakarma-31-portfolio.vercel.app/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center w-full relative">
          
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full" />
            <span className="relative inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-shimmer overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulse-online_2s_infinite] shrink-0" />
              <span className="relative z-10">Welcome to my portfolio</span>
            </span>
          </div>

          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="hero-title text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center leading-tight">
              Hi, I&apos;m <br className="md:hidden" />
              {profileData.name}
            </h1>
          </div>

          {/* Role cycler */}
          <div className="h-12 mb-8 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[roleIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-2xl md:text-3xl font-medium text-blue-300 tracking-wide"
              >
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {profileData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
             <Link
                to="/projects"
                className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                View My Work
              </Link>
              <Link
                to="/contact"
                className="border-2 border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400/80 bg-cyan-950/20 px-8 py-4 rounded-xl font-semibold hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:-translate-y-1 transition-all duration-300 inline-block"
              >
                Get In Touch
              </Link>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full border border-cyan-500/30 text-gray-400 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 bg-black/50 backdrop-blur-sm"
            >
              <Github size={24} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-xs px-2 py-1 rounded border border-gray-600 text-white pointer-events-none">GitHub</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full border border-cyan-500/30 text-gray-400 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 bg-black/50 backdrop-blur-sm"
            >
              <ExternalLink size={24} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-xs px-2 py-1 rounded border border-gray-600 text-white pointer-events-none">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 opacity-70" />
        </motion.div>
      </section>

      {/* About Me Section - Dark Sci-Fi Redesign */}
      <section id="about" className="min-h-screen py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16">
            
            {/* ROW 1: Hero Identity */}
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              
              {/* Rotating Photo Ring with Intensive Glow & Sparkles */}
              <motion.div 
                className="relative cursor-pointer"
                initial="rest"
                whileHover="hover"
              >
                <div className="absolute inset-x-0 -bottom-8 h-32 bg-cyan-500/20 blur-[50px] rounded-full pointer-events-none" />
                
                <motion.div 
                  variants={{
                    rest: { boxShadow: '0 0 30px rgba(6,182,212,0.4)', scale: 1 },
                    hover: { boxShadow: '0 0 80px rgba(6,182,212,0.9)', scale: 1.05 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-[180px] h-[180px] rounded-full p-2 relative z-10"
                  style={{ background: 'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #3b82f6, #06b6d4)' }}
                >
                  <div className="absolute inset-0 rounded-full bg-transparent animate-conic-spin" style={{ background: 'inherit' }} />
                  <div className="w-full h-full rounded-full overflow-hidden bg-black p-1 relative z-10">
                    <img
                      src="/images/Aryan.jpeg"
                      alt={profileData.name}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
                
                {/* Hover Particle Wrapper overlayed directly on the ring */}
                <HoverSparklesWrapper />
              </motion.div>

              {/* Concise Bio */}
              <p className="text-xl text-gray-300 max-w-2xl px-4 leading-relaxed mt-4">
                 {profileData.description} Bringing ideas to life through robust architecture and pixel-perfect design.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 w-full sm:w-auto">
                <button
                  className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-400/50"
                  onClick={() => window.open('/Aryan_Resume.pdf', '_blank')}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                  <Download className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </button>
                <Link
                  to="/projects"
                  className="px-8 py-3.5 rounded-xl border border-purple-500/50 text-purple-300 font-bold hover:bg-purple-500/10 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* C5: Decorative Divider */}
            <div className="w-[60%] mx-auto h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-16 opacity-70" />

            {/* ROW 2: Skills Showcase */}
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">
               <motion.div
                 initial="hidden"
                 whileInView="show"
                 viewport={{ once: true, margin: "-50px" }}
                 variants={{
                   hidden: { opacity: 0 },
                   show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                 }}
                 className="flex flex-col gap-6"
               >
                 {skillGroups.map((group) => {
                   const colors = getColorClasses(group.color);
                   const accentColor = group.color === 'cyan' ? 'bg-cyan-400' : group.color === 'purple' ? 'bg-purple-400' : 'bg-blue-400';
                   const accentShadow = group.color === 'cyan' ? 'shadow-[0_0_8px_rgba(6,182,212,0.8)]' : group.color === 'purple' ? 'shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'shadow-[0_0_8px_rgba(59,130,246,0.8)]';
                   
                   return (
                    <motion.div 
                      key={group.label}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        show: { opacity: 1, x: 0, transition: { staggerChildren: 0.05 } }
                      }}
                      className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 bg-black/20 p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 w-40 shrink-0 justify-center md:justify-start">
                        <div className={`w-2.5 h-2.5 rounded-full ${accentColor} ${accentShadow} animate-pulse`} />
                        <h3 className={`text-xs uppercase tracking-[0.2em] font-bold ${colors.text}`}>{group.label}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {group.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              show: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.08, boxShadow: `0 0 12px ${group.color === 'cyan' ? 'rgba(6,182,212,0.6)' : group.color === 'purple' ? 'rgba(168,85,247,0.6)' : 'rgba(59,130,246,0.6)'}` }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${colors.border} ${colors.bg} ${colors.text} transition-all duration-300 cursor-default`}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                   );
                 })}
               </motion.div>
            </div>

            {/* ROW 3: Stats (C4) */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-6xl mx-auto"
            >
              {profileData.stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default Home