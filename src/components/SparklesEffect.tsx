import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SparklesEffect = ({
  interval = 300,
  color = 'bg-cyan-400',
  size = 'w-1 h-1'
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createSparkle = () => {
      const sparkle = document.createElement('div')
      sparkle.className = `absolute ${size} ${color} rounded-full animate-pulse`
      sparkle.style.left = Math.random() * 100 + '%'
      sparkle.style.top = Math.random() * 100 + '%'

      container.appendChild(sparkle)

      gsap.fromTo(sparkle,
        {
          opacity: 0,
          scale: 0,
          rotation: 0
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 360,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(sparkle, {
              opacity: 0,
              scale: 0,
              duration: 0.5,
              delay: Math.random() * 2,
              ease: "power2.in",
              onComplete: () => {
                container.removeChild(sparkle)
              }
            })
          }
        }
      )
    }

    const intervalId = setInterval(createSparkle, interval)

    return () => {
      clearInterval(intervalId)
      // Clean up any remaining sparkles
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [interval, color, size])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default SparklesEffect