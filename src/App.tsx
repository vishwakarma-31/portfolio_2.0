import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'

import { HelmetProvider } from 'react-helmet-async'

// Standard imports instead of React.lazy() to prevent Framer Motion from freezing 
// at opacity: 0 during chunk loading on page switches.
import Home from './pages/Home'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Certifications from './pages/Certifications'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import Education from './pages/Education'
import NotFound from './pages/NotFound'

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
    className="w-full min-h-screen relative overflow-hidden"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
        <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/project/:projectId" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/education" element={<PageWrapper><Education /></PageWrapper>} />
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  return (
      <div className="space-theme relative min-h-screen overflow-hidden bg-black text-white select-none">
          {/* Interactive starfield background (site-wide) - Persistent during transitions */}
          <Suspense fallback={<div className="fixed inset-0 bg-black w-full h-full" />}>
            <ThreeBackground />
          </Suspense>

          {/* Navigation - Layer 50 */}
          <Navbar />

          {/* Page transitions and content - Layer 10 */}
          <AnimatedRoutes />
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