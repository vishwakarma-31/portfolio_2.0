import { Award, Calendar, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import UnifiedCard from '../components/UnifiedCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Helmet } from 'react-helmet-async'

const Experience = () => {

  const { ref: containerRef } = useScrollReveal({
    threshold: 0.1,
    once: true
  });

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
    <main className="min-h-screen relative overflow-hidden pt-24 pb-16 relative z-10 text-slate-100">
      <Helmet>
        <title>Experience & Certifications - Aryan Vishwakarma</title>
        <meta name="description" content="Professional certifications and achievements in technology and development. AWS, JavaScript, HTML5, AI, and Oracle Cloud certifications." />
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
            Experience
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Professional Certifications and achievements in technology and development
          </p>
        </motion.div>

        {/* Content Grid */}
        <div 
          ref={containerRef as any}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((item, index) => {
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
                    <div className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 bg-blue-500/20">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    {item.certificateUrl && (
                      <motion.a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 12 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg transition-all duration-300 text-gray-400 hover:text-cyan-400"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
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
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 text-xs rounded-full transition-all duration-200 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
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