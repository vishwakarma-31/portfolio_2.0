import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export const usePageTransition = () => {
  const location = useLocation()
  const transitionRef = useRef(null)

  useEffect(() => {
    const handlePageEnter = () => {
      const tl = gsap.timeline()

      // Page enter animation
      tl.fromTo(transitionRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out"
        }
      )

      // Stagger child elements
      tl.fromTo('.page-element',
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.4"
      )

      return tl
    }

    const handlePageExit = () => {
      const tl = gsap.timeline()

      tl.to(transitionRef.current, {
        opacity: 0,
        y: -30,
        scale: 1.02,
        filter: "blur(5px)",
        duration: 0.5,
        ease: "power2.in"
      })

      return tl
    }

    // Trigger enter animation
    const enterTl = handlePageEnter()

    // Cleanup function
    return () => {
      enterTl.kill()
    }
  }, [location.pathname])

  return transitionRef
}

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return

      e.preventDefault()
      const targetId = target.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement.offsetTop - 80,
            autoKill: true
          },
          ease: "power2.inOut"
        })
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])
}

export const useIntersectionAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target

          gsap.fromTo(element,
            {
              opacity: 0,
              y: 50,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            }
          )

          observer.unobserve(element)
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}