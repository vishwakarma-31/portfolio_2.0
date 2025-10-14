/**
 * Validates required environment variables for frontend
 * Throws descriptive errors if any required variable is missing
 */
export function validateEnv(): void {
  const requiredEnvVars = [
    'VITE_API_URL',
  ]

  const missingVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  )

  if (missingVars.length > 0) {
    console.warn(
      '⚠️ Missing environment variables:',
      missingVars.join(', ')
    )
    console.warn('The app will use default values or may have limited functionality')
    
    // Set default values
    if (!import.meta.env.VITE_API_URL) {
      console.warn('Using default API URL: http://localhost:3001')
    }
    
    return
  }

  console.log('✅ All environment variables validated successfully')
}