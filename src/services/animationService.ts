import { gsap } from 'gsap'
import React from 'react'

// Animation service to handle complex animations
export class AnimationService {
  static initializeFloatingIcons(containerRef: React.RefObject<HTMLElement>) {
    if (!containerRef.current) return
    
    const ctx = gsap.context(() => {
      // Simple floating icons animation - only for home page
      gsap.to('.floating-icon', {
        y: 'random(-20, 20)',
        x: 'random(-15, 15)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 6)',
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: 'random'
        }
      })
    }, containerRef.current)
    
    return ctx
  }

  static cleanupContext(ctx: gsap.Context) {
    ctx.revert()
  }
}