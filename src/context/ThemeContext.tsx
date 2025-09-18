import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { ThemeContextType } from '../types'

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    }
    setIsInitialized(true)
  }, [])

  // Update document class when theme changes
  useEffect(() => {
    if (!isInitialized) return
    
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    
    // Also set data attribute for additional CSS targeting
    root.setAttribute('data-theme', theme)
  }, [theme, isInitialized])

  const toggleTheme = (): void => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}