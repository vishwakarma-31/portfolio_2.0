import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { SkillCategory } from '../types'
import {
  Code,
  Palette,
  Database,
  Server,
  Cloud,
  GitBranch,
  Layers
} from 'lucide-react'

const Skills = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      skills: [
        { name: 'React.js', icon: '⚛️', level: 95 },
        // { name: 'Next.js', icon: '▲', level: 90 },
        // { name: 'TypeScript', icon: '🔷', level: 88 },
        // { name: 'Tailwind CSS', icon: '🎨', level: 92 },
        { name: 'JavaScript', icon: '🟨', level: 95 },
        { name: 'HTML/CSS', icon: '🌐', level: 98 }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      skills: [
        { name: 'Node.js', icon: '🟢', level: 90 },
        // { name: 'Python', icon: '🐍', level: 85 },
        // { name: 'Express.js', icon: '🚀', level: 88 },
        // { name: 'REST APIs', icon: '🔗', level: 92 },
        // { name: 'GraphQL', icon: '🔺', level: 80 },
        // { name: 'Microservices', icon: '🏗️', level: 75 }
      ]
    },
    {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      skills: [
        // { name: 'PostgreSQL', icon: '🐘', level: 88 },
        { name: 'MongoDB', icon: '🍃', level: 85 },
        // { name: 'Redis', icon: '🔴', level: 80 },
        { name: 'MySQL', icon: '🟦', level: 82 },
        // { name: 'Firebase', icon: '🔥', level: 78 },
        // { name: 'Prisma', icon: '⚡', level: 85 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-red-500/20',
      skills: [
        { name: 'AWS', icon: '☁️', level: 80 },
        // { name: 'Docker', icon: '🐳', level: 85 },
        // { name: 'Kubernetes', icon: '⎈', level: 70 },
        // { name: 'CI/CD', icon: '🔄', level: 82 },
        // { name: 'Vercel', icon: '▲', level: 90 },
        // { name: 'Netlify', icon: '🌐', level: 88 }
      ]
    },
    // {
    //   title: 'UI/UX Design',
    //   icon: Palette,
    //   color: 'text-pink-400',
    //   bgColor: 'from-pink-500/20 to-rose-500/20',
    //   skills: [
    //     { name: 'Figma', icon: '🎯', level: 85 },
    //     { name: 'Adobe XD', icon: '💎', level: 80 },
    //     // { name: 'User Research', icon: '👥', level: 75 },
    //     // { name: 'Prototyping', icon: '📱', level: 82 },
    //     // { name: 'Design Systems', icon: '🎨', level: 78 },
    //     // { name: 'Accessibility', icon: '♿', level: 85 }
    //   ]
    // },
    // {
    //   title: 'Mobile Development',
    //   icon: Smartphone,
    //   color: 'text-indigo-400',
    //   bgColor: 'from-indigo-500/20 to-blue-500/20',
    //   skills: [
    //     { name: 'React Native', icon: '📱', level: 80 },
    //     { name: 'Flutter', icon: '🦋', level: 75 },
    //     { name: 'iOS Development', icon: '🍎', level: 70 },
    //     { name: 'Android Development', icon: '🤖', level: 72 },
    //     { name: 'Expo', icon: '⚡', level: 85 },
    //     { name: 'Mobile UI/UX', icon: '🎨', level: 80 }
    //   ]
    // }
  ]

  const tools = [
    { name: 'Git', icon: GitBranch, color: 'text-red-400' },
    { name: 'VS Code', icon: Code, color: 'text-blue-400' },
    { name: 'ECLIPSE IDE', icon: Palette, color: 'text-purple-400' },
    { name: 'JUPYTER NOTEBOOK', icon: Layers, color: 'text-blue-500' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-400' },
    // { name: 'Vercel', icon: Zap, color: 'text-black' },
    // { name: 'Postman', icon: Globe, color: 'text-orange-500' },
    // { name: 'Jest', icon: Shield, color: 'text-green-400' },
  ]

  return (
    <motion.div
      ref={containerRef}
      style={{ y: springY, opacity }}
      className={`pt-24 pb-16 min-h-screen p-8 relative z-10 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
    >
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
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`animate-on-scroll stagger-${(index % 5) + 1}`}
            >
              <SkillCard
                category={category}
                index={index}
                isDark={isDark}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={`relative w-full overflow-hidden py-8 rounded-xl glow-border-enter ${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-lg border ${isDark ? 'border-white/10' : 'border-black/10'} shadow-lg`}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gray-800/50 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-gray-100'
                } backdrop-blur-sm transform hover:shadow-lg ${isDark ? 'hover:shadow-blue-500/20' : 'hover:shadow-blue-500/10'}`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <tool.icon className={`w-8 h-8 ${tool.color}`} />
                </motion.div>
                <span className="font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const SkillCard: React.FC<{ category: SkillCategory; index: number; isDark: boolean }> = ({ category, index, isDark }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className={`group relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r ${category.bgColor} bg-[length:400%_400%] animate-gradient-xy hover:bg-[length:100%_100%] transition-all duration-700 shadow-lg`}
    >
      <div className={`rounded-lg overflow-hidden shadow-md transition-transform duration-500 group-hover:scale-105 p-6 glow-border-enter ${isDark ? 'bg-gradient-to-br from-slate-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-100'}`}>
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`p-3 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <category.icon className={`w-8 h-8 ${category.color}`} />
          </motion.div>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            {category.title}
          </h3>
        </div>

        <div className="space-y-3">
          {category.skills.map((skill, skillIndex) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {skill.level}%
                </span>
              </div>
              <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: skillIndex * 0.1, ease: "easeOut" }}
                  className={`h-2 rounded-full bg-gradient-to-r ${category.color.replace('text-', 'from-')} to-cyan-400`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Skills