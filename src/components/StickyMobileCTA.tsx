import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [funnelOnScreen, setFunnelOnScreen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On the homepage the bar leads to the savings funnel, and steps aside while
  // the funnel is on screen so it never covers the funnel's buttons or form.
  useEffect(() => {
    setFunnelOnScreen(false);
    if (!isHome) return;
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setFunnelOnScreen(entry.isIntersecting));
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const attach = () => {
      const funnel = document.getElementById('quote-form');
      if (funnel) observer.observe(funnel);
      else if (tries++ < 20) timer = setTimeout(attach, 250);
    };
    attach();
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [isHome]);

  const show = isVisible && !funnelOnScreen;
  const className = "flex items-center justify-center w-full bg-brand-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md active:scale-95 transition-transform";

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-6 left-6 right-6 z-[100] transition-all duration-500 ease-in-out",
        show ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0 pointer-events-none"
      )}
    >
      {isHome ? (
        <a href="#quote-form" className={className}>
          Get My Free Solar Quote
        </a>
      ) : (
        <Link to="/contact" className={className}>
          Get My Free Solar Quote
        </Link>
      )}
    </div>
  );
};
