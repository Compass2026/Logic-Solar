import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sun, ShieldCheck, Zap } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteForm } from '../components/QuoteForm';
import { TrustStrip } from '../components/TrustStrip';
import { siteData } from '../data/siteData';
import locationsData from '../data/locations-solar.json';
import { isServedCity } from '../data/cityTiers';
import { buildStateMeta } from '../data/pageMeta';

export const StatePage = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const location = siteData.locations.find(l => l.slug === stateId);
  
  if (!location) return <Navigate to="/" replace />;

  const stateKey = location.state.toLowerCase() as keyof typeof locationsData.states;
  const stateData = locationsData.states[stateKey];
  const cities = (stateData?.cities || []).filter((c) => isServedCity(stateKey, c.slug));

  // Same meta the prerender script writes for this route — hydration must
  // set identical strings, or crawlers see two competing titles.
  const meta = buildStateMeta(stateId ?? '');

  return (
    <>
      <SEO
        title={meta?.title ?? location.title}
        description={meta?.description ?? location.description}
      />
      
      <PageHero 
        title={location.title}
        subtitle={location.description}
        backgroundImage={stateData?.heroImage || location.backgroundImage || "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"}
        eyebrow={`Solar Energy in ${location.city}`}
      />

      {stateId === 'colorado' && (
        <div style={{
          background: 'linear-gradient(90deg, #f9cd0d 0%, #ffd93d 50%, #f9cd0d 100%)',
          color: '#1b2a33',
          textAlign: 'center',
          padding: '14px 24px',
          fontWeight: 900,
          fontSize: '15px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(249,205,13,0.4)',
          position: 'relative',
          zIndex: 10,
        }}>
          🚀 &nbsp;Coming Soon — We're launching in Colorado!&nbsp; 🚀
        </div>
      )}

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
                src={stateData?.heroImage || location.backgroundImage || "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"} 
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

      {/* Featured Location Banner for Missouri */}
      {location.slug === 'missouri' && (
        <section className="py-12 bg-brand-dark text-white border-y border-brand-gold/30">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-black text-brand-gold uppercase tracking-wider mb-1">Featured Metro Hub</div>
              <h3 className="text-2xl font-bold text-white">Kansas City Solar Installation</h3>
              <p className="text-white/70 text-sm max-w-xl mt-1">
                Explore custom residential solar panel design, battery storage, and commercial installations in Kansas City, Missouri and the KC metro.
              </p>
            </div>
            <Link 
              to="/locations/missouri/kansas-city" 
              className="px-6 py-3 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-sm hover:bg-white transition-all shrink-0"
            >
              Explore Kansas City Solar
            </Link>
          </div>
        </section>
      )}

      {/* Featured Location Banner for Kansas */}
      {location.slug === 'kansas' && (
        <section className="py-12 bg-brand-dark text-white border-y border-brand-gold/30">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-black text-brand-gold uppercase tracking-wider mb-1">Featured Metro Hub</div>
              <h3 className="text-2xl font-bold text-white">Wichita Solar Panel Installation</h3>
              <p className="text-white/70 text-sm max-w-xl mt-1">
                Explore custom residential solar panels, battery backup storage, and commercial installations throughout Wichita and south-central Kansas.
              </p>
            </div>
            <Link 
              to="/locations/kansas/wichita" 
              className="px-6 py-3 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-sm hover:bg-white transition-all shrink-0"
            >
              Explore Wichita Solar
            </Link>
          </div>
        </section>
      )}

      {/* Cities We Serve — SEO Internal Linking Section */}
      <section className="py-24 bg-brand-light">
        <div className="container-custom">
          <SectionHeading 
            eyebrow="Service Areas"
            title={`Cities We Serve in ${stateData?.name || location.city}`}
            description={`Logic Solar proudly serves homeowners across ${stateData?.name || location.city}. Click your city below to explore local solar incentives, savings estimates, and available installation teams.`}
            centered={true}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-12">
            {cities.map((cityObj) => (
              <Link 
                key={cityObj.slug} 
                to={`/locations/${location.slug}/${cityObj.slug}`}
                className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-black/5 text-sm font-semibold text-brand-dark hover:border-brand-gold hover:text-brand-gold hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-200" />
                {cityObj.city}
              </Link>
            ))}
          </div>
          {cities.length > 0 && (
            <p className="text-center text-sm text-brand-dark/40 mt-8">
              Showing {cities.length} service cities in {stateData?.name || location.city}
            </p>
          )}
        </div>
      </section>
    </>
  );
};
