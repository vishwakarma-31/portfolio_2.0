import React from 'react'
import { Mail, MapPin, Github, Linkedin, MessageSquareHeart } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { SOCIAL_LINKS } from '../config/constants'
import { personalInfo as CONTACT_INFO } from '../data/personal'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100 relative z-10">
      <Helmet>
        <title>Contact Me - Aryan Vishwakarma</title>
        <meta name="description" content="Get in touch with Aryan Vishwakarma for opportunities, collaborations, or just to say hello." />
        <link rel="canonical" href="https://vishwakarma-31-portfolio.vercel.app/contact" />
      </Helmet>
      
      {/* Subtle ambient breathing glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none opacity-50 animate-pulse-online" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Panel: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-10 lg:pl-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">Let's Connect <MessageSquareHeart className="text-pink-400" /></h2>
              <p className="text-gray-400 leading-relaxed font-light">
                Feel free to reach out via email or connect with me on social media. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-1">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-medium text-gray-200 hover:text-cyan-400 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-1">Location</p>
                  <p className="text-lg font-medium text-gray-200">
                    {CONTACT_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-800/80">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">Social Links</p>
              <div className="flex gap-4">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-700 bg-gray-900/50 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-blue-900 bg-blue-900/20 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] hover:scale-110 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 relative"
          >
            <div className="relative z-10 w-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}

export default Contact