import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { usePageTransition } from '../hooks/usePageTransition'

const slideVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? '100%' : '-100%',
    scale: 0.95,
    filter: "blur(10px)"
  }),
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)"
  },
  out: (direction) => ({
    opacity: 0,
    x: direction < 0 ? '100%' : '-100%',
    scale: 1.05,
    filter: "blur(5px)"
  })
}

const fadeVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(5px)"
  },
  in: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  out: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(3px)"
  }
}

const zoomVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateY: 0
  },
  out: {
    opacity: 0,
    scale: 1.2,
    rotateY: 15
  }
}

const PageTransition = ({ children }) => {
  const location = useLocation()
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [transitionType, setTransitionType] = useState('slide')
  const containerRef = useRef(null)

  const pageOrder = ['/', '/skills', '/Certification', '/projects', '/education', '/contact']

  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname)
    const prevIndex = pageOrder.indexOf(window.history.state?.prevPath || '/')

    if (currentIndex !== -1 && prevIndex !== -1) {
      setDirection(currentIndex > prevIndex ? 1 : -1)
    }

    // Random transition type for variety
    const types = ['slide', 'fade', 'zoom']
    setTransitionType(types[Math.floor(Math.random() * types.length)])

    // Store current path for next navigation
    window.history.replaceState({ prevPath: location.pathname }, '')
  }, [location.pathname])

  useEffect(() => {
    setIsLoading(true)

    // GSAP page transition
    const tl = gsap.timeline()

    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsLoading(false)
        gsap.to(containerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    })

    return () => tl.kill()
  }, [location.pathname])

  const getVariants = () => {
    switch (transitionType) {
      case 'fade':
        return fadeVariants
      case 'zoom':
        return zoomVariants
      default:
        return slideVariants
    }
  }

  const transitionConfig = {
    slide: { type: "tween", ease: "anticipate", duration: 0.8 },
    fade: { duration: 0.6, ease: "easeOut" },
    zoom: { type: "spring", bounce: 0.2, duration: 0.8 }
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={getVariants()}
          initial="initial"
          animate="in"
          exit="out"
          transition={transitionConfig[transitionType]}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/30 via-purple-500/20 to-cyan-500/20 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Animated background rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 border-2 border-cyan-400/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 w-16 h-16 border-2 border-purple-400/30 rounded-full"
              />

              {/* Main loader */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-3 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PageTransition