import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use MotionValues to avoid React re-renders on every pixel move
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, cursorX, cursorY]);

  // Dot springs
  const dotX = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 });
  const dotY = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 });
  
  // Glow springs (more delayed for trail effect)
  const glowX = useSpring(cursorX, { damping: 40, stiffness: 150, mass: 1 });
  const glowY = useSpring(cursorY, { damping: 40, stiffness: 150, mass: 1 });

  // For touch devices, don't render
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Intense Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-screen bg-cyan-400"
        style={{
          x: dotX,
          y: dotY,
          marginLeft: '-6px',
          marginTop: '-6px',
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
      />
      
      {/* Interactive Ring / Hover State */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2 border-cyan-400 mix-blend-screen"
        style={{
          width: 40,
          height: 40,
          x: dotX,
          y: dotY,
          marginLeft: '-20px',
          marginTop: '-20px',
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0
        }}
      />
      
      {/* Blurred Trailing Glow */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full bg-cyan-500/15 blur-[25px] pointer-events-none z-[9998]"
        style={{
          x: glowX,
          y: glowY,
          marginLeft: '-80px',
          marginTop: '-80px',
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
      />
    </>
  );
};
