import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface SectionHeadingProps {
  title: string | React.ReactNode;
  eyebrow?: string;
  description?: string;
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

export const SectionHeading = ({
  title,
  eyebrow,
  description,
  centered = false,
  className,
  dark = false
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "max-w-3xl mb-16",
      centered && "mx-auto text-center",
      className
    )}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6",
            dark ? "bg-white/10 text-brand-gold" : "bg-brand-gold/10 text-brand-dark"
          )}
        >
          <Sparkles className="w-3 h-3 text-brand-gold" />
          {eyebrow}
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className={cn(
          "text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]",
          dark ? "text-white" : "text-brand-dark"
        )}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={cn(
            "text-xl leading-relaxed font-medium",
            dark ? "text-white/60" : "text-brand-dark/60"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
