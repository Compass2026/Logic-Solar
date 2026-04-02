import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4500); // Duration of the animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-brand-dark overflow-hidden"
        >
          {/* Dawn Background Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.4, 0.1] }}
            transition={{ duration: 4, times: [0, 0.3, 0.6, 1] }}
            className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 via-transparent to-transparent"
          />

          <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
            {/* The Sun */}
            <motion.div
              initial={{ y: 200, scale: 0.5, opacity: 0 }}
              animate={{ 
                y: -50, 
                scale: 1, 
                opacity: 1,
                boxShadow: [
                  "0 0 0px rgba(212, 175, 55, 0)",
                  "0 0 40px rgba(212, 175, 55, 0.4)",
                  "0 0 100px rgba(212, 175, 55, 0.6)"
                ]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeOut",
                boxShadow: { delay: 1, duration: 2, repeat: Infinity, repeatType: "mirror" }
              }}
              className="absolute w-32 h-32 bg-brand-gold rounded-full z-10"
            >
              {/* Rays */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5] }}
                  transition={{ delay: 2, duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 w-1 h-12 bg-brand-gold/40 origin-bottom"
                  style={{ 
                    transform: `translate(-50%, -100%) rotate(${i * 30}deg) translateY(-20px)` 
                  }}
                />
              ))}
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
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2">
                    {[...Array(16)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        animate={{ 
                          backgroundColor: [
                            "rgba(255,255,255,0.05)", 
                            "rgba(212, 175, 55, 0.3)", 
                            "rgba(212, 175, 55, 0.1)"
                          ] 
                        }}
                        transition={{ delay: 2.5 + (i * 0.3) + (j * 0.05), duration: 1 }}
                        className="rounded-sm"
                      />
                    ))}
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

          {/* Loading Text */}
          <div className="mt-12 text-center text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
             <motion.span
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               Harnessing Solar Energy
             </motion.span>
             <div className="mt-4 flex gap-1 justify-center">
               {[...Array(3)].map((_, i) => (
                 <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], backgroundColor: ["rgba(255,255,255,0.2)", "rgba(212,175,55,1)", "rgba(255,255,255,0.2)"] }}
                    transition={{ delay: i * 0.2, duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                 />
               ))}
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
