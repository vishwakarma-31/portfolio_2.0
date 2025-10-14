import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'
import 'reflect-metadata'
import { validateEnv } from './utils/validateEnv'

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Validate environment variables
validateEnv()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)