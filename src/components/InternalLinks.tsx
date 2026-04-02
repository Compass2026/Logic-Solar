import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Sun } from 'lucide-react';
import { siteData } from '../data/siteData';

interface InternalLinksProps {
  type: 'services' | 'locations' | 'both';
  title?: string;
  className?: string;
}

export const InternalLinks = ({ type, title, className }: InternalLinksProps) => {
  return (
    <div className={className}>
      {title && <h4 className="text-sm font-black uppercase tracking-widest text-brand-gold mb-8">{title}</h4>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(type === 'services' || type === 'both') && siteData.services.map((service) => (
          <Link 
            key={service.slug} 
            to={`/services/${service.slug}`}
            className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <Sun className="w-5 h-5 text-brand-gold" />
              <span className="font-bold text-white">{service.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
          </Link>
        ))}

        {(type === 'locations' || type === 'both') && siteData.locations.map((location) => (
          <Link 
            key={location.slug} 
            to={`/locations/${location.slug}`}
            className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-brand-gold" />
              <span className="font-bold text-white">{location.city}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
};
