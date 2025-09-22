import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Preload components for faster navigation
type RouteKey = '/' | '/skills' | '/experience' | '/projects' | '/contact' | '/education'

const componentModules: Record<RouteKey, () => Promise<any>> = {
  '/': () => import('../pages/Home'),
  '/skills': () => import('../pages/Skills'),
  '/experience': () => import('../pages/Experience'),
  '/projects': () => import('../pages/Projects'),
  '/contact': () => import('../pages/Contact'),
  '/education': () => import('../pages/Education'),
}

// Preload Spline scene for better performance
const preloadSplineScene = async (sceneUrl: string) => {
  try {
    const response = await fetch(sceneUrl, { method: 'HEAD' })
    if (response.ok) {
      console.log('Spline scene preloaded successfully')
    }
  } catch (error) {
    console.warn('Failed to preload Spline scene:', error)
  }
}

export const useRoutePreloader = () => {
  const location = useLocation()

  useEffect(() => {
    // Preload likely next routes based on current route
    const preloadRoutes = (currentPath: string) => {
      const routeMap: Record<string, RouteKey[]> = {
        '/': ['/skills', '/projects'], // From home, users likely go to skills or projects
        '/skills': ['/experience', '/projects'],
        '/experience': ['/projects', '/education'],
        '/projects': ['/contact', '/skills'],
        '/education': ['/experience', '/contact'],
        '/contact': ['/projects', '/'],
      }

      const nextRoutes = routeMap[currentPath] || []
      
      // Preload the components for likely next routes
      nextRoutes.forEach(route => {
        if (componentModules[route]) {
          componentModules[route]().catch((err: any) => 
            console.warn(`Failed to preload ${route}:`, err)
          )
        }
      })
    }

    // Preload routes after a short delay to not block initial render
    const timeoutId = setTimeout(() => {
      preloadRoutes(location.pathname)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  useEffect(() => {
    // Preload Spline scene when on home page
    let timeoutId: NodeJS.Timeout | undefined
    if (location.pathname === '/') {
      timeoutId = setTimeout(() => {
        preloadSplineScene('https://prod.spline.design/Ayv4gcCQeDDF943R/scene.splinecode')
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
    if ('serviceWorker' in navigator && 'caches' in window) {
      const cacheRoutes = async () => {
        try {
          const cache = await caches.open('portfolio-routes-v1')
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
    // Monitor route transition performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming
          console.log('Page load performance:', {
            domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
            loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
            total: navigationEntry.loadEventEnd - navigationEntry.fetchStart
          })
        }
      })
    })

    observer.observe({ entryTypes: ['navigation'] })

    return () => observer.disconnect()
  }, [])
}