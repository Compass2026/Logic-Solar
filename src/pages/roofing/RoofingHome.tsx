import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, TrendingDown, Zap, Shield, Award, Sparkles, ShieldCheck, Star, Hammer, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoofingHome = () => {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-brand-dark/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
            
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  Premium Luxury Roofing
                </div>
                
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-brand-dark leading-[1.05] mb-8 tracking-tight">
                  The <motion.span 
                    animate={{ color: ['#1b2a33', '#f9cd0d', '#1b2a33'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block"
                  >Logical</motion.span> Choice <br />
                  for Ultimate <br />
                  Protection.
                </h1>
                
                <p className="text-lg md:text-xl text-brand-dark/60 leading-relaxed mb-10 max-w-xl font-medium">
                  Logic Roofing combines premium architectural shingles, master craftsmanship, and elegant design to deliver the most robust roofs in the industry.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link 
                    to="/contact" 
                    className="group relative bg-brand-dark text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-brand-dark/20 transition-all hover:-translate-y-1 overflow-hidden flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Get My Free Estimate</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-8 text-xs font-bold text-brand-dark/40 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-gold" />
                    Lifetime Warranty
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                    Master Certified
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] aspect-square md:aspect-[4/3] lg:aspect-[3/2] group">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600" 
                    alt="Premium Architectural Roofing" 
                    className="w-full h-full object-cover transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60" />
                </div>

                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-8 md:-left-12 glass p-6 md:p-8 rounded-[32px] shadow-2xl max-w-[240px] border-white/40 bg-white/90 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
                      <Shield className="w-5 h-5 text-brand-dark" />
                    </div>
                    <div className="text-3xl font-black text-brand-dark">#1</div>
                  </div>
                  <div className="text-xs font-extrabold text-brand-dark/50 uppercase tracking-widest leading-tight">
                    Rated Roofing <br />Contractor
                  </div>
                </motion.div>
                <div className="absolute -inset-4 border border-brand-gold/10 rounded-[44px] pointer-events-none" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-y border-gray-100 bg-white overflow-hidden">
        <div className="container-custom">
          <p className="text-center text-[10px] font-black text-brand-dark/30 uppercase tracking-[0.3em] mb-8">
            Trusted by modern homeowners across the nation
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
            <span className="text-2xl font-bold font-serif">GAF</span>
            <span className="text-2xl font-bold font-serif">Owens Corning</span>
            <span className="text-2xl font-bold font-serif">CertainTeed</span>
            <span className="text-2xl font-bold font-serif">Tamko</span>
          </div>
        </div>
      </section>
      
      {/* Why Logic Roofing Section */}
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
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Roof Replacement" 
                  className="w-full h-full object-cover aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/20 to-transparent" />
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
                  The Craftsmanship Behind <br />
                  <span className="text-brand-gold">Every Roof.</span>
                </h2>
                
                <p className="text-xl text-brand-dark/60 mb-12 leading-relaxed font-medium">
                  Most roofing companies focus on speed and volume. We focus on enduring quality. Every Logic roof is custom-engineered to withstand the harshest weather while elevating your home's aesthetic appeal.
                </p>
                
                <div className="space-y-10">
                  {[
                    { icon: Shield, title: "Premium Architectural Shingles", desc: "We exclusively install top-tier materials rated to withstand 130mph winds and severe weather." },
                    { icon: Award, title: "Master Craftsmanship", desc: "Our installation teams are factory-certified experts with decades of specialized roofing experience." },
                    { icon: HomeIcon, title: "Storm Damage Restoration", desc: "We provide comprehensive inspections and handle your insurance claims from start to finish." }
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Logic Process Section */}
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
              From initial inspection to lifetime warranty, we handle every detail with precision. Here's how we protect your home.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
            
            {[
              { step: "01", title: "Inspection", desc: "We perform a comprehensive evaluation of your current roof, identifying any damage or structural needs." },
              { step: "02", title: "Consultation", desc: "We help you select the perfect architectural shingles or slate to match your home's unique style." },
              { step: "03", title: "Installation", desc: "Our certified master roofers replace your roof efficiently, maintaining a clean and safe worksite." },
              { step: "04", title: "Final Walkthrough", desc: "We ensure every detail is perfect and issue your industry-leading lifetime warranty." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.1 }}
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

      {/* Services Overview */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-8 tracking-tight">
              Roofing Solutions Built for <span className="text-brand-gold">Excellence.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { id: 1, title: 'Luxury Roof Replacement', desc: 'Complete roof replacement using high-end architectural shingles and premium underlayments.', icon: HomeIcon },
              { id: 2, title: 'Storm Damage Restoration', desc: 'Expert inspection, repair, and full replacement services following wind, hail, or storm damage.', icon: ShieldCheck },
              { id: 3, title: 'Slate & Specialty Roofing', desc: 'Beautiful, long-lasting specialty roofing installations for unmatched elegance and durability.', icon: Hammer }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group relative bg-white p-12 rounded-[48px] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 border border-gray-100 flex flex-col"
                >
                  <div className="absolute inset-0 bg-brand-gold/5 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-18 h-18 bg-gray-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-gold transition-colors duration-500 shadow-sm">
                      <Icon className="w-9 h-9 text-brand-dark/30 group-hover:text-brand-dark transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-5 tracking-tight">{service.title}</h3>
                    <p className="text-brand-dark/60 mb-10 flex-grow leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Standard Roofers vs. <span className="text-brand-gold">Logic Roofing</span>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed">
              Don't compromise on the most critical structural component of your home. Experience the Logic difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/5 p-12 rounded-[48px] border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-5 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="w-8 h-8 text-red-400 rotate-180" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Standard Roofers</h3>
              </div>
              <ul className="space-y-8">
                {[
                  "Builder-grade materials with short lifespans",
                  "Subcontracted, unverified labor",
                  "Minimal to no long-term warranties",
                  "Hidden fees and messy worksites"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/40 font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-400/40" />
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-brand-gold p-12 rounded-[48px] shadow-[0_40px_80px_-20px_rgba(249,205,13,0.25)]"
            >
              <div className="flex items-center gap-5 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-brand-dark/10 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-3xl font-bold text-brand-dark tracking-tight">Logic Roofing</h3>
              </div>
              <ul className="space-y-8">
                {[
                  "Premium architectural shingles & slate",
                  "Factory-certified master craftspeople",
                  "Industry-leading lifetime warranties",
                  "Transparent pricing & immaculate cleanup"
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

      {/* Simple CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-8 tracking-tight">
              Ready to Upgrade Your Roof?
            </h2>
            <p className="text-xl text-brand-dark/60 mb-10">
              Contact Logic Roofing today for a complimentary inspection and comprehensive estimate.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex bg-brand-dark text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-brand-dark/20 transition-all hover:-translate-y-1"
            >
              Get Your Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
