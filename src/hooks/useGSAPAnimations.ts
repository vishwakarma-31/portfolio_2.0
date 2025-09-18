import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGSAPAnimations = (enabled: boolean = true) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run animations if enabled
    if (!enabled) return

    const listeners: Array<{ element: HTMLElement, event: string, handler: EventListener }> = []

    const ctx = gsap.context(() => {
      // Magnetic button effect - only for home page
      const buttons = gsap.utils.toArray<HTMLElement>('.magnetic-btn')

      buttons.forEach((btn) => {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e
          const { left, top, width, height } = btn.getBoundingClientRect()
          const centerX = left + width / 2
          const centerY = top + height / 2
          const deltaX = (clientX - centerX) / width
          const deltaY = (clientY - centerY) / height

          gsap.to(btn, {
            x: deltaX * 10,
            y: deltaY * 10,
            duration: 0.3,
            ease: 'power2.out'
          })
        }

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          })
        }

        btn.addEventListener('mousemove', handleMouseMove)
        btn.addEventListener('mouseleave', handleMouseLeave)

        listeners.push({ element: btn, event: 'mousemove', handler: handleMouseMove as EventListener })
        listeners.push({ element: btn, event: 'mouseleave', handler: handleMouseLeave as EventListener })
      })

    }, containerRef)

    return () => {
      ctx.revert()
      listeners.forEach(({ element, event, handler }) => element.removeEventListener(event, handler))
    }
  }, [enabled])

  return containerRef
}