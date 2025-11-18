import React, { Suspense, useState } from 'react'

interface SplineWrapperProps {
  scene: string
  className?: string
}

const SplineWrapper: React.FC<SplineWrapperProps> = ({ 
  scene, 
  className = 'w-full h-full' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Lazy load the Spline component to avoid blocking the main thread
  const LazySpline = React.lazy(() => 
    import('@splinetool/react-spline')
  )

  return (
    <div className={`relative ${className}`}>
      {/* Only show Spline, no fallback */}
      <div 
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <LazySpline
            scene={scene}
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}
          />
        </Suspense>
      </div>
      
      {/* Optional: Minimal loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-700 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export default SplineWrapper