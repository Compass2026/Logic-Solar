import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { USA_MAP_PATHS } from '../data/mapData';
import { INSTALL_LOCATIONS, InstallLocation } from '../data/install-locations';
import { MapPin, Sun, X } from 'lucide-react';

const ACTIVE_STATES = ['MO', 'IL', 'KS', 'OK', 'TX'];

// Geographic bounds for active states used for marker interpolation
const STATE_GEO_BOUNDS: Record<string, { lat: [number, number], lng: [number, number] }> = {
  'MO': { lat: [36.0, 40.6], lng: [-95.8, -89.1] },
  'IL': { lat: [37.0, 42.5], lng: [-91.5, -87.5] },
  'KS': { lat: [37.0, 40.0], lng: [-102.0, -94.6] },
  'OK': { lat: [33.6, 37.0], lng: [-103.0, -94.4] },
  'TX': { lat: [25.8, 36.5], lng: [-106.6, -93.5] }
};

const getPathBounds = (path: string) => {
  let currX = 0;
  let currY = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const commands = path.split(/(?=[MmLlVvHhZz])/);
  
  for (const cmd of commands) {
    const type = cmd[0];
    const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));

    if (type === 'M') {
      currX = args[0];
      currY = args[1];
    } else if (type === 'm') {
      currX += args[0];
      currY += args[1];
    } else if (type === 'L') {
      for (let i = 0; i < args.length; i += 2) {
        currX = args[i];
        currY = args[i+1];
        minX = Math.min(minX, currX); minY = Math.min(minY, currY);
        maxX = Math.max(maxX, currX); maxY = Math.max(maxY, currY);
      }
    } else if (type === 'l') {
      for (let i = 0; i < args.length; i += 2) {
        currX += args[i];
        currY += args[i+1];
        minX = Math.min(minX, currX); minY = Math.min(minY, currY);
        maxX = Math.max(maxX, currX); maxY = Math.max(maxY, currY);
      }
    } else if (type === 'v') {
      for (const arg of args) {
        currY += arg;
        minY = Math.min(minY, currY); maxY = Math.max(maxY, currY);
      }
    } else if (type === 'h') {
      for (const arg of args) {
        currX += arg;
        minX = Math.min(minX, currX); maxX = Math.max(maxX, currX);
      }
    }
    
    if (minX === Infinity || isNaN(minX)) {
      minX = currX; minY = currY; maxX = currX; maxY = currY;
    } else {
      minX = Math.min(minX, currX); minY = Math.min(minY, currY);
      maxX = Math.max(maxX, currX); maxY = Math.max(maxY, currY);
    }
  }

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};

