import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Calendar, MapPin, Award, BookOpen } from 'lucide-react'

const Education = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const education = [
    {
      degree: 'Pranveer Singh Institute Of Technology',
      school: 'B.Tech (Information Technology)',
      mascot: '🎓',
      year: '2022-2026',
      achievements: ['GPA: 6.8', 'Field: Information Technology'],
      skills: ['Operating system', 'Computer Networks', 'DataBase Management', 'OOPs', 'Big Data', 'Machine Learning'],
      description: 'Gained a solid foundation in computing concepts through hands-on labs, industry-oriented coursework, and collaborative projects.'
    },
    {
      degree: 'Dr Virendra Swarup Education Centre',
      school: '12th (CBSE)',
      mascot: '📖',
      year: '2021-2022',
      achievements: ['Percentage: 63.4%', 'Field: Science'],
      skills: ['Maths', 'Physics', 'Chemistry', 'Computer'],
      description: 'Gained strong foundational knowledge in Mathematics, Physics, and Chemistry, developing a keen analytical mindset and problem-solving approach.'
    },
    {
      degree: 'Dr Virendra Swarup Education Centre',
      school: '10th (CBSE)',
      mascot: '📖',
      year: '2019-2020',
      achievements: ['Percentage: 70.12%', 'Field: Science'],
      skills: ['Maths', 'Physics', 'Chemistry', 'Computer'],
      description: 'Gained strong foundational knowledge in Mathematics, Physics, and Chemistry, developing a keen analytical mindset and problem-solving approach.'
    }
  ]

  return (
    <div className={`min-h-screen relative overflow-hidden pt-24 pb-16 ${isDark ? 'bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90' : 'bg-gradient-to-b from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1]'}`}>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 page-element">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-on-scroll">
            Educational Journey
          </h1>
          <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} animate-on-scroll stagger-1`}>
            Discover how academic excellence shapes innovative thinking and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`animate-on-scroll stagger-${(index % 5) + 2} relative border rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDark ? 'bg-gray-900/50 border-gray-700 hover:border-teal-500' : 'bg-white/50 border-gray-200 hover:border-teal-500'
              } backdrop-blur-lg ${
                hoveredIndex === index ? 'border-teal-500 scale-[1.05] shadow-lg' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl animate-bounce">{edu.mascot}</span>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {edu.degree}
                    </h3>
                  </div>
                  <p className={`text-lg flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <BookOpen className="w-5 h-5 text-teal-500 animate-pulse" />
                    {edu.school}
                  </p>
                  <p className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar className="w-4 h-4 animate-pulse" />
                    {edu.year}
                  </p>
                </div>

                <p className={`text-sm italic border-l-2 border-teal-500 pl-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {edu.description}
                </p>

                <div className="space-y-3">
                  <h4 className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Award className="w-4 h-4 text-yellow-500 animate-pulse" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, achIndex) => (
                      <div
                        key={achIndex}
                        className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 flex items-center gap-2 text-sm hover:bg-teal-500/20 transition-all duration-300 hover:scale-105"
                      >
                        <Award className="w-4 h-4 animate-pulse" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105 animate-pulse"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education