/* eslint-disable react-hooks/unsupported-syntax */
import React, { useEffect, useRef } from 'react'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', ...props }) => {
  const buttonRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Throttled mouse move handler
    const throttledMouseMove = throttle((e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      })
    }, 16) // ~60fps limit

    const handleMouseLeave = () => {
      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        button.style.transform = 'translate(0px, 0px)'
        button.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      })
    }

    button.addEventListener('mousemove', throttledMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', throttledMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={buttonRef} 
      className={`magnetic-btn ${className}`} 
      style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      {...props}
    >
      {children}
    </div>
  )
}