// Performance monitoring utilities
export class PerformanceMonitor {
  private static metrics: Map<string, number> = new Map()
  private static observers: PerformanceObserver[] = []

  static markStart(label: string) {
    performance.mark(`${label}-start`)
  }

  static markEnd(label: string) {
    performance.mark(`${label}-end`)
    try {
      performance.measure(label, `${label}-start`, `${label}-end`)
      const measure = performance.getEntriesByName(label, 'measure')[0]
      this.metrics.set(label, measure.duration)
      
      // Log slow operations
      if (measure.duration > 1000) {
        console.warn(`Slow operation detected: ${label} took ${measure.duration.toFixed(2)}ms`)
      }
    } catch (error) {
      console.warn(`Failed to measure ${label}:`, error)
    }
  }

  static getMetric(label: string): number | undefined {
    return this.metrics.get(label)
  }

  static getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  static measureFunction<T extends (...args: any[]) => any>(
    fn: T,
    label: string
  ): T {
    return ((...args: any[]) => {
      this.markStart(label)
      const result = fn(...args)
      
      // Handle both sync and async functions
      if (result instanceof Promise) {
        return result.finally(() => this.markEnd(label))
      } else {
        this.markEnd(label)
        return result
      }
    }) as T
  }

  static startMonitoring() {
    // Monitor Long Tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`)
            }
          })
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.push(longTaskObserver)
      } catch (error) {
        console.warn('Long task monitoring not supported')
      }

      // Monitor Layout Shifts
      try {
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.value > 0.1) {
              console.warn(`Layout shift detected: ${entry.value.toFixed(4)}`)
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (error) {
        console.warn('Layout shift monitoring not supported')
      }

      // Monitor LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          if (lastEntry.startTime > 2500) {
            console.warn(`Slow LCP detected: ${lastEntry.startTime.toFixed(2)}ms`)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)
      } catch (error) {
        console.warn('LCP monitoring not supported')
      }
    }
  }

  static stopMonitoring() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  static generateReport(): string {
    const metrics = this.getAllMetrics()
    const report = Object.entries(metrics)
      .map(([label, duration]) => `${label}: ${duration.toFixed(2)}ms`)
      .join('\n')
    
    return `Performance Report:\n${report}`
  }
}

// Auto-start monitoring in development
if (process.env.NODE_ENV === 'development') {
  PerformanceMonitor.startMonitoring()
}

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    PerformanceMonitor.stopMonitoring()
  })
}

export default PerformanceMonitor