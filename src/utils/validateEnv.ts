import { logger } from './logger'

/**
 * Validates required environment variables for frontend
 * Logs errors if any required variable is missing (doesn't throw in production)
 */
export function validateEnv(): void {
  const requiredEnvVars = [
    'VITE_API_URL',
    'VITE_SITE_URL',
    'VITE_GITHUB_URL',
    'VITE_LINKEDIN_URL'
  ]

  const missingVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  )

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}. The app may have limited functionality.`
    
    // In production, log error but don't throw. In development, warn but continue
    if (import.meta.env.PROD) {
      console.error(errorMessage)
      // In production, we should have proper error handling but not throw to avoid app crashes
      // Log to external service in production if needed
    } else {
      logger.warn('⚠️', errorMessage)
      // Set default values for development
      if (!import.meta.env.VITE_API_URL) {
        logger.warn('Using default API URL: http://localhost:3001')
      }
      if (!import.meta.env.VITE_SITE_URL) {
        logger.warn('Using default SITE URL: https://vishwakarma-31-portfolio.vercel.app')
      }
      if (!import.meta.env.VITE_GITHUB_URL) {
        logger.warn('Using default GITHUB URL: https://github.com/vishwakarma-31')
      }
      if (!import.meta.env.VITE_LINKEDIN_URL) {
        logger.warn('Using default LINKEDIN URL: https://linkedin.com/in/aryan-vishwakarma')
      }
    }
    return
  }

  logger.info('✅ All environment variables validated successfully')
}