export const ServiceMap = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<InstallLocation | null>(null);

  const getProvinceName = (id: string) => {
    const names: Record<string, string> = {
      'MO': 'Missouri',
      'IL': 'Illinois',
      'KS': 'Kansas',
      'OK': 'Oklahoma',
      'TX': 'Texas'
    };
    return names[id] || id;
  };

  // Compute zoomed viewBox
  const getTargetViewBox = () => {
    if (!selectedState) return "0 0 960 600";
    
    const path = USA_MAP_PATHS[selectedState];
    if (!path) return "0 0 960 600";

    const bounds = getPathBounds(path);
    const padding = 40;
    
    // Maintain 16:9 aspect ratio if possible, or just use bounds with padding
    return `${bounds.x - padding} ${bounds.y - padding} ${bounds.width + padding * 2} ${bounds.height + padding * 2}`;
  };

  const filteredLocations = INSTALL_LOCATIONS.filter(loc => 
    selectedState && loc.state === selectedState
  );

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
            <MapPin className="w-3 h-3 text-brand-gold" />
            Our Service Area
          </div>
          <motion.h2 
            key={selectedState || 'default'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight"
          >
            {selectedState ? (
              <>Installations in <span className="text-brand-gold">{getProvinceName(selectedState)}</span></>
            ) : (
              <>Expanding Across <span className="text-brand-gold">The Heartland.</span></>
            )}
          </motion.h2>
          <p className="text-xl text-brand-dark/60 leading-relaxed font-medium">
            {selectedState 
              ? `Exploring our local impact in ${getProvinceName(selectedState)}. Clicking the back button to see our full reach.` 
              : "Logic Solar is proud to serve homeowners across the Midwest and South, bringing premium energy solutions to five key states."}
          </p>
        </div>

        <div className="relative aspect-[16/9] max-w-5xl mx-auto w-full group">
          <motion.svg
            animate={{ viewBox: getTargetViewBox() }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full filter drop-shadow-2xl"
            style={{ 
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.05))' 
            }}
          >
            {/* Base Map Layer */}
            {Object.entries(USA_MAP_PATHS).map(([id, path]) => {
              const isActive = ACTIVE_STATES.includes(id);
              const isSelected = selectedState === id;
              const isHovered = hoveredState === id;
              const isOtherSelected = selectedState && selectedState !== id;

              return (
                <motion.path
                  key={id}
                  d={path}
                  initial={false}
                  animate={{
                    fill: isSelected
                      ? '#F9CD0D' // brand-gold
                      : isActive 
                        ? (isHovered && !isOtherSelected ? '#F9CD0D' : '#216166') // brand-teal
                        : '#F3F4F6', // gray-100
                    stroke: isActive ? '#F9CD0D' : '#E5E7EB',
                    strokeWidth: isSelected ? 3 : isActive ? 1.5 : 0.5,
                    opacity: isOtherSelected ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onMouseEnter={() => !selectedState && setHoveredState(id)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => isActive && setSelectedState(selectedState === id ? null : id)}
                  className={`cursor-pointer outline-none transition-all ${isActive ? 'z-10' : 'z-0'}`}
                  style={{
                    transformOrigin: '50% 50%',
                    filter: isSelected
                      ? 'drop-shadow(0 0 15px rgba(249, 205, 13, 0.4))' 
                      : 'none'
                  }}
                />
              );
            })}

            {/* Markers Layer */}
            <AnimatePresence mode="wait">
              {selectedState && (
                <motion.g
                  key={`markers-${selectedState}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {filteredLocations.map((location) => {
                    const svgBounds = getPathBounds(USA_MAP_PATHS[selectedState!]);
                    const geoBounds = STATE_GEO_BOUNDS[selectedState!];
                    
                    // Simple linear interpolation for marker placement
                    const xPct = (location.lng - geoBounds.lng[0]) / (geoBounds.lng[1] - geoBounds.lng[0]);
                    const yPct = (location.lat - geoBounds.lat[1]) / (geoBounds.lat[0] - geoBounds.lat[1]);
                    
                    const markerX = svgBounds.x + (xPct * svgBounds.width);
                    const markerY = svgBounds.y + (yPct * svgBounds.height);

                    return (
                      <motion.g
                        key={location.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onMouseEnter={() => setHoveredLocation(location)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={markerX}
                          cy={markerY}
                          r={svgBounds.width / 40} // Scale radius with zoom
                          fill="#F9CD0D"
                          stroke="#216166"
                          strokeWidth={svgBounds.width / 200}
                        />
                        <motion.circle
                          cx={markerX}
                          cy={markerY}
                          r={svgBounds.width / 25}
                          fill="#F9CD0D"
                          initial={{ opacity: 0.5, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.5 }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </motion.g>
                    );
                  })}
                </motion.g>
              )}
            </AnimatePresence>
          </motion.svg>

          {/* Location Tooltip */}
          <AnimatePresence>
            {hoveredLocation && selectedState && (() => {
              const svgBounds = getPathBounds(USA_MAP_PATHS[selectedState]);
              const geoBounds = STATE_GEO_BOUNDS[selectedState];
              const xPct = (hoveredLocation.lng - geoBounds.lng[0]) / (geoBounds.lng[1] - geoBounds.lng[0]);
              const yPct = (hoveredLocation.lat - geoBounds.lat[1]) / (geoBounds.lat[0] - geoBounds.lat[1]);
              
              const markerX = svgBounds.x + (xPct * svgBounds.width);
              const markerY = svgBounds.y + (yPct * svgBounds.height);
              
              // Normalize coordinate to percentage of the CURRENT VIEWPORT
              // This is tricky because viewBox changes.
              // Instead, we can use the viewBox bounds.
              const padding = 40;
              const vbX = svgBounds.x - padding;
              const vbY = svgBounds.y - padding;
              const vbW = svgBounds.width + padding * 2;
              const vbH = svgBounds.height + padding * 2;
              
              const leftPct = ((markerX - vbX) / vbW) * 100;
              const topPct = ((markerY - vbY) / vbH) * 100;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-50 p-4 bg-brand-dark text-white rounded-2xl shadow-2xl pointer-events-none w-64"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -120%)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-gold">
                      Live Installation
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{hoveredLocation.city}, {hoveredLocation.state}</h4>
                  <p className="text-sm text-white/70 line-clamp-2">{hoveredLocation.details}</p>
                  
                  {/* Carrot */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-brand-dark" />
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Back to Map button if zoomed/filtered */}
          {selectedState && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedState(null)}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100 font-bold text-sm text-brand-dark hover:bg-brand-gold transition-colors"
            >
              <X className="w-4 h-4" />
              Back to Full Map
            </motion.button>
          )}
        </div>

        {/* Legend / Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
          {ACTIVE_STATES.map((id) => (
            <div 
              key={id}
              onClick={() => setSelectedState(selectedState === id ? null : id)}
              onMouseEnter={() => setHoveredState(id)}
              onMouseLeave={() => setHoveredState(null)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                hoveredState === id || selectedState === id
                  ? 'bg-brand-gold border-brand-gold shadow-lg -translate-y-1' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className={`text-xs font-black mb-1 ${hoveredState === id || selectedState === id ? 'text-brand-dark' : 'text-brand-gold'}`}>
                {id}
              </div>
              <div className={`font-bold tracking-tight ${hoveredState === id || selectedState === id ? 'text-brand-dark' : 'text-brand-dark'}`}>
                {getProvinceName(id)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

