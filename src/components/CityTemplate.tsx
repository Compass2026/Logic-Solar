import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sun, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from './PageHero';
import { SEO } from './SEO';
import { SectionHeading } from './SectionHeading';
import { QuoteForm } from './QuoteForm';
import { TrustStrip } from './TrustStrip';
import { siteData } from '../data/siteData';

interface CityTemplateProps {
  location: {
    city: string;
    state: string;
    title: string;
    description: string;
    highlights: string[];
    backgroundImage?: string;
  };
}

export const CityTemplate = ({ location }: CityTemplateProps) => {
  return (
    <>
      <SEO 
        title={location.title} 
        description={location.description} 
      />
      
      <PageHero 
        title={location.title}
        subtitle={location.description}
        backgroundImage={location.backgroundImage || "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"}
        eyebrow={`Solar Energy in ${location.city}`}
      />

      <TrustStrip />

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="Local Expertise"
                title={`Serving ${location.city} Homeowners`}
                description={`Logic Solar is proud to be the premier solar provider for ${location.city}. We understand the local climate and utility requirements better than anyone.`}
                centered={false}
              />
              
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                {location.highlights.map((highlight, index) => (
                  <div key={index} className="flex flex-col gap-3 p-6 rounded-2xl bg-brand-light border border-black/5">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                      {index === 0 && <Sun className="w-5 h-5" />}
                      {index === 1 && <MapPin className="w-5 h-5" />}
                      {index === 2 && <ShieldCheck className="w-5 h-5" />}
                      {index === 3 && <Zap className="w-5 h-5" />}
                    </div>
                    <span className="font-bold text-brand-dark leading-tight">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl"
            >
              <img 
                src={location.backgroundImage || "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"} 
                alt={`${location.city} Solar`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-6 rounded-2xl border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                    <span className="text-white font-bold">{location.city}, {location.state}</span>
                  </div>
                  <h4 className="text-white/80 text-sm font-medium">Local Energy Assessment Ready</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <QuoteForm />

      <section className="py-24 bg-brand-light">
        <div className="container-custom text-center">
          <SectionHeading 
            eyebrow="Locations"
            title="Areas We Serve"
            description="Expanding premium solar across the Midwest and beyond."
            centered={true}
          />
          <div className="flex flex-wrap justify-center gap-4 mt-12">
             {siteData.locations.map((loc) => (
               <Link 
                 key={loc.slug} 
                 to={`/locations/${loc.slug}`}
                 className="px-6 py-4 rounded-xl bg-white border border-black/5 font-bold text-sm text-brand-dark hover:border-brand-gold hover:text-brand-gold transition-all duration-300 shadow-sm hover:shadow-md"
               >
                  {loc.city}
               </Link>
             ))}
          </div>
        </div>
      </section>
    </>
  );
};
