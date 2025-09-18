import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const FallingStarsEffect = ({
  interval = 800,
  color = 'from-cyan-400',
  height = 8
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createFallingStar = () => {
      const star = document.createElement('div')
      star.className = `absolute w-px h-${height} bg-gradient-to-b ${color} to-transparent rounded-full`
      star.style.left = Math.random() * 100 + '%'
      star.style.top = '-32px'

      container.appendChild(star)

      gsap.fromTo(star,
        {
          opacity: 0,
          scale: 0
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }
      )

      gsap.to(star, {
        y: window.innerHeight + 100,
        duration: Math.random() * 3 + 2,
        ease: "power1.in",
        onComplete: () => {
          if (container.contains(star)) {
            container.removeChild(star)
          }
        }
      })
    }

    const intervalId = setInterval(createFallingStar, interval)

    return () => {
      clearInterval(intervalId)
      // Clean up any remaining stars
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [interval, color, height])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-5"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default FallingStarsEffect