import React from 'react';
import { motion } from 'motion/react';
import { Sun, Zap, Battery, Home, ArrowRight, CheckCircle2, Layout, Settings } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const HowSolarWorks = () => {
  return (
    <main className="bg-white">
      <SEO 
        title="How Solar Works" 
        description="Learn the simple logic behind solar energy. From photons hitting panels to powering your appliances, we explain the clean energy process."
      />
      <PageHero 
        title={<>Photon to <br /><span className="text-brand-gold">Power.</span></>}
        subtitle="The elegant science behind clean, renewable energy for your home."
        eyebrow="The Science"
        backgroundImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Basic Explanation */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <SectionHeading 
            eyebrow="Simplified Logic"
            title={<>A four-step <br /><span className="text-brand-gold">energy cycle.</span></>}
            description="Solar energy isn't complex when you have the right partner. Here is the elegant transition from sunlight to savings."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 relative">
            {[
              { icon: Sun, title: "Sunlight Collection", desc: "Photons from the sun strike your advanced Tier 1 panels, creating a DC current." },
              { icon: Zap, title: "Inversion", desc: "A high-performance inverter converts DC power into AC power used by your home." },
              { icon: Home, title: "Distribution", desc: "Your home uses the solar energy first, pulling from the grid only when necessary." },
              { icon: Battery, title: "Storage", desc: "Excess energy is stored in your battery or sent back to the grid for credits." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative p-10 rounded-[40px] bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center mb-8 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500">
                  <step.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-4 tracking-tight">{step.title}</h4>
                <p className="text-brand-dark/60 leading-relaxed text-sm font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Components */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="The Engineering"
                title={<>The hardware of <br /><span className="text-brand-gold">the future.</span></>}
                description="We only use the world's most advanced components to ensure your system performs at peak efficiency for decades."
              />
              <div className="space-y-8 mt-12">
                {[
                  { title: "Tier 1 Solar Panels", detail: "Highest efficiency ratings with all-black aesthetic for seamless roof integration." },
                  { title: "Micro-Inverters", detail: "Independent panel optimization ensures one shaded panel doesn't slow the whole system." },
                  { title: "Smart Monitoring", detail: "Track production and consumption in real-time with our premium mobile app." }
                ].map((comp, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-6 h-6 text-brand-dark" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-dark mb-1 tracking-tight">{comp.title}</h4>
                      <p className="text-sm text-brand-dark/60 leading-relaxed">{comp.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="aspect-square rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Solar Component Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-10 -left-10 glass p-10 rounded-[40px] shadow-2xl hidden md:block max-w-[280px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center mb-4">
                  <Layout className="w-6 h-6 text-brand-dark" />
                </div>
                <h4 className="text-lg font-bold text-brand-dark mb-2">Custom Geometry</h4>
                <p className="text-xs text-brand-dark/40">Engineered to match your roof's specific pitch and orientation.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Misconceptions */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading 
            centered
            eyebrow="Logic Check"
            title="Beyond the Myths."
            description="Let's clarify some common solar misconceptions with facts."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              { q: "Do solar panels work on cloudy days?", a: "Yes. While direct sunlight is best, panels still generate significant power from diffuse light during overcast weather." },
              { q: "What happens at night?", a: "Your system will swap to battery power or grid power seamlessly. Net metering ensures you get credit for excess daytime production." },
              { q: "Does rain clean panels?", a: "Rain actually helps wash away dust and debris, naturally maintaining your system's efficiency." },
              { q: "Can I go completely off-grid?", a: "While possible with enough storage, most homeowners stay grid-tied for maximum reliability and financial benefits." }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-gray-50 border border-transparent hover:border-brand-gold/20 hover:bg-white hover:shadow-xl transition-all duration-500">
                <h4 className="text-xl font-bold text-brand-dark mb-4 tracking-tight flex items-center gap-3">
                  <Settings className="w-5 h-5 text-brand-gold" />
                  {item.q}
                </h4>
                <p className="text-brand-dark/60 leading-relaxed text-sm font-medium">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding bg-brand-dark text-white text-center">
        <div className="container-custom">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
                Understand the <span className="text-brand-gold">logic?</span>
            </h2>
            <p className="text-white/50 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                Let's apply this technology to your specific property. Get your custom engineering report today.
            </p>
            <Link 
                to="/contact"
                className="px-10 py-5 bg-brand-gold text-brand-dark font-black rounded-2xl hover:bg-brand-gold-bright transition-all shadow-xl shadow-brand-gold/20 uppercase tracking-widest text-sm inline-block"
            >
                Get My Free Solar Quote
            </Link>
        </div>
      </div>

      <QuoteForm />
    </main>
  );
};
