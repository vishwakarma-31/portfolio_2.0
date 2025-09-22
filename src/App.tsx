import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import TransitionManager from './components/TransitionManager'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'
import LoadingSpinner from './components/LoadingSpinner'
import InteractiveCursorBackground from './components/InteractiveCursorBackground'
import { useRoutePreloader, useRouteCache, usePerformanceMonitoring } from './hooks/useRouteOptimization'

const Home = lazy(() => import('./pages/Home'))
const Skills = lazy(() => import('./pages/Skills'))
const Experience = lazy(() => import('./pages/Experience'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Education = lazy(() => import('./pages/Education'))

const AppContent: React.FC = () => {
  const { theme } = useTheme()
  // Theme is always 'dark' now, but keeping for consistency
  const isDark = true

  // Initialize performance optimizations
  useRoutePreloader()
  useRouteCache()
  usePerformanceMonitoring()

  return (
      <div className="space-theme relative min-h-screen overflow-hidden bg-black text-white">
          {/* Interactive starfield background (site-wide) */}
          <ThreeBackground />
          {/* Cursor-reactive gradient/ripple layer */}
          <InteractiveCursorBackground />

          {/* Navigation - Layer 50 */}
          <Navbar />

          {/* Page transitions and content - Layer 10 */}
          <TransitionManager>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/education" element={<Education />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Suspense>
          </TransitionManager>
        </div>
  )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App