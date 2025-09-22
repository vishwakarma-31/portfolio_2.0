import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Calendar, MapPin, Award, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Education = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  });

  const education = [
    {
      degree: 'Pranveer Singh Institute Of Technology',
      school: 'B.Tech (Information Technology)',
      mascot: '🎓',
      year: '2022-2026',
      achievements: ['GPA: 6.2', 'Field: Information Technology'],
      skills: ['Operating system', 'Computer Networks', 'DataBase Management', 'OOPs', 'Big Data', 'Machine Learning'],
      description: 'Gained a solid foundation in computing concepts through hands-on labs, industry-oriented coursework, and collaborative projects.'
    },
    {
      degree: 'Jai Narayan Vidhya Mandir Inter College',
      school: '12th (CBSE)',
      mascot: '📖',
      year: '2021-2022',
      achievements: ['Percentage: 56.5%', 'Field: Science'],
      skills: ['Maths', 'Physics', 'Chemistry', 'Computer'],
      description: 'Gained strong foundational knowledge in Mathematics, Physics, and Chemistry, developing a keen analytical mindset and problem-solving approach.'
    },
    {
      degree: 'Jai Narayan Vidhya Mandir Inter College',
      school: '10th (UP)',
      mascot: '📖',
      year: '2019-2020',
      achievements: ['Percentage: 74.5%', 'Field: Science'],
      skills: ['Maths', 'Physics', 'Chemistry', 'Computer'],
      description: 'Gained strong foundational knowledge in Mathematics, Physics, and Chemistry, developing a keen analytical mindset and problem-solving approach.'
    }
  ]

  return (
    <div className={`min-h-screen relative overflow-hidden pt-24 pb-16 relative z-10 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 page-element">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-on-scroll">
            Educational Journey
          </h1>
          <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} animate-on-scroll stagger-1`}>
            Discover how academic excellence shapes innovative thinking and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={containerRef as any}>
          {education.map((edu, index) => (
            <UnifiedCard
              key={index}
              animationType="education"
              index={index}
              className={`
                h-full transition-all duration-300
                ${hoveredIndex === index ? 'border-teal-500 scale-[1.02] shadow-lg' : ''}
              `}
              onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
            >
              <div 
                className="p-8 space-y-6"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <motion.span 
                      className="text-3xl"
                      animate={{ 
                        rotateY: hoveredIndex === index ? 360 : 0,
                        scale: hoveredIndex === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {edu.mascot}
                    </motion.span>
                    <motion.h3 
                      className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {edu.degree}
                    </motion.h3>
                  </div>
                  <motion.p 
                    className={`text-lg flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: hoveredIndex === index ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <BookOpen className="w-5 h-5 text-teal-500" />
                    </motion.div>
                    {edu.school}
                  </motion.p>
                  <motion.p 
                    className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Calendar className="w-4 h-4" />
                    {edu.year}
                  </motion.p>
                </div>

                <motion.p 
                  className={`text-sm italic border-l-2 border-teal-500 pl-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {edu.description}
                </motion.p>

                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h4 className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Award className="w-4 h-4 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, achIndex) => (
                      <motion.div
                        key={achIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + achIndex * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 flex items-center gap-2 text-sm hover:bg-teal-500/20 transition-all duration-300 cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {edu.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </UnifiedCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education