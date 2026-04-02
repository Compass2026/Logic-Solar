import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesOverview } from '../components/ServicesOverview';
import { ServiceMap } from '../components/ServiceMap';
import { FAQSection } from '../components/FAQSection';
import { QuoteForm } from '../components/QuoteForm';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, TrendingDown, Zap, Shield, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <main className="bg-white">
      <HomeHero />
      <TrustStrip />
      
      {/* Why Logic Solar Section - Refined for Spacing & Hierarchy */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="relative order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative rounded-[48px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Solar Installation" 
                  className="w-full h-full object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/20 to-transparent" />
              </motion.div>
              
              {/* Floating Glass Callout */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -right-10 glass p-10 rounded-[40px] max-w-[320px] hidden md:block shadow-2xl border-white/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-6">
                  <TrendingDown className="w-7 h-7 text-brand-teal" />
                </div>
                <h4 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">Lower Bills, <br />Higher Value.</h4>
                <p className="text-sm text-brand-dark/60 leading-relaxed">Our systems are optimized for maximum energy harvest even in low light conditions.</p>
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  The Logic Advantage
                </div>
                
                <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-10 tracking-tight leading-[1.1]">
                  The Intelligence Behind <br />
                  <span className="text-brand-gold">Every Installation.</span>
                </h2>
                
                <p className="text-xl text-brand-dark/60 mb-12 leading-relaxed font-medium">
                  Most solar companies focus on volume. We focus on precision. Every Logic Solar system is custom-engineered to maximize your roof's potential while maintaining your home's aesthetic appeal.
                </p>
                
                <div className="space-y-10">
                  {[
                    { icon: Shield, title: "Tier 1 Components", desc: "We only use the highest-rated panels and inverters in the world, guaranteed for 25 years." },
                    { icon: Award, title: "Master Craftsmanship", desc: "Our installation teams are led by certified master electricians with decades of experience." },
                    { icon: Zap, title: "Real-Time Intelligence", desc: "Track every watt your system produces with our premium mobile monitoring suite." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-gold transition-colors duration-300">
                        <item.icon className="w-7 h-7 text-brand-dark/40 group-hover:text-brand-dark transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-brand-dark mb-2 tracking-tight">{item.title}</h4>
                        <p className="text-brand-dark/60 text-base leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16">
                  <Link 
                    to="/about" 
                    className="inline-flex items-center gap-3 text-brand-dark font-bold text-lg group"
                  >
                    Discover our philosophy
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-gold transition-all">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Logic Process Section - NEW */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
              Step-By-Step
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight">
              The Logic <span className="text-brand-gold">Process.</span>
            </h2>
            <p className="text-xl text-brand-dark/60 leading-relaxed font-medium">
              From initial consultation to lifelong monitoring, we handle every detail with surgical precision. Here's how we power your home.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
            
            {[
              { step: "01", title: "Consultation", desc: "We analyze your energy usage and roof potential using high-res satellite data." },
              { step: "02", title: "Engineering", desc: "Our engineers design a system optimized for maximum yields and aesthetic flow." },
              { step: "03", title: "Installation", desc: "Master electricians install your system in as little as a single day with zero mess." },
              { step: "04", title: "Activation", desc: "We handle all permitting and utility paperwork so you can start saving immediately." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group p-10 rounded-[40px] bg-white border border-gray-100 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center text-xl font-black mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-brand-dark/20">
                  {item.step}
                </div>
                <h4 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{item.title}</h4>
                <p className="text-brand-dark/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServicesOverview />
      <ServiceMap />

      {/* Comparison Section - Refined for Impact */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/10 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Utility vs. <span className="text-brand-gold">Logic Solar</span>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed">
              Stop renting your power from utility companies with rising rates. Own your energy and lock in your costs for decades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/5 p-12 rounded-[48px] border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-5 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="w-8 h-8 text-red-400 rotate-180" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Utility Power</h3>
              </div>
              <ul className="space-y-8">
                {[
                  "Unpredictable rate hikes (avg 5% annually)",
                  "Vulnerable to grid outages and blackouts",
                  "Zero return on investment or home equity",
                  "Reliance on aging, inefficient infrastructure"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/40 font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-400/40" />
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-brand-gold p-12 rounded-[48px] shadow-[0_40px_80px_-20px_rgba(249,205,13,0.25)]"
            >
              <div className="flex items-center gap-5 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-brand-dark/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-3xl font-bold text-brand-dark tracking-tight">Logic Solar</h3>
              </div>
              <ul className="space-y-8">
                {[
                  "Fixed energy costs for 25+ years",
                  "Energy independence with battery backup",
                  "Increase home value by avg $15,000+",
                  "Clean, renewable power you own"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-brand-dark font-bold">
                    <CheckCircle2 className="w-6 h-6 text-brand-dark" />
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection />
      <QuoteForm />
    </main>
  );
};
