import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useGSAPAnimations } from '../hooks/useGSAPAnimations'
import { MagneticButton } from '../components/MagneticButton'

import { Github, ExternalLink, Code, Palette, Database, Zap, Sparkles, Star, Download } from 'lucide-react'
import { gsap } from 'gsap'
// ScrollTrigger plugin is registered globally in App.tsx

const Home = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const containerRef = useRef(null)
  const gsapRef = useGSAPAnimations()

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

  useEffect(() => {
    // Only run animations if we're on the home page to prevent conflicts during page transitions
    if (window.location.pathname !== '/') return

    const ctx = gsap.context(() => {
      // Simple floating icons animation - only for home page
      gsap.to('.floating-icon', {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 6)',
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: 'random'
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const floatingIcons = [
    { Icon: Code, delay: 0, position: 'top-20 left-10', color: 'text-blue-400' },
    { Icon: Palette, delay: 1, position: 'top-32 right-20', color: 'text-purple-400' },
    { Icon: Database, delay: 2, position: 'bottom-32 left-20', color: 'text-green-400' },
    { Icon: Zap, delay: 3, position: 'bottom-20 right-10', color: 'text-yellow-400' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen pt-16 pb-16 overflow-hidden relative z-10">
      {/* Background handled by interactive starfield on Home */}

      {/* Floating Icons */}
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

      <motion.div
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          <div className="mb-8 page-element animate-on-scroll">
            <span className="hero-glow inline-block px-6 py-3 glass rounded-full text-sm font-medium text-cyan-400 mb-6 animate-glow">
              👋 Welcome to my portfolio
            </span>
          </div>

          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent page-element animate-on-scroll stagger-1">
            <span className="hero-title-word">Hi,</span>{' '}
            <span className="hero-title-word">I'm</span>{' '}
            <span className="hero-title-word">Aryan Vishwakarma</span>
          </h1>

          <p className={`hero-description text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-2xl mx-auto page-element animate-on-scroll stagger-2`}>
            A passionate Full Stack Developer creating amazing digital experiences with modern technologies
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12 page-element animate-on-scroll stagger-3">
            <MagneticButton>
              <Link
                to="/projects"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 inline-block"
              >
                View My Work
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className={`border-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Get In Touch
              </Link>
            </MagneticButton>
          </div>

          <div className="flex justify-center space-x-6 page-element animate-on-scroll stagger-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors p-3 rounded-full hover:bg-white/10`}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors p-3 rounded-full hover:bg-white/10`}
            >
              <ExternalLink size={24} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
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
      </motion.div>

      {/* About Me Section */}
      <section className="min-h-screen flex items-center justify-center relative z-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto leading-relaxed`}>
              Passionate about creating digital experiences that matter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Aryan Vishwakarma"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating icons around image */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center"
                >
                  <Palette className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-card p-8 rounded-2xl glow-border-enter">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Hello, I'm Aryan!</h3>
                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  I'm a passionate Full Stack Developer with a love for creating beautiful, functional, and scalable web applications. 
                  With expertise in modern technologies and a keen eye for design, I transform ideas into digital realities.
                </p>
                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, 
                  or sharing knowledge with the developer community. I believe in continuous learning and staying ahead of the curve.
                </p>
                
                {/* Skills highlights */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-sm font-medium border border-cyan-400/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </motion.button>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-center border-2 ${
                      isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Let's Connect
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { number: '3+', label: 'Years Coding', icon: Code },
              { number: '15+', label: 'Projects Built', icon: Database },
              { number: '8+', label: 'Technologies', icon: Zap },
              { number: '100%', label: 'Passion', icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center glass-card p-6 rounded-xl hover-lift glow-border-enter"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home