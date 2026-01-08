import { Briefcase, Calendar, MapPin } from 'lucide-react'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Helmet } from 'react-helmet-async'

const Experience = () => {
  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  });

  const experiences = [
    {
      title: 'React.js Developer Intern',
      company: 'AIGETAI Pvt. Ltd.',
      location: 'Remote',
      period: 'June 2025 - Dec 2025',
      description: 'Completed a comprehensive internship focusing on React.js development. Demonstrated active engagement and competence in executing assigned software development tasks.',
      icon: Briefcase,
      type: 'Internship',
      skills: ['React.js', 'JavaScript', 'Frontend Development', 'Web Development'],
      achievements: [
        'Successfully completed 6-month internship tenure',
        'Executed assigned tasks with high competence',
        'Delivered satisfactory development services',
        'Employee ID: 2590'
      ]
    },
    {
      title: 'Data Analytics Job Simulation',
      company: 'Deloitte',
      location: 'Remote',
      period: 'Feb 2025 - March 2025',
      description: 'Completed a practical job simulation involving real-world data scenarios. Gained hands-on experience in analyzing data sets and forensic technology applications.',
      icon: Briefcase,
      type: 'Job Simulation',
      skills: ['Data Analysis', 'Forensic Technology', 'Data Visualization', 'Problem Solving'],
      achievements: [
        'Completed practical tasks in Data Analysis',
        'Completed practical tasks in Forensic Technology',
        'Verified participation via Forage'
      ]
    }
  ]

  return (
    <main className="min-h-screen relative overflow-hidden pt-24 pb-16 relative z-10 text-slate-100">
      <Helmet>
        <title>Experience - Aryan Vishwakarma</title>
        <meta name="description" content="Professional work experience and projects. React Developer Intern at AIGETAI and Data Analytics experience at Deloitte." />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Work Experience
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            My professional journey and hands-on experience in software development
          </p>
        </div>

        {/* Content Grid */}
        <div 
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {experiences.map((item, index) => {
            const Icon = item.icon
            return (
              <UnifiedCard
                key={index}
                animationType="experience"
                index={index}
                className="h-full"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 bg-teal-500/20">
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-500/20 text-teal-300">
                      {item.type}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors text-white">
                    {item.title}
                  </h3>
                  
                  <p className="font-medium mb-2 text-teal-400">
                    {item.company}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-gray-300">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-teal-400 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills - Removed staggered transition delay */}
                  {item.skills && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full transition-all duration-200 bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </UnifiedCard>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Experience