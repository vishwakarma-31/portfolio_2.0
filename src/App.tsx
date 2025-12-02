import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TransitionManager from './components/TransitionManager'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'

import { HelmetProvider } from 'react-helmet-async'

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'))
const Skills = React.lazy(() => import('./pages/Skills'))
const Experience = React.lazy(() => import('./pages/Experience'))
const Certifications = React.lazy(() => import('./pages/Certifications'))
const Projects = React.lazy(() => import('./pages/Projects'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Education = React.lazy(() => import('./pages/Education'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const AppContent: React.FC = () => {
  return (
      <div className="space-theme relative min-h-screen overflow-hidden bg-black text-white select-none">
          {/* Interactive starfield background (site-wide) */}
          <ThreeBackground />

          {/* Navigation - Layer 50 */}
          <Navbar />

          {/* Page transitions and content - Layer 10 */}
          <TransitionManager>
            <Suspense fallback={null}>  
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
            </Suspense>
          </TransitionManager>
        </div>
  )
}

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  )
}

export default App