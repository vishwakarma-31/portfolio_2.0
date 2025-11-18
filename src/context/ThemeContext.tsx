import React, { createContext, useEffect, ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode;
}

// Simplified theme context - always dark mode, no toggle
const ThemeContext = createContext<{} | undefined>(undefined)

export const useTheme = () => {
  // Always return dark theme - no toggle functionality
  return { theme: 'dark' as const }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Set dark theme permanently on mount
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  )
}