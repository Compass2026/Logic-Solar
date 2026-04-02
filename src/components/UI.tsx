import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => (
  <div className={cn(
    "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-dark text-xs font-bold uppercase tracking-widest",
    className
  )}>
    {children}
  </div>
);

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => (
  <div className={cn(
    "glass p-8 rounded-3xl",
    className
  )}>
    {children}
  </div>
);
