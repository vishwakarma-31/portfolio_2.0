import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SkillCategory } from '../types'
import UnifiedCard from '../components/UnifiedCard'
import {
  Code,
  Palette,
  Database,
  Server,
  Cloud,
  GitBranch,
  Layers
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const Skills = () => {
  const containerRef = useRef(null)
  // Remove scroll-jacking hooks (useScroll, useTransform, useSpring)
  // Remove parallax style props (y, opacity) from the main container

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      summary: 'Crafting immersive, high-performance interfaces with modern tooling and a focus on delightful user interactions.',
      coreSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      toolkit: ['GSAP', 'React Query', 'Redux Toolkit', 'Storybook', 'Component Libraries']
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      summary: 'Building secure, scalable services with clean architecture and well-tested APIs.',
      coreSkills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Authentication'],
      toolkit: ['WebSockets', 'Microservices', 'Rate Limiting', 'Background Jobs', 'API Documentation']
    },
    {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      summary: 'Designing data models that balance performance, integrity, and developer ergonomics.',
      coreSkills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Data Modeling'],
      toolkit: ['Aggregation Pipelines', 'Prisma', 'Mongoose', 'ORM Optimization', 'DB Monitoring']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-red-500/20',
      summary: 'Owning the full lifecycle from deployment pipelines to observability and performance tuning.',
      coreSkills: ['AWS', 'Vercel', 'Railway', 'CI/CD Pipelines', 'Performance Optimization'],
      toolkit: ['Docker', 'Nginx', 'Monitoring', 'Infrastructure as Code', 'Security Hardening']
    },
  ]

  const tools = [
    { name: 'Git', icon: GitBranch, color: 'text-red-400' },
    { name: 'VS Code', icon: Code, color: 'text-blue-400' },
    { name: 'ECLIPSE IDE', icon: Palette, color: 'text-purple-400' },
    { name: 'JUPYTER NOTEBOOK', icon: Layers, color: 'text-blue-500' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-400' },
  ]

  return (
    <main
      ref={containerRef}
      className="pt-24 pb-16 min-h-screen p-8 relative z-10 text-slate-100"
    >
      <Helmet>
        <title>Skills & Expertise - Aryan Vishwakarma</title>
        <meta name="description" content="Discover my technical skills and expertise in frontend development, backend technologies, databases, cloud services, and DevOps tools." />
      </Helmet>
      {/* Remove parallax styling */}
      <div className="max-w-7xl mx-auto space-y-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Tech Stack
          </h1>
          <p className="text-gray-300">
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <UnifiedCard
              key={category.title}
              animationType="skills"
              index={index}
              className="animate-on-scroll stagger-advanced-1"
            >
              <SkillCard
                category={category}
                index={index}
              />
            </UnifiedCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden py-8 rounded-xl glow-border-enter bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {tools.map((tool, _index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/80 backdrop-blur-sm transform hover:shadow-lg hover:shadow-blue-500/20"
              >
                {/* Remove toy-like hover effects: Delete whileHover= rotate: 360  */}
                <div>
                  <tool.icon className={`w-8 h-8 ${tool.color}`} />
                </div>
                <span className="font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <div 
      ref={cardRef}
      className="p-6 h-full"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Remove toy-like hover effects: Delete whileHover= rotate: 360  */}
        <div
          className="p-3 rounded-xl bg-gray-800/50"
        >
          <category.icon className={`w-8 h-8 ${category.color}`} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-100">
            {category.title}
          </h3>
          <p className="text-sm text-gray-400 mt-2">{category.summary}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Remove staggered delay logic: Remove delayOffset + index * 0.08 */}
        <SkillPillGroup
          title="Core Stack"
          items={category.coreSkills}
          isInView={isInView}
        />
        <SkillPillGroup
          title="Toolkit"
          items={category.toolkit}
          isInView={isInView}
          outlined
        />
      </div>
    </div>
  )
}

const SkillPillGroup: React.FC<{
  title: string;
  items: string[];
  outlined?: boolean;
  isInView: boolean;
}> = ({ title, items, outlined = false, isInView }) => {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, _index) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`px-3 py-1.5 text-sm rounded-full border ${outlined ? 'bg-transparent text-gray-300' : 'text-white'} ${
              outlined ? 'border-gray-600 hover:border-cyan-400/60' : 'border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
            } hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300`}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export default Skills