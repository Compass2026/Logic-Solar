import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export const QuoteForm = () => {
  return (
    <section id="quote-form" className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-teal rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-brand-gold p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-brand-dark mb-6 leading-tight">
                Get Your Free <br />Solar Quote
              </h2>
              <p className="text-brand-dark/70 font-medium leading-relaxed mb-8">
                Join 12,000+ homeowners who have switched to Logic Solar. Our experts will analyze your home and provide a custom savings report.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-brand-dark">1</span>
                </div>
                <span className="font-bold text-brand-dark">Custom Design</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-brand-dark">2</span>
                </div>
                <span className="font-bold text-brand-dark">Savings Analysis</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-brand-dark">3</span>
                </div>
                <span className="font-bold text-brand-dark">Expert Consultation</span>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-12 lg:p-16">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="(555) 000-0000"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Average Utility Bill</label>
                <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option>$100 - $200</option>
                  <option>$200 - $300</option>
                  <option>$300 - $400</option>
                  <option>$400+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Interested In</label>
                <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option>Residential Solar</option>
                  <option>Battery Backup</option>
                  <option>Commercial Solar</option>
                  <option>Solar Incentives</option>
                  <option>Financing</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Home Address</label>
                <input 
                  type="text" 
                  placeholder="123 Solar St, City, State"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full bg-brand-dark text-white py-5 rounded-xl font-bold text-lg hover:bg-brand-steel transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  Send My Quote Request
                  <Send className="w-5 h-5 text-brand-gold" />
                </button>
                <p className="text-center text-xs text-brand-dark/40 mt-4">
                  By clicking, you agree to our privacy policy and to be contacted by Logic Solar.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
