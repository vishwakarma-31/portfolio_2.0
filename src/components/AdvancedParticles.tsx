import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const AdvancedParticles = ({
  particleCount = 50,
  colors = ['bg-cyan-400', 'bg-purple-400', 'bg-pink-400', 'bg-blue-400', 'bg-emerald-400'],
  sizeRange = { min: 2, max: 8 },
  className = "fixed inset-0 pointer-events-none z-0",
  style = { mixBlendMode: 'screen' }
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full pointer-events-none'

      // Random size and color
      const size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.className += ` ${color} opacity-60`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'

      container.appendChild(particle)
      particles.push(particle)

      // Animate each particle
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
      })

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 5,
        ease: "none",
        repeat: -1,
        yoyo: true
      })

      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      })
    }

    return () => {
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      })
    }
  }, [particleCount, colors, sizeRange])

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
    />
  )
}

export default AdvancedParticles