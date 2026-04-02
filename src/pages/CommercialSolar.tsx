import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, TrendingDown, Building2, BarChart3, LineChart, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const CommercialSolar = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Commercial Solar Solutions",
    "description": "Strategic solar energy assets for businesses, providing custom engineering and ROI-focused installations.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Logic Solar"
    },
    "areaServed": "USA"
  };

  return (
    <main className="bg-white">
      <SEO 
        title="Commercial Solar Solutions" 
        description="Strategic solar energy for businesses. Logic Solar provides custom-engineered commercial solar systems to reduce operating costs and improve sustainability."
        schema={serviceSchema}
      />
      <PageHero 
        title={<>Strategic <br /><span className="text-brand-gold">Energy Assets.</span></>}
        subtitle="Transform your roof into a high-yield financial instrument with Logic Solar Commercial."
        eyebrow="Commercial Solar"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Why Commercial Matters */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div>
              <SectionHeading 
                eyebrow="Corporate Strategy"
                title={<>Reduce overhead, <br />increase <span className="text-brand-gold">predictability.</span></>}
                description="Utility rates are one of the most unpredictable variables in your P&L. Solar allows you to lock in your energy costs for decades, providing a hedge against inflation and rising rates."
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {[
                  { icon: BarChart3, title: "Accelerated ROI", desc: "Federal tax credits and MACRS depreciation significantly speed up your payback period." },
                  { icon: LineChart, title: "Operating Efficiency", desc: "Drastically reduce fixed costs and improve your bottom line immediately." },
                  { icon: Building2, title: "Asset Value", desc: "Increase your property value and ESG score with a high-performance energy system." },
                  { icon: Shield, title: "Energy Security", desc: "Protect your operations from grid instability and rising demand charges." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-brand-dark" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-dark tracking-tight">{item.title}</h4>
                    <p className="text-sm text-brand-dark/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Commercial Complex" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[40px] shadow-2xl hidden md:block">
                <div className="text-4xl font-black text-brand-dark mb-2">30%</div>
                <p className="text-sm font-bold uppercase tracking-widest text-brand-dark/40">Average Savings</p>
                <div className="mt-6 flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-1.5 h-6 bg-brand-gold rounded-full" />
                  ))}
                  <div className="w-1.5 h-6 bg-gray-100 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading 
            centered
            eyebrow="Business Use Cases"
            title="Solar for every industry."
            description="Whether you own a warehouse, a retail center, or an office park, solar is a smart move."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: "Manufacturing", detail: "Offset heavy energy consumption from machinery and industrial cooling." },
              { type: "Retail & Office", detail: "Reduce HVAC costs and demonstrate sustainability to customers and staff." },
              { type: "Real Estate", detail: "Attract premium tenants and increase net operating income (NOI)." }
            ].map((useCase, i) => (
              <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-gold/20">
                <CheckCircle2 className="w-12 h-12 text-brand-gold mb-6" />
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{useCase.type}</h3>
                <p className="text-brand-dark/60 leading-relaxed text-sm">{useCase.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Angle */}
      <section className="section-padding bg-brand-dark text-white text-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Invest in your <br /><span className="text-brand-gold">bottom line.</span>
            </h2>
            <p className="text-white/50 text-xl mb-12 leading-relaxed">
              Explore C-PACE financing, capital leases, and power purchase agreements (PPAs) tailored for business growth.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact"
                className="px-10 py-5 bg-brand-gold text-brand-dark font-black rounded-2xl hover:bg-brand-gold-bright transition-all shadow-xl shadow-brand-gold/20 uppercase tracking-widest text-sm"
              >
                Get Commercial Quote
              </Link>
              <Link 
                to="/financing"
                className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm"
              >
                Explore Financing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
