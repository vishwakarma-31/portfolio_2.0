import React, { useRef, useState } from 'react'
import { SkillCategory } from '../types'
import UnifiedCard from '../components/UnifiedCard'
import {
  Code,
  Palette,
  Database,
  Server,
  Cloud,
  GitBranch,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

const proficiencyMap: Record<string, string> = {
  'frontend development': '2+ Years Hands-on',
  'backend development': '1.5+ Years Hands-on',
  'database & storage': '1+ Year Hands-on',
  'cloud & devops': '6+ Months Hands-on'
};

const Skills = () => {
  const containerRef = useRef(null)

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: Code,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/20 to-blue-500/20',
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
      coreSkills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
      toolkit: ['WebSockets', 'Microservices', 'Rate Limiting', 'Background Jobs', 'API Documentation']
    },
    {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      summary: 'Designing data models that balance performance, integrity, and developer ergonomics.',
      coreSkills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
      toolkit: ['Aggregation Pipelines', 'Prisma', 'Mongoose', 'ORM Optimization', 'DB Monitoring']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-amber-400',
      bgColor: 'from-amber-500/20 to-orange-500/20',
      summary: 'Owning the full lifecycle from deployment pipelines to observability and performance tuning.',
      coreSkills: ['AWS', 'Vercel', 'Railway', 'CI/CD Pipelines'],
      toolkit: ['Docker', 'Nginx', 'Monitoring', 'Infrastructure as Code', 'Security Hardening']
    },
  ]

  const tools = [
    { name: 'Git', icon: GitBranch, color: 'text-red-400', desc: 'Version Control' },
    { name: 'VS Code', icon: Code, color: 'text-blue-400', desc: 'Primary Editor' },
    { name: 'ECLIPSE IDE', icon: Palette, color: 'text-purple-400', desc: 'Java Environment' },
    { name: 'JUPYTER', icon: Layers, color: 'text-orange-500', desc: 'Data Science' },
    { name: 'AWS', icon: Cloud, color: 'text-amber-400', desc: 'Cloud Host' },
  ]

  return (
    <main
      ref={containerRef}
      className="pt-24 pb-16 min-h-screen p-8 relative z-10 text-slate-100"
    >
      <Helmet>
        <title>Skills & Expertise - Aryan Vishwakarma</title>
        <meta name="description" content="Discover my technical skills and expertise in frontend development, backend technologies, databases, cloud services, and DevOps tools." />
        <link rel="canonical" href="https://vishwakarma-31-portfolio.vercel.app/skills" />
      </Helmet>
      <div className="max-w-7xl mx-auto space-y-16 pb-8">
        
        {/* Two Line Staggered Heading */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-none mb-2">
              TECH
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-none pl-12 md:pl-24">
              ARSENAL
            </h1>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const glowColor = category.color.split('-')[1]; // cyan, green, purple, amber -> maps to our UnifiedCard glowColors
            return (
              <UnifiedCard
                key={category.title}
                animationType="skills"
                index={index}
                glowColor={glowColor as any}
                className="overflow-hidden"
              >
                <SkillCard category={category} />
              </UnifiedCard>
            )
          })}
        </div>

        {/* Tools Section */}
        <div className="pt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">Tools & Workflow</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tools.map((tool, index) => {
              const glowColor = tool.color.split('-')[1];
              return (
                <UnifiedCard
                  key={tool.name}
                  index={index}
                  hoverEffects={true}
                  glowColor={glowColor as any}
                  className="p-6 text-center group"
                >
                  <tool.icon className={`w-10 h-10 ${tool.color} mx-auto mb-4 group-hover:drop-shadow-[0_0_15px_currentColor] transition-all duration-300`} />
                  <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                  <p className="text-xs text-gray-400">{tool.desc}</p>
                </UnifiedCard>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

const SkillCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  const glowBorderClass = `border-t-2 border-t-${category.color.split('-')[1]}-400`;
  const proficiency = proficiencyMap[category.title.toLowerCase()] || 'Experience verified';

  return (
    <div className={`p-8 h-full flex flex-col ${glowBorderClass} bg-gradient-to-b from-white/[0.03] to-transparent`}>
      <div className="flex items-start gap-5 mb-6">
        <div className={`p-4 rounded-2xl bg-black/50 border border-gray-800 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
          <category.icon className={`w-8 h-8 ${category.color}`} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {category.title}
          </h3>
          <p className="text-md text-gray-400 leading-relaxed font-light">{category.summary}</p>
        </div>
      </div>

      <div className="space-y-8 flex-1 mt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">Core Stack</p>
             <p className="text-[10px] uppercase font-bold text-gray-500 bg-gray-900/50 px-2 py-1 rounded border border-gray-800">{proficiency}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.coreSkills.map((item) => (
              <span
                key={item}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg text-white border border-${category.color.split('-')[1]}-500/40 bg-${category.color.split('-')[1]}-500/20 hover:bg-${category.color.split('-')[1]}-500/30 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Ecosystem Toolkit</p>
          <div className="flex flex-wrap gap-2">
            {category.toolkit.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs font-medium rounded-lg text-gray-400 border border-dashed border-gray-600 hover:border-gray-400 hover:text-gray-200 transition-colors bg-transparent"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills