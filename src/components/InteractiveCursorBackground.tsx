import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

const InteractiveCursorBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const gradientRef = useRef<HTMLDivElement | null>(null)
  const rippleRef = useRef<HTMLDivElement | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isMoving, setIsMoving] = useState(false)
  const idleTimeoutRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
    setIsMoving(true)

    // Create ripple effect at cursor position
    if (rippleRef.current) {
      const ripple = document.createElement('div')
      ripple.className = 'absolute pointer-events-none rounded-full opacity-30'
      ripple.style.left = `${x}%`
      ripple.style.top = `${y}%`
      ripple.style.width = '4px'
      ripple.style.height = '4px'
      ripple.style.background = 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)'
      ripple.style.transform = 'translate(-50%, -50%)'
      rippleRef.current.appendChild(ripple)

      // Animate ripple
      gsap.fromTo(ripple,
        { scale: 0, opacity: 0.6 },
        {
          scale: 8,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => {
            if (rippleRef.current && rippleRef.current.contains(ripple)) {
              rippleRef.current.removeChild(ripple)
            }
          }
        })
    }

    // Reset moving state after delay
    if (idleTimeoutRef.current) window.clearTimeout(idleTimeoutRef.current)
    idleTimeoutRef.current = window.setTimeout(() => setIsMoving(false), 150)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (idleTimeoutRef.current) window.clearTimeout(idleTimeoutRef.current)
    }
  }, [handleMouseMove])

  useEffect(() => {
    if (gradientRef.current) {
      // Smooth gradient following cursor
      gsap.to(gradientRef.current, {
        background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
          rgba(6, 182, 212, 0.15), 
          rgba(139, 92, 246, 0.1), 
          rgba(236, 72, 153, 0.05), 
          transparent 50%)`,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [mousePosition])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {/* Dynamic gradient background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, 
            rgba(6, 182, 212, 0.1), 
            rgba(139, 92, 246, 0.08), 
            rgba(236, 72, 153, 0.03), 
            transparent 50%)`
        }}
      />

      {/* Ripple effects container */}
      <div ref={rippleRef} className="absolute inset-0" />

      {/* Floating cursor follower */}
      <div
        className={`absolute w-32 h-32 rounded-full pointer-events-none transition-all duration-500 ease-out ${
          isMoving ? 'opacity-30' : 'opacity-20'
        }`}
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Secondary follower with delay */}
      <div
        className={`absolute w-64 h-64 rounded-full pointer-events-none transition-all duration-700 ease-out ${
          isMoving ? 'opacity-20' : 'opacity-10'
        }`}
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Animated mesh pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
    </div>
  )
}

export default InteractiveCursorBackground