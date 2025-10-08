// Route preloading service to handle intelligent route preloading
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

export class RoutePreloadService {
  static preloadRoutes(currentPath: string) {
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

  static preloadSplineScene() {
    setTimeout(() => {
      preloadSplineScene('https://prod.spline.design/Ayv4gcCQeDDF943R/scene.splinecode')
    }, 500)
  }
}