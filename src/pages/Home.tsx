import { useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
// Remove framer-motion imports that are only used for animations
import SplineWrapper from '../components/SplineWrapper'
import { AnimationService } from '../services/animationService'
import { PerformanceService } from '../services/performanceService'
import { personalInfo } from '../data/personal'
import { SOCIAL_LINKS } from '../config/constants'

import { Github, ExternalLink, Code, Database, Zap, Star, Download } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
// ScrollTrigger plugin is registered globally in App.tsx

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const performanceService = useMemo(() => new PerformanceService(), [])
  // Map personalInfo to match expected structure
  const profileData = {
    name: personalInfo.name,
    title: personalInfo.title,
    description: personalInfo.bio, // Map bio to description
    about: personalInfo.bio, // Use bio for about as well
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Git', 'GitHub', 'Docker', 'AWS', 'GraphQL', 'REST', 'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java'],
    stats: [
      { number: '2+', label: 'Years Coding', icon: 'code' },
      { number: '10+', label: 'Projects Built', icon: 'database' },
      { number: '15+', label: 'Technologies', icon: 'zap' },
      { number: '100%', label: 'Passion', icon: 'star' }
    ]
  }

  // Remove parallax scroll logic
  /*
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const springY = useSpring(y, { stiffness: 300, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 300, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 })
  */

  useEffect(() => {
    const operation = () => {
      // Only run animations if we're on the home page to prevent conflicts during page transitions
      if (window.location.pathname !== '/') return

      const ctx = AnimationService.initializeFloatingIcons(containerRef)
      
      return () => {
        if (ctx) {
          AnimationService.cleanupContext(ctx)
        }
      }
    }
    
    performanceService.measureOperation('home-page-mount', operation)
  }, [performanceService])

  // Remove floatingIcons array
  /*
  const floatingIcons = [
    { Icon: Code, delay: 0, position: 'top-20 left-10', color: 'text-blue-400' },
    { Icon: Palette, delay: 1, position: 'top-32 right-20', color: 'text-purple-400' },
    { Icon: Database, delay: 2, position: 'bottom-32 left-20', color: 'text-green-400' },
    { Icon: Zap, delay: 3, position: 'bottom-20 right-10', color: 'text-yellow-400' },
  ]
  */

  return (
    <main ref={containerRef} className="min-h-screen pt-16 pb-16 overflow-hidden relative z-10">
      <Helmet>
        <title>Aryan Vishwakarma - Full Stack Developer Portfolio</title>
        <meta name="description" content="Passionate Full Stack Developer specializing in React, Node.js, and modern web technologies. Explore my projects in machine learning, web development, and innovative solutions." />
      </Helmet>
      {/* Background handled by interactive starfield on Home */}

      {/* Remove floating icons */}
      {/* 
      {floatingIcons.map(({ Icon, delay, position, color }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`floating-icon absolute ${position} hidden lg:block`}
        >
          <Icon className={`w-8 h-8 ${color} animate-pulse`} />
        </motion.div>
      ))}
      */}

      {/* Remove parallax styling */}
      <div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          <div className="mb-8">
            <span className="hero-glow inline-block px-6 py-3 glass rounded-full text-sm font-medium text-cyan-400 mb-6">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Name and 3D Robot Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center mb-6">
            <h1 className="hero-title text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent lg:text-right">
              <span className="hero-title-word">Hi,</span>{' '}
              <span className="hero-title-word">I&apos;m</span>{' '}
              <br className="lg:hidden" />
              <span className="hero-title-word">{profileData.name}</span>
            </h1>
            
            {/* 3D Spline Robot */}
            <div
              className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden"
            >
              <SplineWrapper
                scene="/models/robot.splinecode"
                className="w-96 h-96"
              />
            </div>
          </div>

          <p className="hero-description text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {profileData.description}
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div>
              <Link
                to="/projects"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 inline-block"
              >
                View My Work
              </Link>
            </div>
            <div>
              <Link
                to="/contact"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            >
              <Github size={24} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div> */}

      {/* About Me Section */}
      <section className="min-h-screen flex items-center justify-center relative z-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating digital experiences that matter
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                  <img
                    src="/images/Aaryannn.jpg"
                    alt={`${profileData.name} - ${profileData.title} professional portrait`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-2xl glow-border-enter">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Hello, I&apos;m Aryan!</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  {profileData.about}
                </p>
                
                {/* Skills highlights */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {profileData.skills.map((skill, _index) => (
                    // Remove motion effects from skill tags
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-sm font-medium border border-cyan-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="btn-primary flex items-center gap-3"
                    onClick={() => window.open('/Aryan_Resume.pdf', '_blank')}
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </button>
                  {/* <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center border-2 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Let&apos;s Connect
                  </motion.a> */}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {profileData.stats.map((stat, _index) => {
              const IconComponent = stat.icon === 'code' ? Code : 
                                  stat.icon === 'database' ? Database : 
                                  stat.icon === 'zap' ? Zap : Star
              return (
                <div
                  key={stat.label}
                  className="text-center glass-card p-6 rounded-xl"
                >
                  <IconComponent className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home