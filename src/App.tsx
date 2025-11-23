import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import TransitionManager from './components/TransitionManager'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'
import InteractiveCursorBackground from './components/InteractiveCursorBackground'

import { HelmetProvider } from 'react-helmet-async'

// Import pages directly instead of using lazy loading to avoid Suspense
import Home from './pages/Home'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Certifications from './pages/Certifications'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Education from './pages/Education'
import NotFound from './pages/NotFound'

const AppContent: React.FC = () => {
  return (
      <div className="space-theme relative min-h-screen overflow-hidden bg-black text-white select-none">
          {/* Interactive starfield background (site-wide) */}
          <ThreeBackground />
          {/* Cursor-reactive gradient/ripple layer */}
          <InteractiveCursorBackground />

          {/* Navigation - Layer 50 */}
          <Navbar />

          {/* Page transitions and content - Layer 10 */}
          <TransitionManager>
            <Routes>
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/education" element={<Education />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TransitionManager>
        </div>
  )
}

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App