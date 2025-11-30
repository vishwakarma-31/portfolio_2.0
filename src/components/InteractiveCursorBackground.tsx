/* eslint-disable react-hooks/exhaustive-deps */
 
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

interface MousePosition {
  x: number
  y: number
}

const InteractiveCursorBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 50, y: 50 })
  const [isMoving, setIsMoving] = useState(false)

  // Throttle function for mousemove events
  const throttle = (func: (...args: any[]) => void, limit: number) => {
    let inThrottle: boolean
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  const handleMouseMove = useCallback(throttle((e: MouseEvent) => {
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
      gsap.fromTo(
        ripple,
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
          },
        }
      )
    }

    // Reset moving state after delay
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    idleTimeoutRef.current = setTimeout(() => setIsMoving(false), 150)
  }, 16), []) // ~60fps limit

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
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
        ease: 'power2.out',
      })
    }
  }, [mousePosition])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          opacity: isMoving ? 1 : 0.7,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      <div 
        ref={rippleRef}
        className="absolute inset-0"
      />
    </div>
  )
}

export default InteractiveCursorBackground