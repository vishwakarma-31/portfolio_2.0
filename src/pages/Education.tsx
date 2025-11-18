import React from 'react'
import { Calendar, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Helmet } from 'react-helmet-async'

const Education = () => {
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
    <main className="min-h-screen relative overflow-hidden pt-24 pb-16 text-slate-100">
      <Helmet>
        <title>Education - Aryan Vishwakarma</title>
        <meta name="description" content="Explore my educational background and academic achievements in Information Technology and Computer Science." />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Education
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            My educational journey and academic achievements
          </p>
        </motion.div>

        {/* Education Cards */}
        <div 
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {education.map((item, index) => (
            <UnifiedCard
              key={index}
              animationType="education"
              index={index}
              className="h-full"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-4 animate-bounce">
                    {item.mascot}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{item.year}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors text-white">
                  {item.degree}
                </h3>
                
                <p className="font-medium mb-4 text-purple-400">
                  {item.school}
                </p>
                
                {item.achievements && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Achievements:</h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                          <Award className="w-3 h-3 text-yellow-400" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <p className="text-sm leading-relaxed mb-4 text-gray-300">
                  {item.description}
                </p>

                {/* Skills */}
                {item.skills && (
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 py-1 text-xs rounded-full transition-all duration-200 bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </UnifiedCard>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Education