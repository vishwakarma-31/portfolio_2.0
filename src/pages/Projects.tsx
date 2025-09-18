import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Github, ExternalLink } from 'lucide-react'

const Projects = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const projects = [
    {
      title: 'Cropify',
      description: 'Developed a crop recommendation system that suggests the most suitable crop based on input parameters like soiltype,pH,temperature,humidity and rainfall.',
      tags: ['Vapi', 'Next.js', 'Web Development'],
      links: {
        github: 'https://github.com/Aryan2764/Cropify-ML',
        // demo: 'https://ai-voice-mock-interview-preparation-yh-krishs-projects-f5177f25.vercel.app/sign-in'
      },
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      featured: true
    },
    {
      title: 'Full Stack Movie Ticket Booking System',
      description: ' It provides a seamless interface for users to browse movies, check showtimes, select seats, and securely book tickets online. The system features a user-friendly frontend for customers and a robust backend for managing movie listings, showtimes, and booking data',
      tags: ['Next.js', 'Inngest', 'Clerk', 'vercel'],
      links: {
        github: 'https://github.com/Aryan2764/Movie-Booking-System',
        // demo: 'https://ai-finance-tracker-phi.vercel.app/'
      },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      featured: true
    },
    {
      title: 'Fake Fingerprint Detection',
      description: 'This project is a machine learning-based system designed to enhance biometric security by distinguishing between live and fake fingerprints it analyzes textural and structural features of a fingerprint image to classify it as either authentic or fraudulent.',
      tags: ['Next.js', 'Prisma', 'Clerk', 'Gemini AI'],
      links: {
        github: 'https://github.com/101krish/Sensei',
        demo: 'https://sensei-448g.vercel.app/'
      },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      featured: true
    }
  ]

  return (
    <div className={`pt-24 pb-16 min-h-screen p-8 relative z-10 ${isDark ? 'bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-slate-100' : 'bg-gradient-to-b from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900'}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`animate-on-scroll stagger-${(index % 5) + 1} flex flex-col md:flex-row items-center group rounded-lg p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-[length:400%_400%] animate-gradient-xy hover:bg-[length:100%_100%] transition-all duration-700 shadow-lg hover:shadow-2xl`}
          >
            <div className="md:w-1/2 overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className={`md:w-1/2 rounded-lg overflow-hidden shadow-md transition-transform duration-500 group-hover:scale-105 p-6 glow-border-enter ${isDark ? 'bg-gradient-to-br from-slate-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-100'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wide uppercase animate-pulse">
                    Featured Project
                  </div>
                  <h2 className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                    {project.title}
                  </h2>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.links.github}
                    className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href={project.links.demo}
                    className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 hover:-rotate-12"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={22} />
                  </a>
                </div>
              </div>

              <p className={`mb-6 text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 animate-pulse"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects