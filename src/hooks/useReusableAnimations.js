import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useFadeInUp = (ref, delay = 0) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [ref, delay])
}

export const useSlideInLeft = (ref, delay = 0) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [ref, delay])
}

export const useSlideInRight = (ref, delay = 0) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      {
        opacity: 0,
        x: 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [ref, delay])
}

export const useScaleIn = (ref, delay = 0) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [ref, delay])
}

export const useStaggerAnimation = (selector, delay = 0) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (elements.length === 0) return

    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [selector, delay])
}

export const useHoverEffect = (ref, scale = 1.05) => {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
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
    }
  }, [ref, scale])
}

export const useMagneticEffect = (ref, strength = 0.3) => {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, strength])
}

export const useParallaxEffect = (ref, speed = 0.5) => {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }, [ref, speed])
}

export const useTextReveal = (ref, delay = 0) => {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const text = element.textContent
    element.textContent = ''

    // Create spans for each character
    const chars = text.split('')
    chars.forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(20px)'
      element.appendChild(span)

      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        delay: delay + index * 0.05,
        ease: "power2.out"
      })
    })
  }, [ref, delay])
}