import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Award, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const Experience = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const certifications = [
    {
      title: 'JavaScript Certification',
      company: 'Infosys SpringBoard',
      period: '2025',
      description: 'Proactively mastered core JavaScript concepts and best practices through the Infosys SpringBoard curriculum.',
      icon: Award,
      type: 'Certification',
      certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
      skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming']
    },
    {
      title: 'AWS Cloud Practitioner Essentials',
      company: 'AWS',
      period: '2024',
      description: 'Developed a strong understanding of how to leverage the AWS Cloud to build secure, scalable, and cost-effective solutions.',
      icon: Award,
      type: 'Certification',
      certificateUrl: 'https://drive.google.com/file/d/1oKmAMkW8IK9nCcP0gqkmTb-CY35GxTe4/view?usp=drive_link',
      skills: ['AWS Cloud', 'EC2', 'S3', 'Cloud Architecture']
    },
    {
      title: 'HTML5 Certification',
      company: 'Infosys SpringBoard',
      period: '2025',
      description: 'Certified in HTML5 and web fundamentals through the Infosys SpringBoard program.',
      icon: Award,
      type: 'Certification',
      certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
      skills: ['HTML5', 'Semantic HTML', 'Web Standards', 'Accessibility']
    },
    {
      title: 'Introduction To Artificial Intelligence',
      company: 'Coursera',
      period: '2025',
      description: 'Gained a solid understanding of fundamental AI principles, including machine learning, neural networks, and natural language processing.',
      icon: Award,
      type: 'Certification',
      certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
      skills: ['Machine Learning', 'Neural Networks', 'NLP', 'AI Ethics']
    },
    {
      title: 'Oracle Cloud Infrastructure AI Foundations',
      company: 'Oracle',
      period: '2025',
      description: 'Gained practical skills in leveraging OCI AI and Machine Learning services to build and deploy intelligent applications.',
      icon: Award,
      type: 'Certification',
      certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
      skills: ['OCI', 'AI Services', 'ML Deployment', 'Cloud AI']
    },
    {
      title: 'Oracle Cloud Infrastructure DevOps Professional',
      company: 'Oracle',
      period: '2025',
      description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
      icon: Award,
      type: 'Certification',
      certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
      skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation']
    }
  ]



  return (
    <div className={`min-h-screen relative overflow-hidden pt-24 pb-16 ${isDark ? 'bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90' : 'bg-gradient-to-b from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1]'}`}>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Certifications
          </h1>
          <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Professional Certifications and achievements in technology and development
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group h-full transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${
                  isDark 
                    ? 'bg-[#090F1C]/80 border-gray-700 hover:shadow-blue-500/30' 
                    : 'bg-white/90 border-gray-200 hover:shadow-blue-500/20'
                } shadow-zinc-950/5 rounded-xl p-6 relative overflow-hidden border cursor-pointer`}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    {item.certificateUrl && (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                          isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-500 hover:text-cyan-600'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-cyan-400 transition-colors`}>
                    {item.title}
                  </h3>
                  
                  <p className={`font-medium mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {item.company}
                  </p>
                  
                  <div className={`flex items-center gap-4 mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                    {/* Location removed: item.location does not exist on type */}
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>


                  {/* Skills */}
                  {item.skills && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-full ${
                            isDark 
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                              : 'bg-cyan-500/10 text-cyan-700 border border-cyan-500/20'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400/30 transition-all duration-300"></div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Experience