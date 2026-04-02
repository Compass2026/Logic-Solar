import React from 'react';
import { Link } from 'react-router-dom';

export const StickyMobileCTA = () => {
  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100]">
      <Link 
        to="/contact" 
        className="flex items-center justify-center w-full bg-brand-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md active:scale-95 transition-transform"
      >
        Get My Free Solar Quote
      </Link>
    </div>
  );
};
