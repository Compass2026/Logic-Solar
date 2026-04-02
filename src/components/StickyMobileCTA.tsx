import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "lg:hidden fixed bottom-6 left-6 right-6 z-[100] transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0 pointer-events-none"
      )}
    >
      <Link 
        to="/contact" 
        className="flex items-center justify-center w-full bg-brand-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md active:scale-95 transition-transform"
      >
        Get My Free Solar Quote
      </Link>
    </div>
  );
};
