import { useRef, useEffect, useState } from 'react';
import { Variants } from 'framer-motion';

export interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  once?: boolean;
}

interface ScrollRevealReturn {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  variants: Variants;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}): ScrollRevealReturn => {
  const {
    threshold = 0.1,
    delay = 0,
    duration = 0.6,
    distance = 30,
    direction = 'up',
    once = true
  } = options;

  const ref = useRef<HTMLElement>(null);
  // Immediately return true to make content visible by default
  const [isVisible, setIsVisible] = useState(true);

  // Removed the IntersectionObserver logic to disable scroll-triggered effects
  
  const getInitialState = () => {
    // Return the animate state instead of hidden state
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const variants = {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return {
    ref,
    isVisible,
    variants
  };
};

// Simple card animation variants
export const cardAnimationVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};