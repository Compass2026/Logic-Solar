import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { Sun } from 'lucide-react';

export const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer subtle glow - Disabled on mobile for performance */}
      {!isMobile && (
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
      )}
      
      {/* Middle subtle glow - Smaller and less blurred on mobile */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        animate={{ 
          opacity: isVisible ? (isClicking ? 0.45 : 0.25) : 0,
          scale: isClicking ? 1.2 : 1.1,
          blur: isMobile ? '20px' : '60px',
        }}
        style={{
          x: cursorX,
          y: cursorY,
          width: isMobile ? 120 : 250,
          height: isMobile ? 120 : 250,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(249, 205, 13, 0.5) 0%, rgba(249, 205, 13, 0.1) 60%, rgba(249, 205, 13, 0) 100%)',
          filter: isMobile ? 'blur(20px)' : 'blur(60px)',
        }}
      />

      {/* Center Sun Icon */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 1.5 : 1,
          rotate: isVisible ? 360 : 0,
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.3 },
          scale: { duration: 0.2 }
        }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative">
          {/* Sun Core Glow */}
          <div className="absolute inset-0 bg-brand-gold rounded-full blur-[8px] opacity-60 animate-pulse" />
          <Sun 
            className="w-6 h-6 text-brand-gold relative z-10 drop-shadow-[0_0_8px_rgba(249,205,13,0.8)]" 
            strokeWidth={2.5}
          />
        </div>
      </motion.div>
    </div>
  );
};
