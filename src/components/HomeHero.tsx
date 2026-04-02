import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const HomeHero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white">
      {/* Decorative Background Light Effects */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                Premium Solar Engineering
              </div>
              
              <h1 className="text-5xl md:text-7xl xl:text-7xl 2xl:text-8xl font-extrabold text-brand-dark leading-[1.05] mb-8 tracking-tight">
                The <motion.span 
                  animate={{ color: ['#1b2a33', '#f9cd0d', '#1b2a33'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >Logical</motion.span> Choice <br />
                for Energy <br />
                Independence.
              </h1>
              
              <p className="text-lg md:text-xl text-brand-dark/60 leading-relaxed mb-10 max-w-xl font-medium">
                Logic Solar combines high-performance engineering with elegant design to deliver the most efficient energy systems in the industry.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link 
                  to="/contact" 
                  className="group relative bg-brand-dark text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-brand-dark/20 transition-all hover:-translate-y-1 overflow-hidden flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Get My Free Solar Quote</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-teal to-brand-steel opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <Link 
                  to="/services/how-it-works" 
                  className="bg-white border border-gray-200 hover:border-brand-gold text-brand-dark px-10 py-5 rounded-full text-lg font-bold transition-all hover:bg-gray-50 flex items-center justify-center"
                >
                  See How It Works
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8 text-xs font-bold text-brand-dark/40 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-teal" />
                  25-Year Warranty
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-gold" />
                  $0 Down Options
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
                  4.9/5 Rating
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Side */}
          <div className="lg:col-span-5 xl:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] aspect-[4/5] lg:aspect-[3/4] xl:aspect-square group">
                <img 
                  src="/images/hero-solar.jpg" 
                  alt="Premium Solar Home" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Glass Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 md:-left-12 glass p-6 md:p-8 rounded-[32px] shadow-2xl max-w-[240px] border-white/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-dark" />
                  </div>
                  <div className="text-3xl font-black text-brand-dark">40%</div>
                </div>
                <div className="text-xs font-extrabold text-brand-dark/50 uppercase tracking-widest leading-tight">
                  Average Monthly <br />Energy Savings
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-12 -right-6 md:-right-10 glass p-6 rounded-[28px] shadow-2xl max-w-[200px] border-white/40"
              >
                <div className="flex -space-x-2 mb-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-gold flex items-center justify-center text-[10px] font-black text-brand-dark shadow-sm">
                    +12k
                  </div>
                </div>
                <div className="text-[11px] font-bold text-brand-dark leading-snug">
                  Trusted by 12,000+ <br />Modern Homeowners
                </div>
              </motion.div>

              {/* Subtle Light Ring */}
              <div className="absolute -inset-4 border border-brand-gold/10 rounded-[44px] pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
