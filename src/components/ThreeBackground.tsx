import React, { Suspense, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ThreeBackgroundContent = React.lazy(() => import('./ThreeBackgroundContent'))

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on initial load
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Only render on the Home page
  if (location.pathname !== '/') return null

  // Return null for mobile devices to save battery and performance
  if (isMobile) {
    return null
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <ThreeBackgroundContent />
      </Suspense>
    </div>
  )
}