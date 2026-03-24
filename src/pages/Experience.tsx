import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import React from 'react'

const Experience = () => {
  const { ref: containerRef } = useScrollReveal();

  const experiences = [
    {
      title: 'React.js Developer Intern',
      company: 'AIGETAI Pvt. Ltd.',
      initials: 'AI',
      location: 'Remote',
      period: 'June 2025 - Dec 2025',
      description: 'Completed a comprehensive internship focusing on React.js development. Demonstrated active engagement and competence in executing assigned software development tasks.',
      icon: Briefcase,
      type: 'Internship',
      isActive: false, // For currently active animation
      skills: ['React.js', 'JavaScript', 'Frontend Development', 'Web Development'],
      achievements: [
        'Successfully completed 6-month internship tenure',
        'Executed assigned tasks with high competence',
        'Delivered satisfactory development services',
        'Employee ID: 2590'
      ]
    }
  ]

  const getColors = (type: string) => {
    if (type === 'Internship') return { glow: 'green', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', iconText: 'text-green-400', badge: 'bg-green-500/20 text-green-300 border-green-500/30' };
    return { glow: 'amber', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', iconText: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
  };

  return (
    <main className="min-h-screen relative overflow-hidden pt-24 pb-16 relative z-10 text-slate-100">
      <Helmet>
        <title>Experience - Aryan Vishwakarma</title>
        <meta name="description" content="Professional work experience and projects. React Developer Intern at AIGETAI and Data Analytics experience at Deloitte." />
        <link rel="canonical" href="https://vishwakarma-31-portfolio.vercel.app/experience" />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Work Experience
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            My professional journey and hands-on experience in software development
          </p>
        </div>

        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="relative py-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-cyan-500/30 hidden md:block">
            {/* Ambient glow passing down could be added here */}
          </div>

          <div className="space-y-16">
            {experiences.map((item, index) => {
              const colors = getColors(item.type);
              return (
                <div key={index} className="relative flex md:pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-8 top-8 -translate-x-[calc(50%-1px)] w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] hidden md:block z-20">
                     {item.isActive && (
                        <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-70" />
                     )}
                  </div>

                  <UnifiedCard
                    animationType="experience"
                    index={index}
                    glowColor={colors.glow as any}
                    className="w-full relative group"
                  >
                    <div className="p-6 md:p-8">
                      {/* Header with Initials */}
                      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg border-2 ${colors.bg} ${colors.iconText} ${colors.border}`}>
                             {item.initials}
                           </div>
                           <div>
                             <h3 className={`text-2xl font-bold group-hover:${colors.text} transition-colors text-white`}>
                               {item.title}
                             </h3>
                             <p className={`font-medium ${colors.text} text-lg`}>
                               {item.company}
                             </p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           {item.isActive && (
                             <span className="flex items-center gap-2 text-xs font-bold tracking-wide px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-[interactive-glow_3s_infinite]">
                               <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> CURRENTLY ACTIVE
                             </span>
                           )}
                           <span className={`px-4 py-1.5 text-xs font-bold tracking-wider rounded-full border ${colors.badge}`}>
                             {item.type.toUpperCase()}
                           </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-6 text-sm text-gray-400 border-b border-gray-800 pb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      
                      <p className="leading-relaxed mb-8 text-gray-300 text-lg">
                        {item.description}
                      </p>

                      {/* Animated Achievements list */}
                      {item.achievements && (
                        <div className="mb-8">
                          <ul className="space-y-3">
                            {item.achievements.map((achievement, i) => (
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * i }}
                                viewport={{ once: true }}
                                key={i} 
                                className="text-sm text-gray-300 flex items-start gap-3"
                              >
                                <CheckCircle className={`w-5 h-5 ${colors.text} mt-0.5 shrink-0 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all`} />
                                <span className="text-[15px]">{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skills Drop */}
                      {item.skills && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.skills.map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-300 ${colors.bg} ${colors.iconText} border ${colors.border} hover:scale-105 cursor-default group-hover:shadow-[0_0_15px_currentColor]`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </UnifiedCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Experience