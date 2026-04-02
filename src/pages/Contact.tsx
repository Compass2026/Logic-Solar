import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Shield } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { SEO } from '../components/SEO';

export const Contact = () => {
  return (
    <main className="bg-white">
      <SEO 
        title="Contact Us" 
        description="Ready to switch to solar? Contact Logic Solar today for a free quote. Our experts are ready to help you design the perfect energy system for your home or business."
      />
      <PageHero 
        title={<>Let's Start <br /><span className="text-brand-gold">The Logic.</span></>}
        subtitle="Connect with our energy consultants to design your high-performance solar future."
        eyebrow="Contact Us"
        backgroundImage="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="Reach Out"
                title={<>Premium Support, <br /><span className="text-brand-gold">Direct Access.</span></>}
                description="Whether you have a technical question or are ready to request a site audit, our team is standing by to provide expert guidance."
              />

              <div className="space-y-10 mt-16">
                {[
                  { icon: Phone, label: "Call Us", val: "(800) LOGIC-SOLAR", sub: "Mon-Fri, 9am - 6pm" },
                  { icon: Mail, label: "Email Us", val: "hello@logicsolar.com", sub: "Response within 24 hours" },
                  { icon: MapPin, label: "Visit Our Studio", val: "123 Energy Way, Suite 500", sub: "Austin, TX 78701" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-gold transition-all duration-500">
                      <item.icon className="w-7 h-7 text-brand-dark/20 group-hover:text-brand-dark transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-brand-dark/40 mb-1">{item.label}</h4>
                      <p className="text-2xl font-bold text-brand-dark mb-1 tracking-tight">{item.val}</p>
                      <p className="text-sm text-brand-dark/60 font-medium">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 p-10 rounded-[40px] bg-brand-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Shield className="w-24 h-24 text-brand-gold" />
                </div>
                <h4 className="text-xl font-bold mb-4 relative z-10">Service Area</h4>
                <p className="text-white/60 mb-6 relative z-10 leading-relaxed font-medium">
                  We currently provide premium solar installations across Missouri, Illinois, Kansas, Oklahoma, and Texas. Expanding soon to a city near you.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["St. Louis", "Chicago", "Kansas City", "Oklahoma City", "Dallas"].map((city) => (
                    <span key={city} className="px-4 py-2 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-brand-gold/80 backdrop-blur-sm border border-white/10">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[48px] shadow-2xl border border-gray-100 p-12 lg:p-16 relative"
            >
              <div className="absolute -top-6 left-12 px-6 py-3 bg-brand-gold text-brand-dark text-xs font-black uppercase tracking-widest rounded-full shadow-xl shadow-brand-gold/20">
                Inquiry Form
              </div>
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="(555) 000-0000"
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Average Utility Bill</label>
                    <select className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all appearance-none cursor-pointer">
                      <option>$100 - $200</option>
                      <option>$200 - $300</option>
                      <option>$300 - $400</option>
                      <option>$400+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Home Address</label>
                  <input 
                    type="text" 
                    placeholder="123 Solar St, City, State"
                    className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Interested In</label>
                  <select className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all appearance-none cursor-pointer">
                    <option>Residential Solar</option>
                    <option>Battery Backup</option>
                    <option>Commercial Solar</option>
                    <option>Solar Incentives</option>
                    <option>Financing</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark/40 ml-1">Message (Optional)</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us more about your project..."
                    className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-dark text-white py-6 rounded-2xl font-black text-lg hover:bg-brand-steel transition-all flex items-center justify-center gap-4 shadow-xl shadow-brand-dark/20 uppercase tracking-widest"
                >
                  Request Consultation
                  <Send className="w-5 h-5 text-brand-gold" />
                </button>
                
                <div className="flex items-center justify-center gap-6 pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30">
                  <div className="flex items-center gap-1.5 pointer-events-none">
                    <Clock className="w-3.5 h-3.5" /> 24hr Response
                  </div>
                  <div className="flex items-center gap-1.5 pointer-events-none">
                    <Globe className="w-3.5 h-3.5" /> Direct Experts
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder or Visual */}
      <section className="h-[500px] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
            alt="World Map Visual" 
            className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 pointer-events-none" />
        <div className="container-custom relative h-full flex items-center justify-center">
            <div className="glass p-12 rounded-[48px] text-center border-white/50 backdrop-blur-xl">
                 <MessageSquare className="w-12 h-12 text-brand-gold mx-auto mb-6" />
                 <h2 className="text-3xl font-black text-brand-dark mb-3 tracking-tight">Ready to meet?</h2>
                 <p className="text-brand-dark/60 font-medium">Virtual and in-person consultations available daily.</p>
            </div>
        </div>
      </section>
    </main>
  );
};
