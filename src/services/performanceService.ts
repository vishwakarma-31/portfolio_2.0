import PerformanceMonitor from '../utils/performanceMonitor'

// Performance service to centralize performance monitoring
export class PerformanceService {
  private observers: PerformanceObserver[] = []

  constructor() {}

  startPageLoadMonitoring() {
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
    this.observers.push(observer)
  }

  stopMonitoring() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  measureOperation<T>(label: string, operation: () => T): T {
    PerformanceMonitor.markStart(label)
    try {
      const result = operation()
      PerformanceMonitor.markEnd(label)
      return result
    } catch (error) {
      PerformanceMonitor.markEnd(label)
      throw error
    }
  }
}