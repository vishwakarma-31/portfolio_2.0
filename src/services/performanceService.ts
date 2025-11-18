// Performance service to centralize performance monitoring
export class PerformanceService {
  private observers: PerformanceObserver[] = []

  constructor() {}

  startPageLoadMonitoring() {
    // Monitor route transition performance
    const observer = new PerformanceObserver((list: PerformanceObserverEntryList) => {
      list.getEntries().forEach((entry: PerformanceEntry) => {
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

    try {
      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('PerformanceObserver not supported:', error)
    }
  }

  stopMonitoring() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  measureOperation<T>(label: string, operation: () => T): T {
    console.log(`Starting operation: ${label}`)
    try {
      const result = operation()
      console.log(`Completed operation: ${label}`)
      return result
    } catch (error) {
      console.log(`Error in operation: ${label}`, error)
      throw error
    }
  }
}