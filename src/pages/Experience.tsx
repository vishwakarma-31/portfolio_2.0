import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
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
      title: 'Full Stack Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Developing full-stack web applications using React, Node.js, and modern web technologies. Building responsive and scalable solutions for various clients.',
      icon: Briefcase,
      type: 'Work Experience',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'REST APIs'],
      achievements: [
        'Built 5+ full-stack applications',
        'Improved application performance by 40%',
        'Implemented CI/CD pipelines'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'Tech Solutions Inc.',
      location: 'Kanpur, India',
      period: '2023',
      description: 'Worked on frontend development projects, collaborated with senior developers, and learned industry best practices in web development.',
      icon: Briefcase,
      type: 'Work Experience',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Git', 'Agile'],
      achievements: [
        'Developed responsive web interfaces',
        'Participated in code reviews',
        'Contributed to team projects'
      ]
    },
    {
      title: 'Machine Learning Project Developer',
      company: 'Academic Projects',
      location: 'Kanpur, India',
      period: '2024',
      description: 'Developed machine learning models for agricultural and security applications. Worked on data preprocessing, model training, and deployment.',
      icon: Briefcase,
      type: 'Project Experience',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Scikit-learn', 'Data Science'],
      achievements: [
        'Created Cropify ML recommendation system',
        'Developed fingerprint detection system',
        'Achieved 94%+ accuracy in ML models'
      ]
    }
  ]

  return (
    <main className="min-h-screen relative overflow-hidden pt-24 pb-16 relative z-10 text-slate-100">
      <Helmet>
        <title>Experience - Aryan Vishwakarma</title>
        <meta name="description" content="Professional work experience and projects. Full Stack Developer with expertise in React, Node.js, Machine Learning, and modern web technologies." />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Work Experience
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            My professional journey and hands-on experience in software development
          </p>
        </motion.div>

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

                  {/* Skills */}
                  {item.skills && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 text-xs rounded-full transition-all duration-200 bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30"
                        >
                          {tech}
                        </motion.span>
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
