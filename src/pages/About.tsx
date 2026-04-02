import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Target, Zap, Award, Sparkles, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <main className="bg-white">
      <SEO 
        title="About Us" 
        description="Logic Solar exists to make clean energy feel simpler, clearer, and more premium for homeowners and businesses ready to make a smarter long-term investment."
      />
      <PageHero 
        title={<>Better Energy. <br /><span className="text-brand-gold">By Design.</span></>}
        subtitle="We're redefining the solar experience with a focus on precision engineering and luxury service."
        eyebrow="Our Story"
        backgroundImage="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Philosophy Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="Why We Exist"
                title={<>Solar without the <br /><span className="text-brand-gold">complexity.</span></>}
                description="Logic Solar was founded on a simple premise: clean energy should be as elegant as it is efficient. We saw a market filled with generic solutions and decided to build something better."
              />
              
              <div className="space-y-8 mt-12">
                <p className="text-lg text-brand-dark/60 leading-relaxed font-medium">
                  Logic Solar exists to make clean energy feel simpler, clearer, and more premium for homeowners and businesses ready to make a smarter long-term investment.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-4xl font-black text-brand-dark mb-2">12k+</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-dark/40">Homeowners</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-black text-brand-dark mb-2">25yr</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-dark/40">Guarantee</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Home with Solar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[40px] shadow-2xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-brand-dark" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark">Precision Quality</h4>
                </div>
                <p className="text-sm text-brand-dark/60 max-w-[200px]">Every installation meets our rigorous 50-point quality standard.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading 
            centered
            eyebrow="Our Values"
            title="The Logic Standard."
            description="We believe in three core principles that guide every decision we make."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Target, 
                title: "Precision Engineering", 
                desc: "We don't do one-size-fits-all. Every system is custom-designed for the specific architecture of your home." 
              },
              { 
                icon: Users, 
                title: "Human-First Service", 
                desc: "You'll never be just a number. Our dedicated consultants provide direct, transparent communication at every step." 
              },
              { 
                icon: Zap, 
                title: "Energy Independence", 
                desc: "Our mission is to empower you with systems that provide lasting freedom from rising utility costs." 
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-gold/20 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{value.title}</h3>
                <p className="text-brand-dark/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview or CTA block */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px]" />
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Ready to meet the <br /><span className="text-brand-gold">future of energy?</span>
            </h2>
            <p className="text-white/50 text-xl mb-12 leading-relaxed">
              Let's build a smarter, cleaner power strategy for your property today.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact"
                className="px-10 py-5 bg-brand-gold text-brand-dark font-black rounded-2xl hover:bg-brand-gold-bright transition-all shadow-xl shadow-brand-gold/20 uppercase tracking-widest text-sm"
              >
                Get My Free Solar Quote
              </Link>
              <Link 
                to="/services/installation"
                className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm"
              >
                Explore Installation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
