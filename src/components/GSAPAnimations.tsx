import React, { useEffect } from 'react'
import { gsap } from 'gsap'

const GSAPAnimations: React.FC = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const buttons = gsap.utils.toArray('.magnetic-btn') as HTMLElement[]
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
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}

export default GSAPAnimations