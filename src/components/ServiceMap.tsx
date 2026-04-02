import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { USA_MAP_PATHS } from '../data/mapData';
import { MapPin, Sun } from 'lucide-react';

const ACTIVE_STATES = ['MO', 'IL', 'KS', 'OK', 'TX'];

export const ServiceMap = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getProvinceName = (id: string) => {
    // Basic mapping for tooltips if needed
    const names: Record<string, string> = {
      'MO': 'Missouri',
      'IL': 'Illinois',
      'KS': 'Kansas',
      'OK': 'Oklahoma',
      'TX': 'Texas'
    };
    return names[id] || id;
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
            <MapPin className="w-3 h-3 text-brand-gold" />
            Our Service Area
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight">
            Expanding Across <span className="text-brand-gold">The Heartland.</span>
          </h2>
          <p className="text-xl text-brand-dark/60 leading-relaxed font-medium">
            Logic Solar is proud to serve homeowners across the Midwest and South, bringing premium energy solutions to five key states.
          </p>
        </div>

        <div className="relative aspect-[16/9] max-w-5xl mx-auto w-full">
          <svg
            viewBox="0 0 960 600"
            className="w-full h-full filter drop-shadow-2xl"
            style={{ 
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.05))' 
            }}
          >
            {Object.entries(USA_MAP_PATHS).map(([id, path]) => {
              const isActive = ACTIVE_STATES.includes(id);
              const isHovered = hoveredState === id;

              return (
                <motion.path
                  key={id}
                  d={path}
                  initial={false}
                  animate={{
                    fill: isHovered && isActive 
                      ? '#F9CD0D' // brand-gold
                      : isActive 
                        ? '#216166' // brand-teal
                        : '#F3F4F6', // gray-100
                    stroke: isActive ? '#F9CD0D' : '#E5E7EB',
                    strokeWidth: isActive ? 2 : 1,
                    scale: isHovered && isActive ? 1.02 : 1,
                    zIndex: isHovered ? 50 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredState(id)}
                  onMouseLeave={() => setHoveredState(null)}
                  className={`cursor-pointer outline-none transition-all ${isActive ? 'z-10' : 'z-0'}`}
                  style={{
                    transformOrigin: 'center center',
                    filter: isHovered && isActive 
                      ? 'drop-shadow(0 0 15px rgba(249, 205, 13, 0.8))' 
                      : 'none'
                  }}
                />
              );
            })}
          </svg>

          {/* Legend / Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
            {ACTIVE_STATES.map((id) => (
              <div 
                key={id}
                onMouseEnter={() => setHoveredState(id)}
                onMouseLeave={() => setHoveredState(null)}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  hoveredState === id 
                    ? 'bg-brand-gold border-brand-gold shadow-lg -translate-y-1' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className={`text-xs font-black mb-1 ${hoveredState === id ? 'text-brand-dark' : 'text-brand-gold'}`}>
                  {id}
                </div>
                <div className={`font-bold tracking-tight ${hoveredState === id ? 'text-brand-dark' : 'text-brand-dark'}`}>
                  {getProvinceName(id)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
