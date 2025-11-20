import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
// ScrollToPlugin is registered globally in main.tsx

interface TransitionManagerProps {
  children: React.ReactNode
}

const TransitionManager: React.FC<TransitionManagerProps> = ({ children }) => {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    
    // Faster scroll to top with reduced duration
    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: 0, autoKill: true },
      ease: "power2.inOut"
    })

    // Store current path for next navigation
    window.history.replaceState({ prevPath: location.pathname }, '')

    // Optimized page transition with shorter duration
    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false)
    })

    // Faster page enter animation
    tl.fromTo('.page-content',
      {
        opacity: 0,
        y: 15,
        scale: 0.99
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      }
    )

    // Reduced stagger for faster loading
    tl.fromTo('.page-element',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05, // Reduced from 0.1
        ease: "power2.out"
      },
      "-=0.3"
    )

  }, [location.pathname])

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} // Faster transition
          className="page-content w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Quick transition indicator */}
      {isTransitioning && (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
          />
        </div>
      )}
    </div>
  )
}

export default TransitionManager