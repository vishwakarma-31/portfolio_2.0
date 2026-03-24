import React from 'react'
import UnifiedCard from '../components/UnifiedCard'
import { Helmet } from 'react-helmet-async'
import { GraduationCap, BookOpen, Calendar, MapPin, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const Education = () => {
  const education = [
    {
      degree: 'B.Tech in Information Technology',
      institution: 'Pranveer Singh Institute Of Technology',
      period: '2022 - 2026',
      score: '6.2 CGPA',
      location: 'Kanpur, India',
      description: 'Gained a solid foundation in computing concepts through hands-on labs, industry-oriented coursework, and collaborative projects. Core subjects include Operating Systems, OOPs, Big Data, and Machine Learning.'
    },
    {
      degree: 'Class XII (Science - CBSE)',
      institution: 'Jai Narayan Vidhya Mandir Inter College',
      period: '2021 - 2022',
      score: '56.5%',
      location: 'Kanpur, India',
      description: 'Gained strong foundational knowledge in Mathematics, Physics, and Chemistry, developing a keen analytical mindset and problem-solving approach.'
    },
    {
      degree: 'Class X (Science - UP Board)',
      institution: 'Jai Narayan Vidhya Mandir Inter College',
      period: '2019 - 2020',
      score: '74.5%',
      location: 'Kanpur, India',
      description: 'Built a strong academic foundation with a focus on core sciences and mathematics, consistently demonstrating academic dedication.'
    }
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100 relative z-10">
      <Helmet>
        <title>Education - Aryan Vishwakarma</title>
        <meta name="description" content="Educational background including B.Tech in CSE from KIIT." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Education
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My academic foundation and continuous learning journey
          </p>
        </div>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-10 md:left-[3.25rem] top-8 bottom-8 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-fuchsia-500 rounded-full opacity-30 shadow-[0_0_15px_rgba(168,85,247,0.5)] hidden md:block" />

          <div className="space-y-16">
            {education.map((item, index) => (
              <div key={index} className="relative md:pl-[8rem]">
                {/* Milestone Node */}
                <div className="absolute left-[2.9rem] top-12 w-4 h-4 rounded-full bg-black border-[3px] border-purple-400 z-10 shadow-[0_0_10px_rgba(192,132,252,0.8)] hidden md:block group-hover:scale-125 transition-transform" />

                <UnifiedCard
                  animationType="education"
                  index={index}
                  glowColor="purple"
                  className="w-full relative group"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                      <div className="flex gap-5 items-start">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-inner">
                          {index === 0 ? <GraduationCap className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {item.degree}
                          </h3>
                          <h4 className="text-xl font-medium text-gray-300 mb-1">
                            {item.institution}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Stat Pill */}
                      <div className="shrink-0 flex self-start bg-black/50 border border-purple-500/40 rounded-xl px-5 py-2.5 items-center gap-2 text-purple-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                        <Award className="w-5 h-5 text-purple-400" />
                        <span className="font-bold tracking-wide text-lg">{item.score}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400 border-b border-gray-800 pb-8">
                      <div className="flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-lg border border-gray-800">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="font-medium text-gray-300">{item.period}</span>
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-lg border border-gray-800">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span className="font-medium text-gray-300">{item.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 leading-relaxed text-lg font-light">
                      {item.description}
                    </p>
                  </div>
                </UnifiedCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Education