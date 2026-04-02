import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
        setIsVisible(true);
        setIsClicking(true);
      }
    };

    const handleTouchEnd = () => {
      setIsClicking(false);
      setTimeout(() => setIsVisible(false), 800);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer subtle glow */}
      <motion.div
        className="absolute top-0 left-0 rounded-full blur-[100px]"
        animate={{ 
          opacity: isVisible ? (isClicking ? 0.3 : 0.15) : 0,
          scale: isClicking ? 0.9 : 1.1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          width: 600,
          height: 600,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(249, 205, 13, 0.4) 0%, rgba(249, 205, 13, 0.15) 40%, rgba(249, 205, 13, 0) 70%)',
        }}
      />
      
      {/* Middle subtle glow */}
      <motion.div
        className="absolute top-0 left-0 rounded-full blur-[60px]"
        animate={{ 
          opacity: isVisible ? (isClicking ? 0.45 : 0.25) : 0,
          scale: isClicking ? 1.2 : 1.1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          width: 250,
          height: 250,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(249, 205, 13, 0.5) 0%, rgba(249, 205, 13, 0.1) 60%, rgba(249, 205, 13, 0) 100%)',
        }}
      />

      {/* Center core - sharp yellow point */}
      <motion.div
        className="absolute top-0 left-0 w-3 h-3 bg-brand-gold rounded-full blur-[4px] shadow-[0_0_15px_rgba(249,205,13,0.6)]"
        animate={{ 
          opacity: isVisible ? 0.9 : 0,
          scale: isClicking ? 2 : 1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};
