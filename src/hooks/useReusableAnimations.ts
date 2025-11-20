import { useEffect, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Simplified and most effective animations only

export const useFadeInUp = (ref: RefObject<HTMLElement>, delay: number = 0): void => {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const animation = gsap.fromTo(element,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [ref, delay])
}

export const useStaggerAnimation = (selector: string, delay: number = 0): void => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (elements.length === 0) return

    const firstElement = elements[0] as HTMLElement
    const animation = gsap.fromTo(elements,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: firstElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === firstElement) {
          trigger.kill()
        }
      })
    }
  }, [selector, delay])
}

export const useHoverEffect = (ref: RefObject<HTMLElement>, scale: number = 1.05): void => {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    let animation: gsap.core.Tween | null = null

    const handleMouseEnter = () => {
      animation = gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      animation = gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (animation) {
        animation.kill()
      }
    }
  }, [ref, scale])
}

