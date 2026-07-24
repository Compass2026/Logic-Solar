import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Zap, Award, Sparkles, CheckCircle2, TrendingDown, Sun, Settings, HardHat } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';

export const SolarInstallation = () => {
  const faqItems = [
    { question: "How long does a typical installation take?", answer: "Most residential installations are completed within 1-2 days. However, the entire process from design to activation usually takes 4-8 weeks due to permitting and utility interconnection." },
    { question: "What kind of panels do you use?", answer: "We exclusive use Tier 1, high-efficiency monocrystalline panels from world-leading manufacturers, guaranteed for 25 years of performance." },
    { question: "Will solar damage my roof?", answer: "No. In fact, solar panels can protect the portion of the roof they cover. Our master installers use premium flashing and mounting systems that maintain your roof's integrity and warranty." },
    { question: "Is my house a good candidate for solar?", answer: "Ideal homes have south-facing roofs with little to no shading. However, our advanced engineering allows us to design efficient systems for east and west-facing roofs as well." }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Residential Solar Installation",
    "description": "Premium residential solar installation with custom engineering and Tier 1 components.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Logic Solar"
    },
    "areaServed": "USA",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Solar Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Solar Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Installation"
          }
        }
      ]
    }
  };

  return (
    <main className="bg-white">
      <SEO 
        title="Residential Solar Installation" 
        description="Premium residential solar installation by Logic Solar. Custom-engineered systems designed for maximum energy harvest and elegant aesthetic flow."
        schema={serviceSchema}
      />
      <PageHero 
        title={<>Precision <br /><span className="text-brand-gold">Installation.</span></>}
        subtitle="Experience the logic of superior engineering and master craftsmanship for your home."
        eyebrow="Residential Solar"
        backgroundImage="/images/installation-hero.jpg"
      />

      {/* Overview Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div>
              <SectionHeading 
                eyebrow="Superior Quality"
                title={<>Your home deserves <br />a <span className="text-brand-gold">smarter system.</span></>}
                description="Most solar companies focus on volume. We focus on precision. Every Logic Solar system is custom-engineered to maximize your roof's potential while maintaining your home's aesthetic appeal."
              />
              
              <div className="space-y-6 mt-12">
                {[
                  "Micro-inverter technology for maximum individual panel performance",
                  "All-black premium panels for a seamless, modern aesthetic",
                  "Master-electrician-led installation teams",
                  "25-year comprehensive equipment & performance warranty"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center font-bold text-brand-dark">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Solar Panels Close-up" 
                  className="w-full h-full object-cover aspect-video"
                />
              </div>
              <div className="absolute -top-6 -right-6 glass p-5 rounded-[20px] shadow-2xl hidden md:block">
                <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center mb-3">
                  <Sun className="w-5 h-5 text-brand-dark" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark mb-1">Max Efficiency</h4>
                <p className="text-[10px] text-brand-dark/40 max-w-[100px] leading-tight">Optimized for low-light performance.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Process Section (Reuse logic/style from Home) */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <SectionHeading 
            centered
            eyebrow="The Logic Flow"
            title="A Simpler Path to Solar."
            description="We handle the complexity, you enjoy the savings. Here is how we get you powered up."
          />

          <div className="grid md:grid-cols-4 gap-8 relative mt-20">
            {[
              { step: "01", icon: Settings, title: "Design", desc: "Advanced LiDAR analysis to engineer your perfect array." },
              { step: "02", icon: Shield, title: "Permitting", desc: "Full handling of all city and utility documentation." },
              { step: "03", icon: HardHat, title: "Installation", desc: "Expert crews install your system with surgical precision." },
              { step: "04", icon: Zap, title: "Activation", desc: "Official turn-on and monitoring setup for your home." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group p-10 rounded-[40px] bg-white border border-gray-100 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-brand-dark/20 overflow-hidden">
                   <item.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{item.title}</h4>
                <p className="text-brand-dark/60 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <SectionHeading 
              eyebrow="Common Questions"
              title="Installation Insights."
              description="Everything you need to know about getting solar on your roof."
            />
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Featured Service Area Callout */}
      <section className="py-12 bg-brand-light border-y border-black/5">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-brand-dark">Looking for Kansas City solar installation?</h3>
            <p className="text-brand-dark/70 text-sm mt-1">
              Read our dedicated guide for homeowners and businesses in Kansas City, Missouri and the KC metro area.
            </p>
          </div>
          <Link 
            to="/locations/missouri/kansas-city" 
            className="px-6 py-3 rounded-xl bg-brand-dark text-brand-gold font-extrabold text-sm hover:bg-brand-gold hover:text-brand-dark transition-all shrink-0"
          >
            Kansas City Solar Installation
          </Link>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
