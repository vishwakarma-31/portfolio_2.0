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
    
    // Instant scroll to top without animation for immediate page switching
    window.scrollTo(0, 0)

    // Store current path for next navigation
    window.history.replaceState({ prevPath: location.pathname }, '')

    // Minimal delay for transition completion
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 50) // Very short delay to allow state update

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }} // Minimal transition time
          className="page-content w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Remove the transition indicator for cleaner experience */}
    </div>
  )
}

export default TransitionManager