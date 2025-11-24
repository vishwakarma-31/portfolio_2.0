/**
 * Centralized logging utility
 * Allows easy control of logging levels and can be extended for production logging services
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

class Logger {
  private isDevelopment = import.meta.env.DEV
  private isProduction = import.meta.env.PROD

  private shouldLog(level: LogLevel): boolean {
    if (this.isProduction) {
      // In production, only log errors and warnings
      return level === 'error' || level === 'warn'
    }
    // In development, log everything
    return true
  }

  private formatMessage(level: LogLevel, message: string, data?: unknown): void {
    if (!this.shouldLog(level)) return

    const timestamp = new Date().toISOString()

    switch (level) {
      case 'error':
        console.error(`[${timestamp}] ERROR:`, message, data || '')
        break
      case 'warn':
        console.warn(`[${timestamp}] WARN:`, message, data || '')
        break
      case 'info':
        if (this.isDevelopment) {
          console.log(`[${timestamp}] INFO:`, message, data || '')
        }
        break
      case 'debug':
        if (this.isDevelopment) {
          console.log(`[${timestamp}] DEBUG:`, message, data || '')
        }
        break
    }

    // In production, you could send errors to a logging service
    if (this.isProduction && level === 'error') {
      // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
    }
  }

  debug(message: string, data?: unknown): void {
    this.formatMessage('debug', message, data)
  }

  info(message: string, data?: unknown): void {
    this.formatMessage('info', message, data)
  }

  warn(message: string, data?: unknown): void {
    this.formatMessage('warn', message, data)
  }

  error(message: string, data?: unknown): void {
    this.formatMessage('error', message, data)
  }
}

export const logger = new Logger()

