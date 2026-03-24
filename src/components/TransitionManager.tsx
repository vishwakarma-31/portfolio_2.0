import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
// ScrollToPlugin is registered globally in main.tsx

interface TransitionManagerProps {
  children: React.ReactNode
}

const TransitionManager: React.FC<TransitionManagerProps> = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Instant scroll to top without animation for immediate page switching
    window.scrollTo(0, 0)

    // Store current path for next navigation
    window.history.replaceState({ prevPath: location.pathname }, '')
  }, [location.pathname])

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15, ease: 'easeOut' }} // Extremely fast and snappy
          className="page-content w-full min-h-screen relative overflow-hidden"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TransitionManager