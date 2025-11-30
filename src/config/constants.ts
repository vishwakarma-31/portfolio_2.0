/**
 * Application constants and configuration
 * URLs and other hardcoded values should be moved here
 */

export const APP_CONFIG = {
  // Site URLs
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://vishwakarma-31-portfolio.vercel.app',
  
  // Social Media URLs
  GITHUB_URL: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Aryan2764',
  LINKEDIN_URL: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/aryan-vishwakarma-b77274257',
  
  // API URLs
  API_URL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001'),
} as const

export const SOCIAL_LINKS = {
  github: APP_CONFIG.GITHUB_URL,
  linkedin: APP_CONFIG.LINKEDIN_URL,
} as const

