import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Sun, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { InternalLinks } from './InternalLinks';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-dark to-black pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <img 
                src="/logo.png" 
                alt="Logic Solar" 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Premium solar solutions designed for performance, elegance, and long-term energy independence.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61580455196022" },
                { icon: Instagram, href: "https://www.instagram.com/logic_solar" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/logic-solar/" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {siteData.nav.filter(n => !n.children).map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('http') ? (
                    <a 
                      href={item.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-brand-gold transition-colors text-sm"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link to="/services/installation" className="text-white/60 hover:text-brand-gold transition-colors text-sm">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              {siteData.services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="text-white/60 hover:text-brand-gold transition-colors text-sm flex items-center gap-2 group">
                    <Sun className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.title}
                  </Link>
                </li>
              ))}
              <li><Link to="/services/incentives" className="text-white/60 hover:text-brand-gold transition-colors text-sm">Solar Incentives</Link></li>
              <li><Link to="/services/how-it-works" className="text-white/60 hover:text-brand-gold transition-colors text-sm">How Solar Works</Link></li>
            </ul>
          </div>

          {/* Locations & Contact */}
          <div className="space-y-12">
            <div>
              <h4 className="text-lg font-bold mb-6">Areas We Serve</h4>
              <ul className="space-y-4">
                {siteData.locations.map((loc) => (
                  <li key={loc.slug}>
                    <Link to={`/locations/${loc.slug}`} className="text-white/60 hover:text-brand-gold transition-colors text-sm flex items-center gap-2 group">
                      <MapPin className="w-3 h-3 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      {loc.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{siteData.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <a href={`tel:${siteData.contact.phone.replace(/[^+\d]/g, '')}`} className="hover:text-brand-gold transition-colors">{siteData.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <a href={`mailto:${siteData.contact.email}`} className="hover:text-brand-gold transition-colors">{siteData.contact.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Logic Solar. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-white/40">
            <Link to="/privacy" className="hover:text-brand-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-gold">Terms of Service</Link>
            <a href="#" className="hover:text-brand-gold">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
