import React, { Suspense, useState, Component, ReactNode, useEffect } from 'react'

interface SplineWrapperProps {
  scene: string
  className?: string
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState | null {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const SplineWrapper: React.FC<SplineWrapperProps> = ({ 
  scene, 
  className = 'w-full h-full' 
}) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Delay loading the 3D model to improve LCP
  useEffect(() => {
    // Wait 1.5 seconds after page load before starting the heavy 3D download
    const timer = setTimeout(() => setShouldLoad(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // If not yet time to load, return empty placeholder
  if (!shouldLoad) return <div className={className} />

  // Lazy load the Spline component to avoid blocking the main thread
  const LazySpline = React.lazy(() => 
    import('@splinetool/react-spline')
  )

  return (
    <div className={`relative ${className}`}>
      <SplineErrorBoundary 
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div>3D model failed to load</div>
              <div className="text-sm mt-2">Using fallback content</div>
            </div>
          </div>
        }
      >
        <Suspense fallback={(
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-8 h-8 border-2 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
              <div>Loading 3D model...</div>
            </div>
          </div>
        )}>
          <div 
            className={`transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: '100%', height: '100%' }}
          >
            <LazySpline
              scene={scene}
              onLoad={() => setIsLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent'
              }}
            />
          </div>
        </Suspense>
      </SplineErrorBoundary>
      
      {/* Show loading indicator when not loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-700 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export default SplineWrapper