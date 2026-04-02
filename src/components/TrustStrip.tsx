import React from 'react';
import { motion } from 'motion/react';
import { siteData } from '@/src/data/siteData';
import { Star, ShieldCheck, Zap, Home } from 'lucide-react';

const iconMap: Record<string, any> = {
  Zap,
  Home,
  Star,
  ShieldCheck
};

export const TrustStrip = () => {
  return (
    <div className="bg-brand-dark py-12 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {siteData.stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                  <Icon className="w-6 h-6 text-brand-gold group-hover:text-brand-dark transition-colors" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
