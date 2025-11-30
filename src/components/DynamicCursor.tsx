/* eslint-disable react-hooks/unsupported-syntax */
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface DynamicCursorProps {
  cursorColor?: string
  followerColor?: string
  cursorSize?: number
  followerSize?: number
}

const DynamicCursor: React.FC<DynamicCursorProps> = ({
  cursorColor = 'bg-cyan-400',
  followerColor = 'border-cyan-400/50',
  cursorSize = 8,
  followerSize = 28,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)
  const [, setIsVisible] = useState(true)

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
    const cursor = cursorRef.current
    const follower = followerRef.current
    const glow = glowRef.current
    if (!cursor || !follower || !glow) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // Detect keyboard navigation
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true)
        cursor!.style.display = 'none'
        follower!.style.display = 'none'
        glow!.style.display = 'none'
      }
    }

    // Throttled mouse move handler
    const throttledMouseMove = throttle((e: globalThis.MouseEvent): void => {
      // Show cursor when mouse moves (keyboard user switched to mouse)
      if (isKeyboardUser) {
        setIsKeyboardUser(false)
        cursor!.style.display = 'block'
        follower!.style.display = 'block'
        glow!.style.display = 'block'
      }

      mouseX = e.clientX
      mouseY = e.clientY

      // Simple cursor movement with GSAP for smoothness
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(glow, {
        x: mouseX,
        y: mouseY,
        duration: 0.2,
        ease: 'power2.out',
      })
    }, 16) // ~60fps limit

    window.addEventListener('keydown', handleKeyDown)

    let animationFrameId: number | null = null

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15

      gsap.set(follower, {
        x: followerX - followerSize / 2,
        y: followerY - followerSize / 2,
      })

      animationFrameId = requestAnimationFrame(animateFollower)
    }

    document.addEventListener('mousemove', throttledMouseMove)
    animationFrameId = requestAnimationFrame(animateFollower)

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      setIsVisible(false)
      if (cursor) cursor.style.opacity = '0'
      if (follower) follower.style.opacity = '0'
      if (glow) glow.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
      if (cursor) cursor.style.opacity = '1'
      if (follower) follower.style.opacity = '1'
      if (glow) glow.style.opacity = '1'
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isKeyboardUser, cursorSize, followerSize])

  return (
    <>
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 bg-cyan-400/20 rounded-full pointer-events-none z-30 blur-xl"
        style={{
          width: `${cursorSize * 4}px`,
          height: `${cursorSize * 4}px`,
          transform: 'translate(-50%, -50%)',
          opacity: 0.4,
        }}
      />

      {/* Follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 border-2 ${followerColor} rounded-full pointer-events-none z-40`}
        style={{
          width: `${followerSize}px`,
          height: `${followerSize}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
        }}
      />

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`${cursorColor} rounded-full pointer-events-none z-50`}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      />
    </>
  )
}

export default DynamicCursor