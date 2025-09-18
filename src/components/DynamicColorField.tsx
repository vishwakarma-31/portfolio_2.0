import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'

const DynamicColorField = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [colorZones] = useState([
    { x: 0.2, y: 0.3, radius: 0.3, color: [6, 182, 212], intensity: 0.8 },    // Cyan
    { x: 0.7, y: 0.2, radius: 0.25, color: [139, 92, 246], intensity: 0.6 }, // Purple
    { x: 0.5, y: 0.8, radius: 0.35, color: [236, 72, 153], intensity: 0.7 }, // Pink
    { x: 0.1, y: 0.7, radius: 0.2, color: [34, 197, 94], intensity: 0.5 },   // Green
    { x: 0.9, y: 0.6, radius: 0.28, color: [251, 146, 60], intensity: 0.6 }  // Orange
  ])

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const container = containerRef.current

    const resizeCanvas = () => {
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    const drawColorField = () => {
      if (!ctx) return

      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Create multiple color gradients influenced by cursor
      colorZones.forEach((zone, index) => {
        const gradient = ctx.createRadialGradient(
          zone.x * width + (mousePosition.x - 0.5) * 50,
          zone.y * height + (mousePosition.y - 0.5) * 50,
          0,
          zone.x * width + (mousePosition.x - 0.5) * 50,
          zone.y * height + (mousePosition.y - 0.5) * 50,
          zone.radius * Math.max(width, height)
        )

        // Calculate distance from mouse to zone center
        const dx = mousePosition.x - zone.x
        const dy = mousePosition.y - zone.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Increase intensity when mouse is near
        const proximityMultiplier = Math.max(0.3, 1.5 - distance * 2)
        const dynamicIntensity = zone.intensity * proximityMultiplier

        gradient.addColorStop(0, `rgba(${zone.color.join(',')}, ${dynamicIntensity * 0.4})`)
        gradient.addColorStop(0.5, `rgba(${zone.color.join(',')}, ${dynamicIntensity * 0.2})`)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.globalCompositeOperation = index === 0 ? 'source-over' : 'screen'
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      // Add cursor influence field
      const cursorGradient = ctx.createRadialGradient(
        mousePosition.x * width,
        mousePosition.y * height,
        0,
        mousePosition.x * width,
        mousePosition.y * height,
        150
      )

      cursorGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
      cursorGradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.1)')
      cursorGradient.addColorStop(0.7, 'rgba(139, 92, 246, 0.05)')
      cursorGradient.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = cursorGradient
      ctx.fillRect(0, 0, width, height)

      // Add noise texture for depth
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20
        data[i] = Math.max(0, Math.min(255, data[i] + noise))     // Red
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)) // Green
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)) // Blue
      }

      ctx.putImageData(imageData, 0, 0)
    }

    let animationFrame
    const animate = () => {
      drawColorField()
      animationFrame = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)
    container?.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      container?.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [mousePosition, handleMouseMove, colorZones])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-5 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-40"
        style={{
          filter: 'blur(1px) contrast(1.2) saturate(1.1)',
        }}
      />
      
      {/* Additional overlay effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255, 255, 255, 0.03) 0%, 
              transparent 30%),
            linear-gradient(45deg, 
              rgba(6, 182, 212, 0.02) 0%, 
              rgba(139, 92, 246, 0.02) 25%, 
              rgba(236, 72, 153, 0.02) 50%, 
              rgba(34, 197, 94, 0.02) 75%, 
              rgba(251, 146, 60, 0.02) 100%)
          `,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  )
}

export default DynamicColorField