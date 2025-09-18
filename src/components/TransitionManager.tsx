import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
// ScrollToPlugin is registered globally in main.tsx

const TransitionManager = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  useEffect(() => {
    // Smooth scroll to top on page change
    gsap.to(window, {
      duration: 0.3,
      scrollTo: { y: 0, autoKill: true },
      ease: "power2.inOut"
    })

    // Store current path for next navigation
    window.history.replaceState({ prevPath: location.pathname }, '')

    // Trigger smooth page transition
    const tl = gsap.timeline()

    // Page enter animation with stagger
    tl.fromTo('.page-content',
      {
        opacity: 0,
        y: 20,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }
    )

    // Stagger child elements
    tl.fromTo('.page-element',
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4"
    )

  }, [location.pathname])

  return (
    <div className="w-full min-h-screen">
      <div className="page-content w-full min-h-screen">
        {children}
      </div>
    </div>
  )
}

export default TransitionManager