import React from 'react'
import UnifiedCard from '../components/UnifiedCard'
import { certifications as awards } from '../data/certification'
import { Helmet } from 'react-helmet-async'
import { ExternalLink, Award, FileBadge } from 'lucide-react'
import { motion } from 'framer-motion'

const Certifications = () => {
  const getIssuerColor = (issuer: string) => {
    if (issuer.includes('HackerRank')) return { glow: 'green', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    if (issuer.includes('Forage')) return { glow: 'amber', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    return { glow: 'cyan', text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
  }

  const getInitials = (issuer: string) => {
    if (issuer.includes('HackerRank')) return 'HR';
    if (issuer.includes('Forage')) return 'FG';
    return issuer.substring(0, 2).toUpperCase();
  }

  return (
    <main className="min-h-screen pt-24 pb-16 text-slate-100 relative z-10 overflow-hidden">
      <Helmet>
        <title>Certifications - Aryan Vishwakarma</title>
        <meta name="description" content="Professional certifications and achievements including HackerRank and Forage credentials." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-6">
            Certifications
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Professional credentials and verified achievements
          </p>
        </div>

        {/* Summary Stat Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center flex-wrap gap-4 mb-16"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 border border-gray-700 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            <FileBadge className="w-5 h-5 text-green-400" />
            <span className="font-semibold">{awards.length} Total Certifications</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 border border-gray-700 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)] text-gray-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400" /> HackerRank
            <span className="w-2 h-2 rounded-full bg-amber-400 ml-3" /> Forage
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((cert, index) => {
             const style = getIssuerColor(cert.company);
             return (
               <UnifiedCard
                 key={index}
                 animationType="default"
                 index={index}
                 glowColor={style.glow as any}
                 className="h-full flex flex-col group relative overflow-hidden"
               >
                 <div className="p-8 flex-1 flex flex-col z-10">
                   <div className="flex items-center justify-between mb-8">
                     <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl ${style.bg} ${style.border} ${style.text} shadow-inner border shadow-[0_0_10px_currentColor] group-hover:scale-110 transition-transform duration-300`}>
                       {getInitials(cert.company)}
                     </div>
                     <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] ${style.bg} ${style.text} border ${style.border}`}>
                       Verified
                     </span>
                   </div>
                   
                   <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                     {cert.title}
                   </h3>
                   <div className="flex items-center gap-2 mb-6 p-2 rounded-lg bg-gray-900/50 border border-gray-800 w-max">
                     <Award className={`w-4 h-4 ${style.text}`} />
                     <span className="text-gray-300 font-medium text-sm">{cert.company}</span>
                   </div>
                   
                   <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-8">
                     {cert.description}
                   </p>

                   {cert.certificateUrl && (
                     <a
                       href={cert.certificateUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="mt-auto w-full py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 transition-all font-semibold text-gray-200 hover:text-white group/btn relative overflow-hidden"
                     >
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <div className="flex flex-row items-center gap-2">View Certificate <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" /></div>
                     </a>
                   )}
                 </div>
                 {/* Visual flare: subtle blurred overlay on hover representing a certificate watermark */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-colors pointer-events-none" />
               </UnifiedCard>
             )
          })}
        </div>
      </div>
    </main>
  )
}

export default Certifications