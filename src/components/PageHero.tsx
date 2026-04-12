import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface PageHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
  imagePosition?: string;
  className?: string;
}

export const PageHero = ({
  title,
  subtitle,
  eyebrow,
  backgroundImage = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000",
  imagePosition = "object-center",
  className
}: PageHeroProps) => {
  return (
    <section className={cn("relative pt-48 pb-32 overflow-hidden bg-brand-dark", className)}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Background" 
          className={cn("w-full h-full object-cover opacity-30", imagePosition)}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark" />
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-gold rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-teal rounded-full blur-[150px]" />
      </div>

      <div className="container-custom relative z-10 text-center">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 mb-12 text-white/40 text-xs font-bold uppercase tracking-widest">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-gold">
            {typeof title === 'string' ? title : 'Page'}
          </span>
        </div>

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-brand-gold text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-3 h-3 text-brand-gold" />
            {eyebrow}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};
