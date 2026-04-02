import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sun, Battery, Building2, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteData } from '@/src/data/siteData';

const iconMap: Record<string, any> = {
  Sun,
  Battery,
  Building2,
  Zap,
  ShieldCheck
};

export const ServicesOverview = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
            Our Ecosystem
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-8 tracking-tight">
            Energy Solutions Built for <span className="text-brand-gold">Excellence.</span>
          </h2>
          <p className="text-xl text-brand-dark/60 leading-relaxed font-medium">
            We don't just install panels. We engineer high-performance energy ecosystems tailored to your lifestyle and long-term goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {siteData.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-white p-12 rounded-[48px] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 border border-gray-100 flex flex-col"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-brand-gold/5 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-18 h-18 bg-gray-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-gold transition-colors duration-500 shadow-sm">
                    <Icon className="w-9 h-9 text-brand-dark/30 group-hover:text-brand-dark transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-5 tracking-tight">{service.title}</h3>
                  <p className="text-brand-dark/60 mb-10 flex-grow leading-relaxed font-medium">
                    {service.shortDescription}
                  </p>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-3 text-brand-dark font-bold text-lg group/link"
                  >
                    Explore service
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-brand-gold transition-all">
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
