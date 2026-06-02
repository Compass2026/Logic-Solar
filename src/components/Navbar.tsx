import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { siteData } from '../data/siteData';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isRoofing = location.pathname === '/roofing';
  const isDarkNav = isHome || isRoofing;


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
        scrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 py-4" : "py-6"
      )}
      style={!scrolled ? {
        backgroundColor: 'rgba(27, 42, 51, 0.92)',
        backdropFilter: 'blur(18px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 4px 32px rgba(33,97,102,0.18), inset 0 1px 0 rgba(255,255,255,0.15)',
      } : {}}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to={isRoofing ? "/roofing" : "/"} className="flex items-center group relative h-10 md:h-12 w-auto">
          {isRoofing ? (
            <span className={cn(
              "text-2xl font-black tracking-tighter transition-all duration-300 group-hover:scale-105",
              (scrolled || isDarkNav) ? "text-brand-dark" : "text-white"
            )}>
              LOGIC <span className="text-brand-gold">ROOFING</span>
            </span>
          ) : (
            <img 
              src="/logo.png" 
              alt="Logic Solar" 
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105" 
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {siteData.nav.map((item) => (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.children ? (
                <button 
                  className={cn(
                    "flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-widest transition-colors py-2",
                    scrolled ? "text-brand-dark/60 hover:text-brand-dark" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.name}
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeDropdown === item.name && "rotate-180")} />
                </button>
              ) : (
                <Link 
                  to={item.href}
                  className={cn(
                    "text-[13px] font-bold uppercase tracking-widest transition-colors py-2",
                    scrolled ? "text-brand-dark/60 hover:text-brand-dark" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              )}

              {item.children && (
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300",
                  activeDropdown === item.name ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                )}>
                  <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-3 min-w-[260px] overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-5 py-4 text-sm font-bold text-brand-dark/60 hover:text-brand-dark hover:bg-gray-50 rounded-xl transition-all"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="/contact"
            style={{ backgroundColor: '#f9cd0d', color: '#1b2a33', padding: '10px 22px', borderRadius: '999px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(249,205,13,0.3)' }}
          >
            Get My Free Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
            scrolled ? "bg-brand-dark/5 text-brand-dark" : "bg-white/20 text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-0 bg-white z-[60] lg:hidden transition-all duration-500 ease-in-out",
        isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col h-full p-8 pt-24 overflow-y-auto pb-24">
          <div className="flex-grow space-y-8">
            {siteData.nav.map((item) => (
              <div key={item.name} className="space-y-4">
                {item.children ? (
                  <>
                    <div className="text-xs font-black text-brand-dark/30 uppercase tracking-[0.3em]">
                      {item.name}
                    </div>
                    <div className="space-y-6">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block text-2xl font-extrabold text-brand-dark hover:text-brand-gold transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block text-3xl font-extrabold text-brand-dark hover:text-brand-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="pt-10 border-t border-gray-100 space-y-4">
            <a
              href={`tel:${siteData.contact.phone.replace(/[^+\d]/g, '')}`}
              className="block w-full bg-brand-green text-white text-center py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl"
            >
              📞 Give Us a Call
            </a>
            <Link 
              to="/contact" 
              className="block w-full bg-brand-gold text-brand-dark text-center py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl"
            >
              Get My Free Solar Quote
            </Link>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
