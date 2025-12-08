import { Award, Calendar, ExternalLink } from 'lucide-react'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Helmet } from 'react-helmet-async'
import { certifications } from '../data/certification'

const Certifications = () => {
  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  })

  return (
    <main className="min-h-screen relative overflow-hidden pt-24 pb-16 relative z-10 text-slate-100">
      <Helmet>
        <title>Certifications - Aryan Vishwakarma</title>
        <meta name="description" content="Professional certifications and achievements in technology and development. AWS, JavaScript, HTML5, AI, and Oracle Cloud certifications." />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Certifications
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Professional certifications and achievements in technology and development
          </p>
        </div>

        {/* Content Grid */}
        <div 
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((item, index) => {
            const Icon = Award
            return (
              <UnifiedCard
                key={item.id || index}
                animationType="experience"
                index={index}
                className="h-full"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 bg-blue-500/20">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    {item.certificateUrl && (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg transition-all duration-300 text-gray-400 hover:text-cyan-400"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors text-white">
                    {item.title}
                  </h3>
                  
                  <p className="font-medium mb-2 text-blue-400">
                    {item.company}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    {item.description}
                  </p>

                  {/* Skills */}
                  {item.skills && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full transition-all duration-200 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
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

export default Certifications