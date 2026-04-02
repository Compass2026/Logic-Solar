import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds for progress
    const interval = 40; // 40ms updates
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'brightness(2)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
        >
          {/* Dawn Background Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0.4, 0.1],
              scale: [1, 1.2, 1.1, 1]
            }}
            transition={{ duration: 4, times: [0, 0.3, 0.6, 1] }}
            className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 via-transparent to-transparent"
          />

          <div className="relative w-full max-w-xl aspect-square flex flex-col items-center justify-center">
            {/* The Sun - Rising synced with progress */}
            <motion.div
              style={{ 
                y: (1 - progress / 100) * 200 - 50,
                opacity: progress / 100,
                scale: 0.5 + (progress / 100) * 0.5
              }}
              className="absolute w-32 h-32 bg-brand-gold rounded-full z-10"
            >
              {/* Rays - Intensify as progress increases */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: (progress / 100) * 0.6,
                    height: 12 + (progress / 100) * 20
                  }}
                  className="absolute top-1/2 left-1/2 w-1 bg-brand-gold/40 origin-bottom"
                  style={{ 
                    transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-20px)` 
                  }}
                />
              ))}
              
              {/* Core Glow */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-brand-gold blur-2xl opacity-40"
              />
            </motion.div>

            {/* Solar Panels (Isometric View) */}
            <div className="absolute bottom-1/4 w-full flex justify-center gap-4 px-12 z-20">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ rotateX: 60, rotateZ: -10, y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (i * 0.2), duration: 1 }}
                  className="relative w-40 h-32 bg-black/40 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm"
                >
                  {/* Grid Cells - Light up based on progress */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2">
                    {[...Array(16)].map((_, j) => {
                      const cellThreshold = (i * 16 + j) / 48 * 100;
                      return (
                        <motion.div
                          key={j}
                          animate={{ 
                            backgroundColor: progress > cellThreshold 
                              ? "rgba(249, 205, 13, 0.3)" 
                              : "rgba(255, 255, 255, 0.05)",
                            boxShadow: progress > cellThreshold 
                              ? "0 0 10px rgba(249, 205, 13, 0.2)" 
                              : "none"
                          }}
                          transition={{ duration: 0.5 }}
                          className="rounded-sm"
                        />
                      );
                    })}
                  </div>
                  {/* Surface Reflection */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ delay: 3, duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Power Bar Container */}
          <div className="mt-16 w-full max-w-md px-8 relative">
            <div className="flex justify-between items-end mb-3">
              <div className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">
                System Power
              </div>
              <div className="text-[14px] font-black text-white/80 font-mono tracking-tighter">
                {Math.round(progress)}%
              </div>
            </div>
            
            {/* The Bar */}
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-gold shadow-[0_0_15px_rgba(249,205,13,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Glowing Embers */}
            <motion.div 
              style={{ left: `${progress}%` }}
              className="absolute top-[26px] -translate-x-1/2 w-4 h-4 bg-brand-gold rounded-full blur-[8px] opacity-40 pointer-events-none"
            />
          </div>

          {/* Loading Subtext */}
          <div className="mt-8 text-center text-white/30 font-bold uppercase tracking-[0.5em] text-[8px]">
             <motion.span
               animate={{ opacity: [0.4, 0.8, 0.4] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               harnessing the power of the sun
             </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

