import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { personalInfo } from '../data/personal'
import { SOCIAL_LINKS } from '../config/constants'

import { Github, ExternalLink, Code, Database, Zap, Star, Download } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    // Clean up any existing floating icon animations
    return () => {
      // Clear any existing animations
    }
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen pt-16 pb-16 overflow-hidden relative z-10">
      <Helmet>
        <title>Aryan Vishwakarma - Full Stack Developer Portfolio</title>
        <meta name="description" content="Passionate Full Stack Developer specializing in React, Node.js, and modern web technologies. Explore my projects in machine learning, web development, and innovative solutions." />
      </Helmet>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <span className="hero-glow inline-block px-6 py-3 glass rounded-full text-sm font-medium text-cyan-400 mb-6">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Name - Removed 3D Robot */}
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="hero-title text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
              <span className="hero-title-word">Hi,</span>{' '}
              <span className="hero-title-word">I&apos;m</span>{' '}
              <br className="lg:hidden" />
              <span className="hero-title-word">{profileData.name}</span>
            </h1>
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
                {/* Removed animate-pulse from profile background blob */}
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
              <div className="border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient">Hello, I&apos;m Aryan!</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  {profileData.about}
                </p>
                
                {/* Skills highlights */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {profileData.skills.map((skill, _index) => (
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
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section with glowing border effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {profileData.stats.map((stat, _index) => {
              const IconComponent = stat.icon === 'code' ? Code : 
                                  stat.icon === 'database' ? Database : 
                                  stat.icon === 'zap' ? Zap : Star
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md rounded-xl"
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