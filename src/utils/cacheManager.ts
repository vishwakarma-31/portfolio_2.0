// Cache management for better performance
class CacheManager {
  private cache = new Map<string, any>()
  private maxSize = 50
  private ttl = 5 * 60 * 1000 // 5 minutes

  set(key: string, value: any, customTtl?: number) {
    // Clear oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    const expiry = Date.now() + (customTtl || this.ttl)
    this.cache.set(key, { value, expiry })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

// Component cache for reused elements
export const componentCache = new CacheManager()

// Asset preloading cache
export const assetCache = new CacheManager()

// Spline scene cache
export const splineCache = new CacheManager()

// Image preloader with cache
export const preloadImage = async (src: string): Promise<void> => {
  if (assetCache.has(src)) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      assetCache.set(src, true)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

// Batch preload images
export const preloadImages = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => preloadImage(url).catch(() => {})) // Ignore individual failures
  await Promise.all(promises)
}

// Memory usage optimization
export const optimizeMemory = () => {
  // Clear caches if memory pressure is detected
  try {
    const memoryInfo = (performance as any).memory
    if (memoryInfo && memoryInfo.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
      componentCache.clear()
      assetCache.clear()
      console.log('Memory optimized: Caches cleared')
    }
  } catch (error) {
    // Memory API not available, skip optimization
  }
}

// Auto-optimize memory every 2 minutes
if (typeof window !== 'undefined') {
  setInterval(optimizeMemory, 2 * 60 * 1000)
}