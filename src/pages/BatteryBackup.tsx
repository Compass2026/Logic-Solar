import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, TrendingDown, Battery, Home, CloudLightning, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';

export const BatteryBackup = () => {
  const faqItems = [
    { question: "How long can a battery power my home during an outage?", answer: "This depends on your battery capacity and energy usage. A typical system can power essential loads like lights, refrigeration, and WiFi for 12-24 hours. Multiple batteries can extend this for days." },
    { question: "Can I add a battery to my existing solar system?", answer: "Yes! Most existing solar systems can be retrofitted with a battery backup solution through AC-coupling." },
    { question: "Does the battery charge during a power outage?", answer: "Yes, if you have solar panels and the sun is shining, your panels will continue to power your home and charge your battery even when the grid is down." },
    { question: "What is the lifespan of a solar battery?", answer: "Most modern lithium-ion solar batteries are warrantied for 10 years and typically last 15+ years depending on usage cycles." }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Battery Backup & Storage",
    "description": "Premium energy storage solutions for energy independence and outage protection.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Logic Solar"
    },
    "areaServed": "USA"
  };

  return (
    <main className="bg-white">
      <SEO 
        title="Battery Backup & Storage" 
        description="True energy independence with Logic Solar battery backup. Protect your home from outages and maximize your solar savings with premium storage solutions."
        schema={serviceSchema}
      />
      <PageHero 
        title={<>Energy <br /><span className="text-brand-gold">Independence.</span></>}
        subtitle="Never be left in the dark again. Store your solar power and keep your home running when the grid fails."
        eyebrow="Battery Backup"
        backgroundImage="/images/battery-hero.jpg"
        imagePosition="object-right"
      />

      {/* Why Battery Matters */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="Power Protection"
                title={<>Your home, <br />always <span className="text-brand-gold">powered.</span></>}
                description="Power outages are increasing. A Logic Solar battery backup ensures your family stays comfortable, your food stays fresh, and your home stays secure."
              />
              
              <div className="space-y-8 mt-12">
                {[
                  { icon: CloudLightning, title: "Outage Protection", desc: "Instant transition to battery power when the grid goes down." },
                  { icon: TrendingDown, title: "Time-of-Use Savings", desc: "Use stored energy when utility rates are highest." },
                  { icon: ShieldCheck, title: "Total Self-Reliance", desc: "Run your home on 100% clean, self-generated power." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                      <item.icon className="w-7 h-7 text-brand-dark/40 group-hover:text-brand-dark" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-dark mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-brand-dark/60 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1592833159155-c62df1b356ee?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Battery Installation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 -right-6 glass p-5 rounded-[20px] shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Battery className="w-6 h-6 text-brand-gold animate-pulse" />
                  <div className="h-1.5 w-12 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-brand-gold rounded-full" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-brand-dark">Backup Ready</h4>
                <p className="text-[10px] text-brand-dark/40 leading-tight">Continuously monitoring the grid.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading 
            centered
            eyebrow="Key Benefits"
            title="Smart Energy Storage."
            description="Go beyond just panels. Add intelligence and resilience to your home energy system."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Peak Shaving", desc: "Avoid peak utility rates by using battery power during high-demand hours." },
              { title: "Zero Noise", desc: "Unlike gas generators, solar batteries are silent and require zero maintenance." },
              { title: "Eco-Friendly", desc: "Maximize your use of renewable energy and reduce your carbon footprint." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-gold/20">
                <CheckCircle2 className="w-12 h-12 text-brand-gold mb-6" />
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{benefit.title}</h3>
                <p className="text-brand-dark/60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <SectionHeading 
              eyebrow="The Logic of Storage"
              title="Common Questions."
              description="Learn more about how battery backup transforms your home power experience."
            />
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
