import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { RoutePreloadService } from '../services/routePreloadService'
import { PerformanceService } from '../services/performanceService'
import { container } from '../di'

export const useRoutePreloader = () => {
  const location = useLocation()

  useEffect(() => {
    // Preload routes after a short delay to not block initial render
    const timeoutId = setTimeout(() => {
      RoutePreloadService.preloadRoutes(location.pathname)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  useEffect(() => {
    // Preload Spline scene when on home page
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    if (location.pathname === '/') {
      timeoutId = setTimeout(() => {
        RoutePreloadService.preloadSplineScene()
      }, 500)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [location.pathname])
}

// Enhanced route caching strategy
export const useRouteCache = () => {
  useEffect(() => {
    // Implement service worker for route caching if supported
    if ('serviceWorker' in window.navigator && 'caches' in window) {
      const cacheRoutes = async () => {
        try {
          const cache = await window.caches.open('portfolio-routes-v1')
          const routesToCache = [
            '/',
            '/skills',
            '/experience', 
            '/projects',
            '/contact',
            '/education'
          ]
          
          await cache.addAll(routesToCache)
          console.log('Routes cached successfully')
        } catch (error) {
          console.warn('Route caching failed:', error)
        }
      }

      cacheRoutes()
    }
  }, [])
}

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    const performanceService = container.resolve(PerformanceService)
    performanceService.startPageLoadMonitoring()
    
    return () => {
      performanceService.stopMonitoring()
    }
  }, [])
}