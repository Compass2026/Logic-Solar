import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SEO } from './SEO';

interface InternalFormPageTemplateProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

/**
 * Reusable utility page template for hidden internal pages (e.g. GHL forms).
 * This component keeps styling consistent with Logic Solar's premium brand
 * while remaining minimal, elegant, and focused on the content card.
 */
export const InternalFormPageTemplate = ({
  title,
  subtitle,
  eyebrow,
  children,
  maxWidth = "max-w-5xl" // Default roughly 1000px
}: InternalFormPageTemplateProps) => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SEO 
        title={title} 
        description={subtitle}
        noindex={true} 
      />

      {/* Branded Hero Header */}
      <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-brand-dark">
        {/* Decorative branded glow background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-brand-teal/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[80%] bg-brand-gold/5 blur-[100px]" />
        </div>

        <div className="container-custom relative z-10 text-center">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-brand-gold text-[10px] font-extrabold uppercase tracking-[0.2em] mb-8 mt-12 md:mt-0"
            >
              <Sparkles className="w-3 h-3 text-brand-gold" />
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium px-4"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </section>

      {/* Main Content Card Section */}
      <section className="-mt-32 md:-mt-48 pb-32 relative z-20 px-4 md:px-0">
        <div className={`container-custom ${maxWidth}`}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden"
          >
            <div className="p-8 md:p-16 lg:p-20">
              {children}
            </div>
          </motion.div>

          <footer className="mt-12 text-center text-brand-dark/20 text-sm font-medium">
            &copy; {new Date().getFullYear()} Logic Solar | Internal Utility Page
          </footer>
        </div>
      </section>
    </main>
  );
};
