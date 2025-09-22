import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { splineCache } from '../utils/cacheManager'

interface SplineLoaderProps {
  scene: string
  className?: string
  fallbackContent?: React.ReactNode
  showLoadingState?: boolean
}

const SplineLoader: React.FC<SplineLoaderProps> = ({
  scene,
  className = "w-full h-full",
  fallbackContent,
  showLoadingState = true
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const splineRef = useRef<any>(null)

  useEffect(() => {
    // Check if scene is already cached
    if (splineCache.has(scene)) {
      setLoadProgress(100)
      setIsLoading(false)
      return
    }

    // Preload the Spline scene
    const preloadSpline = async () => {
      try {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setLoadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + Math.random() * 15
          })
        }, 200)
      } catch (error) {
        console.error('Error preloading Spline scene:', error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    preloadSpline()
  }, [scene])

  const handleSplineLoad = useCallback(() => {
    setLoadProgress(100)
    splineCache.set(scene, true, 10 * 60 * 1000) // Cache for 10 minutes
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [scene])

  const handleSplineError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
  }, [])

  const LoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900/20 via-purple-900/10 to-cyan-900/20 backdrop-blur-sm rounded-lg"
    >
      <div className="text-center space-y-4">
        {/* Advanced loading animation */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-cyan-400/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 w-12 h-12 border-2 border-purple-400/40 rounded-full"
          />
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          />
        </div>

        {/* Progress bar */}
        <div className="w-32 h-1 bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loadProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-400 font-medium"
        >
          Loading 3D Scene...
        </motion.p>
      </div>
    </motion.div>
  )

  const ErrorState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm rounded-lg"
    >
      <div className="text-center space-y-4 p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center mx-auto"
        >
          <div className="w-6 h-6 bg-red-400 rounded-full" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">3D Scene Unavailable</h3>
          <p className="text-sm text-gray-400">
            {fallbackContent || "The 3D character is taking a break. Try refreshing the page!"}
          </p>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading && showLoadingState && (
          <LoadingState key="loading" />
        )}
        
        {hasError && (
          <ErrorState key="error" />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={className}
      >
        <Spline
          ref={splineRef}
          scene={scene}
          onLoad={handleSplineLoad}
          onError={handleSplineError}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent'
          }}
        />
      </motion.div>
    </div>
  )
}

export default SplineLoader